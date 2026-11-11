"use strict";
// Shared-game API for Roll to Resolve.
//
//   GET  /api/game?code=ABCD          public game state (what joiners poll; CDN-cached ~1s)
//   GET  /api/game?time=1             server clock + whether the store is configured
//   POST /api/game {action:"create"}  -> {code, token}   new game; token is the host secret
//   POST /api/game {action:"push",   code, token, state, hostNow}
//   POST /api/game {action:"draw",   code, token, face, wild, used}  -> public card only
//   POST /api/game {action:"reveal", code, token, cardId}            -> answer for the current card
//
// The answer key never leaves this function except through "reveal", and only for the card this
// game drew. Everything that changes a game needs the host token; Redis keeps only its SHA-256.

const crypto = require("crypto");
const TICKETS = require("./_lib/tickets.json");

const TTL = 60 * 60 * 24; // games expire 24h after their last host action
const FACE_KEYS = ["triggers", "versions", "data", "writebk", "observe"];
const PUBLIC_SRC = ["id", "symptom"];
const ANSWER = ["fw", "framework", "secondary", "failure", "first", "resolution", "next", "verdict", "overview"];
const CARD_FIELDS = ["face", "fallback", "restocked", "wild", "fx", "offline"];
const CODE_ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const BY_ID = {};
TICKETS.forEach((t) => { BY_ID[t.id] = t; });

function storeCfg() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redis(cfg, cmds) {
  const r = await fetch(cfg.url + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + cfg.token, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  if (!r.ok) throw new Error("store " + r.status);
  const out = await r.json();
  return out.map((x) => { if (x.error) throw new Error(x.error); return x.result; });
}

const kPub = (c) => "r2r:" + c + ":pub";
const kPriv = (c) => "r2r:" + c + ":priv";
const sha = (s) => crypto.createHash("sha256").update(String(s)).digest("hex");
const pick = (o, keys) => { const r = {}; keys.forEach((k) => { if (o && o[k] !== undefined) r[k] = o[k]; }); return r; };

function send(res, status, body, cache) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache || "no-store");
  res.end(JSON.stringify(body));
}

function newCode() {
  const b = crypto.randomBytes(4);
  let s = "";
  for (let i = 0; i < 4; i++) s += CODE_ABC[b[i] % CODE_ABC.length];
  return s;
}

function validCode(c) { return typeof c === "string" && /^[A-Z]{4}$/.test(c); }

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function authHost(cfg, code, token) {
  if (!validCode(code) || typeof token !== "string" || token.length < 32) return null;
  const [raw] = await redis(cfg, [["GET", kPriv(code)]]);
  if (!raw) return null;
  const priv = JSON.parse(raw);
  const a = Buffer.from(priv.h, "hex"), b = Buffer.from(sha(token), "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? priv : null;
}

// Strip the card down to public fields; add the answer only once this game's card has been revealed.
function sanitizeState(state, priv) {
  const s = Object.assign({}, state);
  if (s.card && typeof s.card === "object") {
    const card = pick(s.card, CARD_FIELDS);
    const srcId = s.card.src && s.card.src.id;
    const t = BY_ID[srcId];
    card.src = t ? pick(t, PUBLIC_SRC) : pick(s.card.src, PUBLIC_SRC);
    if (t && priv.revealed && priv.card === srcId && s.revealed) {
      Object.assign(card.src, pick(t, ANSWER));
      if (card.wild || card.fallback) card.wildKey = t.fw;
    }
    s.card = card;
  }
  return s;
}

module.exports = async function handler(req, res) {
  const cfg = storeCfg();
  try {
    if (req.method === "GET") {
      const q = req.query || Object.fromEntries(new URL(req.url, "http://x").searchParams);
      if (q.time) return send(res, 200, { now: Date.now(), store: !!cfg });
      if (!cfg) return send(res, 503, { error: "store-not-configured" });
      const code = String(q.code || "").toUpperCase();
      if (!validCode(code)) return send(res, 400, { error: "bad-code" });
      const [raw] = await redis(cfg, [["GET", kPub(code)]]);
      if (!raw) return send(res, 404, { error: "no-such-game" }, "public, max-age=0, s-maxage=2");
      // s-maxage lets the CDN answer every viewer of a game from one Redis read per second
      return send(res, 200, JSON.parse(raw), "public, max-age=0, s-maxage=1");
    }
    if (req.method !== "POST") return send(res, 405, { error: "method" });
    if (!cfg) return send(res, 503, { error: "store-not-configured" });

    const body = await readBody(req);
    const action = body.action;

    if (action === "create") {
      const token = crypto.randomBytes(32).toString("hex");
      for (let i = 0; i < 8; i++) {
        const code = newCode();
        const priv = { h: sha(token), card: null, revealed: false };
        const [ok] = await redis(cfg, [["SET", kPriv(code), JSON.stringify(priv), "EX", TTL, "NX"]]);
        if (ok === "OK") {
          await redis(cfg, [["SET", kPub(code), JSON.stringify({ v: 0, state: null }), "EX", TTL]]);
          return send(res, 200, { code, token });
        }
      }
      return send(res, 503, { error: "no-free-code" });
    }

    const code = String(body.code || "").toUpperCase();
    const priv = await authHost(cfg, code, body.token);
    if (!priv) return send(res, 403, { error: "not-host" });

    if (action === "push") {
      const state = body.state;
      if (!state || typeof state !== "object" || !Array.isArray(state.pos)) return send(res, 400, { error: "bad-state" });
      const s = sanitizeState(state, priv);
      // re-base the prep deadline from the host's clock onto the server's, so viewers can correct for skew
      if (typeof s.prepEndsAt === "number" && s.prepEndsAt && typeof body.hostNow === "number") {
        s.prepEndsAt = s.prepEndsAt - body.hostNow + Date.now();
      }
      const out = JSON.stringify({ v: Date.now(), state: s });
      if (out.length > 200000) return send(res, 413, { error: "too-big" });
      await redis(cfg, [["SET", kPub(code), out, "EX", TTL], ["EXPIRE", kPriv(code), TTL]]);
      return send(res, 200, { ok: true });
    }

    if (action === "draw") {
      // Same draw rules as the offline game: no repeats until the chest is empty, then restock.
      let used = Array.isArray(body.used) ? body.used.filter((id) => BY_ID[id]) : [];
      const fw = body.wild ? null : (FACE_KEYS.indexOf(body.face) >= 0 ? body.face : null);
      const left = (k) => TICKETS.filter((t) => used.indexOf(t.id) < 0 && (!k || t.fw === k));
      let restocked = false, fallback = false;
      if (!left().length) { used = []; restocked = true; }
      let list = fw ? left(fw) : left();
      if (!list.length) { list = left(); fallback = true; }
      const t = list[crypto.randomInt(list.length)];
      used.push(t.id);
      priv.card = t.id; priv.revealed = false;
      await redis(cfg, [["SET", kPriv(code), JSON.stringify(priv), "EX", TTL]]);
      return send(res, 200, { src: pick(t, PUBLIC_SRC), fallback: !!(fw && fallback), restocked, used });
    }

    if (action === "reveal") {
      if (!priv.card || body.cardId !== priv.card) return send(res, 409, { error: "not-current-card" });
      priv.revealed = true;
      await redis(cfg, [["SET", kPriv(code), JSON.stringify(priv), "EX", TTL]]);
      return send(res, 200, { answer: pick(BY_ID[priv.card], ANSWER) });
    }

    return send(res, 400, { error: "bad-action" });
  } catch (e) {
    return send(res, 500, { error: "server", detail: String(e && e.message || e) });
  }
};
