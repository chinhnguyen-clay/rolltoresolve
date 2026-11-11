// Local dev server: static files + /api/game, backed by an in-memory stand-in for the Upstash REST API.
//   node scripts/dev-server.mjs [port]        (no Redis or Vercel login needed)
// Set KV_REST_API_URL / KV_REST_API_TOKEN to use a real Upstash database instead.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = +(process.argv[2] || process.env.PORT || 3000);
const MOCK = !process.env.KV_REST_API_URL && !process.env.UPSTASH_REDIS_REST_URL && !process.env.NO_STORE;
if (MOCK) { process.env.KV_REST_API_URL = "http://127.0.0.1:" + PORT + "/__redis"; process.env.KV_REST_API_TOKEN = "dev"; }
const handler = createRequire(import.meta.url)(path.join(ROOT, "api/game.js"));

const db = new Map(); // key -> {v, exp}
function cmd([op, k, ...a]) {
  op = String(op).toUpperCase();
  const now = Date.now(), e = db.get(k);
  if (e && e.exp && e.exp < now) db.delete(k);
  if (op === "GET") return db.has(k) ? db.get(k).v : null;
  if (op === "SET") {
    let exp = 0, nx = false;
    for (let i = 0; i < a.length; i++) { const f = String(a[i]).toUpperCase(); if (f === "EX") exp = now + 1000 * a[++i]; else if (f === "NX") nx = true; }
    if (nx && db.has(k)) return null;
    db.set(k, { v: String(a[0]), exp }); return "OK";
  }
  if (op === "EXPIRE") { if (!db.has(k)) return 0; db.get(k).exp = now + 1000 * a[0]; return 1; }
  throw new Error("unsupported " + op);
}

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".md": "text/markdown", ".svg": "image/svg+xml", ".png": "image/png" };

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/__redis/pipeline") {
    let body = ""; for await (const c of req) body += c;
    const out = JSON.parse(body).map((c) => { try { return { result: cmd(c) }; } catch (e) { return { error: e.message }; } });
    res.setHeader("Content-Type", "application/json"); return res.end(JSON.stringify(out));
  }
  if (url.pathname === "/api/game") {
    req.query = Object.fromEntries(url.searchParams);
    return handler(req, res);
  }
  // mirror Vercel: nothing under /api is served as a static file
  if (url.pathname.startsWith("/api/")) { res.statusCode = 404; return res.end("not found"); }
  let f = path.join(ROOT, decodeURIComponent(url.pathname));
  if (!f.startsWith(ROOT)) { res.statusCode = 403; return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.statusCode = 404; return res.end("not found"); }
  res.setHeader("Content-Type", TYPES[path.extname(f)] || "application/octet-stream");
  fs.createReadStream(f).pipe(res);
}).listen(PORT, () => console.log("Roll to Resolve dev server on http://localhost:" + PORT + (MOCK ? " (in-memory store)" : "")));
