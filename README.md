# Roll to Resolve

A pirate-themed board game built for Clay's **PSS Workflows enablement session on Nov 11**. Crews roll a die whose faces are the session's workflow frameworks, answer distress calls drawn from real support cases, and work in an intentionally broken Clay workflow linked to each framework.

It's a single self-contained HTML/CSS/JS file (`index.html`) with no build step and no dependencies to install. Fonts load from Google Fonts when online.

## Playing

1. Open the hosted site, or run `node scripts/dev-server.mjs` locally. Opening `index.html` straight from disk still plays, but it has no answer key to reveal (see below).
2. Go full-screen (F11 on Windows, Ctrl+Cmd+F on Mac).

## Shared live game

Opening the site starts a new game hosted by that browser. The **Share game · CODE** button copies a link (`?game=CODE`) that anyone can open to watch the same board live: ships, crews, the rolled ticket, the prep timer, waiting-crew guesses, the reveal, and scoring. Joiners get a read-only view marked **Viewing**. Only the host's device can roll, run the timer, set or lock guesses, reveal, or score.

- The host's device holds a secret host token (in `localStorage`). The server keeps only its SHA-256 hash, and every game-changing request (`push`, `draw`, `reveal`) must present the token.
- The answer key (framework, summary, diagnosis, verdict) lives server-side in `api/_lib/tickets.json`. The page ships only each ticket's id and symptom. The server draws each card, and returns its answer only when the host reveals that game's current card. Viewers' copies are stripped of answer fields until then.
- Viewers poll `GET /api/game?code=CODE` about twice a second. The CDN caches that response for 1 second, so a room full of viewers costs about one Redis read per second.
- Games expire 24 hours after the host's last action.
- If the server can't be reached, the game still runs on that one device, but Reveal can't show answers because the answer key isn't in the page.

The API needs an Upstash Redis database connected to the Vercel project. It reads `KV_REST_API_URL` and `KV_REST_API_TOKEN`, or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

Local development: `node scripts/dev-server.mjs` serves the site and API with an in-memory store. `node scripts/test-sync.mjs <url>` runs the host-only and no-early-answer checks against a local or deployed URL.

## Facilitator setup

Before the session, click the **Workflows** button in the game and paste in the link to each framework's broken workflow. Links are saved in that browser's `localStorage`, so set them on the machine and browser you'll present from. Clearing site data, or switching browsers or profiles, means entering them again.

## Confidentiality

The tickets come from real internal support cases. **Any hosted deployment must be access-protected.** Don't publish this on a public URL (for example, public GitHub Pages).
