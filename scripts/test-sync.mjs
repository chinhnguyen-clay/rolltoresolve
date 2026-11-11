// Security + sync checks for the shared game API.
//   node scripts/test-sync.mjs http://localhost:3000
//   node scripts/test-sync.mjs https://<deployment>.vercel.app
// Proves: the page ships no answers; only the host token can draw, push, or reveal; viewers never
// receive answer fields before the host reveals; a token for a different game can't reveal this one.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const HEADERS = process.env.BYPASS ? { "x-vercel-protection-bypass": process.env.BYPASS } : {};
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TICKETS = JSON.parse(fs.readFileSync(path.join(ROOT, "api/_lib/tickets.json"), "utf8"));
const ANSWER = ["fw", "framework", "secondary", "failure", "first", "resolution", "next", "verdict", "overview"];
const BY_ID = Object.fromEntries(TICKETS.map((t) => [t.id, t]));

let pass = 0, fail = 0;
function check(name, ok, extra) { if (ok) { pass++; console.log("  ok   " + name); } else { fail++; console.log("  FAIL " + name + (extra ? "  -> " + extra : "")); } }
async function post(body) {
  const r = await fetch(BASE + "/api/game", { method: "POST", headers: { ...HEADERS, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return { status: r.status, json: await r.json().catch(() => ({})) };
}
// cache-buster: the CDN caches public reads for ~1s, and these checks want the latest copy
async function view(code) {
  const r = await fetch(BASE + "/api/game?code=" + code + "&_=" + Math.random(), { headers: HEADERS });
  return { status: r.status, text: await r.text() };
}
// Free-text answer fields of ticket t appearing anywhere in a response. (framework/secondary/failure are
// shared labels like "Write-backs" that the legend shows anyway; the field-level checks cover them.)
const ANSWER_TEXT = ["first", "resolution", "next", "overview"];
function leaks(text, t) {
  return ANSWER_TEXT.filter((k) => t[k] && text.includes(JSON.stringify(String(t[k])).slice(1, 41)));
}

console.log("Testing " + BASE);

console.log("\n1. Static page carries no answer key");
const page = await (await fetch(BASE + "/?_=" + Math.random(), { headers: HEADERS })).text();
const pageLeaks = TICKETS.flatMap((t) => leaks(page, t).map((k) => t.id + "." + k));
check("index.html contains no framework/resolution/verdict/summary text", pageLeaks.length === 0, pageLeaks.slice(0, 5).join(", "));
for (const p of ["/api/_lib/tickets.json", "/api/game.js"]) {
  const r = await fetch(BASE + p, { headers: HEADERS });
  const body = await r.text();
  check(p + " is not downloadable", !(r.ok && body.includes('"resolution"')), "status " + r.status);
}

console.log("\n2. Host creates a game; viewers can read it");
const host = (await post({ action: "create" })).json;
check("create returns a 4-letter code and a host token", /^[A-Z]{4}$/.test(host.code || "") && (host.token || "").length >= 32, JSON.stringify(host));
const base = { pos: [0, 0, 0], turn: 0, roll: 0, face: 0, card: null, revealed: false, over: false, names: ["Port Crew", "Starboard Crew", "Crow's Nest Crew"], armed: [], used: [], guesses: {}, guessesLocked: false, prepRunning: false, prepEndsAt: 0, prepDone: false };
check("host push accepted", (await post({ action: "push", code: host.code, token: host.token, state: base, hostNow: Date.now() })).status === 200);
let v = await view(host.code);
check("viewer reads the pushed state", v.status === 200 && JSON.parse(v.text).state.names[2] === "Crow's Nest Crew", v.text.slice(0, 120));

console.log("\n3. Game-changing actions need the host token");
const attacker = (await post({ action: "create" })).json; // a joiner can always mint a token for a game of their own
for (const action of ["push", "draw", "reveal"]) {
  const extra = { state: { ...base, pos: [9, 9, 9] }, face: "triggers", used: [], cardId: "x" };
  check(action + " with no token -> 403", (await post({ action, code: host.code, ...extra })).status === 403);
  check(action + " with a wrong token -> 403", (await post({ action, code: host.code, token: "f".repeat(64), ...extra })).status === 403);
  check(action + " with another game's host token -> 403", (await post({ action, code: host.code, token: attacker.token, ...extra })).status === 403);
}
v = await view(host.code);
check("rejected pushes did not change the board", JSON.parse(v.text).state.pos.join() === "0,0,0");

console.log("\n4. Draw: neither host nor viewers get the answer before reveal");
const d = await post({ action: "draw", code: host.code, token: host.token, face: "writebk", wild: false, used: [] });
const src = d.json.src || {};
const t = BY_ID[src.id];
check("draw returns only id + symptom", d.status === 200 && t && Object.keys(src).sort().join() === "id,symptom", JSON.stringify(d.json).slice(0, 200));
check("draw response contains no answer text", t && leaks(JSON.stringify(d.json), t).length === 0);
// even a buggy or tampered host client can't publish the answer early: the server strips it
const sneaky = { ...base, roll: 4, face: 3, used: d.json.used, card: { face: 3, src: { ...src, ...t }, wildKey: t.fw, fallback: false, restocked: false, fx: null }, revealed: false };
await post({ action: "push", code: host.code, token: host.token, state: sneaky, hostNow: Date.now() });
v = await view(host.code);
const pubCard = JSON.parse(v.text).state.card;
check("viewer copy has the ticket symptom", pubCard && pubCard.src.symptom === t.symptom);
check("viewer copy has no answer fields", pubCard && ANSWER.every((k) => !(k in pubCard.src)) && !("wildKey" in pubCard), JSON.stringify(pubCard).slice(0, 200));
check("viewer response contains no answer text", leaks(v.text, t).length === 0, leaks(v.text, t).join());
// claiming revealed:true without the host's reveal call doesn't release it either
await post({ action: "push", code: host.code, token: host.token, state: { ...sneaky, revealed: true }, hostNow: Date.now() });
v = await view(host.code);
check("revealed:true pushed before the reveal call still has no answer", leaks(v.text, t).length === 0);

console.log("\n5. Reveal: only the host, only this game's current card");
const atkDraw = await post({ action: "draw", code: attacker.code, token: attacker.token, face: "writebk", wild: false, used: [] });
const r409 = await post({ action: "reveal", code: attacker.code, token: attacker.token, cardId: src.id });
check("another game's host can't reveal this game's card through their own game", atkDraw.json.src.id === src.id ? r409.status === 200 : r409.status === 409, "status " + r409.status);
const rWrong = await post({ action: "reveal", code: host.code, token: host.token, cardId: "not-the-card" });
check("host reveal for a card that isn't current -> 409", rWrong.status === 409);
const rOk = await post({ action: "reveal", code: host.code, token: host.token, cardId: src.id });
check("host reveal returns the answer", rOk.status === 200 && rOk.json.answer && rOk.json.answer.resolution === t.resolution);
await post({ action: "push", code: host.code, token: host.token, state: { ...sneaky, card: { ...sneaky.card, src }, revealed: true }, hostNow: Date.now() });
v = await view(host.code);
const after = JSON.parse(v.text).state.card.src;
check("after the host reveals, viewers receive the answer", after.resolution === t.resolution && after.framework === t.framework);

console.log("\n6. Timer deadline is re-based to server time");
const hostNow = Date.now() - 5000; // pretend the host clock is 5s slow
await post({ action: "push", code: host.code, token: host.token, state: { ...base, prepRunning: true, prepEndsAt: hostNow + 60000 }, hostNow });
v = await view(host.code);
const ends = JSON.parse(v.text).state.prepEndsAt - Date.now();
check("prep deadline ~60s ahead in server time despite host clock skew", ends > 55000 && ends <= 61000, String(ends));

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
