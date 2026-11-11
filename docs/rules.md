# Roll to Resolve: Rules

*A pirate-themed troubleshooting race for **PSS Workflows Training, Session 2** (Wed Nov 11, 2026).*
*These rules describe what the game file (`index.html`, v8.1) does today. The same steps are in the in-game **Rules** button.*

---

## 1. Premise

Two to six pirate crews race across a treasure map of **30 checkpoints** to a chest. This is a **silent race**: each turn, the crew at the wheel rolls a die, and **every crew works the same unique ticket** from the [Workflows Troubleshooting Library](https://claude.ai/artifact/2LGoFmnTtGxEbgZJ4HGWKc?sk=v1Dm7lsX49_pkpbt34Nh_A). The associated framework stays hidden. The host can press **Start 1-min prep** so all crews can prep in silence (the timer never starts on its own, and the host can reset it).

The **crew at the wheel** has library access for the whole turn. They use the library to look the ticket up and find the framework — they do not guess. Each **waiting crew** may lock in a framework guess **from memory, with no library**, for **+1 space** if it is correct. The host can pick or change those guesses at any time until **Lock guesses** or **Reveal**. Opening the library does **not** lock them, so the crew at the wheel can use it early. **Hint: show framework** or **Reveal the diagnosis** also locks any unlocked guesses. The hint does not change how you score the crew at the wheel.

The crew at the wheel then answers out loud: they explain the workflow in natural language and identify the framework it represents. The facilitator reveals a brief summary (workflow context, root cause, and solution, plus the framework) along with the diagnosis (what was checked first, the resolution, and the verdict). Correct waiting-crew guesses sail +1 on reveal. Solving it alone moves the active ship further than solving it with a nudge. If they miss, the **next crew in turn order may steal** the question and take the advance. The first crew to reach the chest wins.

**Do not open a live Clay workspace.** Live workspaces can leave broken workflows behind (for example, Javier's ticket: works from the Run button, fails via Claude MCP — missing work email). Questions point at the ticket library, not at live workspaces.

## 2. Setup and teams

- **Pick the number of crews (2 to 6).** Use the **Crews** control in the header. The default is 2. Changing the number **starts a new voyage**: every ship goes back to *Set Sail*, the ticket chest is full again, and the first crew takes the wheel. Crew names you've already typed are kept.
- **Crews, colors, and pennants:**

  | # | Default name | Ship color | Pennant |
  |---|---|---|---|
  | 1 | Port Crew | bright green | triangle |
  | 2 | Starboard Crew | purple | swallowtail |
  | 3 | Crow's Nest Crew | bright orange | square |
  | 4 | Powder Monkeys | teal | long streamer |
  | 5 | Sea Dog Crew | gold | zigzag |
  | 6 | Bilge Rat Crew | berry | rounded banner |

  Click a crew's name on the scoreboard to rename it (16 characters max).
- **One shared screen.** A facilitator runs the game on a screen-shared or projected display. Crews don't need their own copy. The header **Rules** button opens a projector-friendly rules modal (close it with the X, Esc, or a click outside).
- **Start a game.** Click **New voyage** (or change the crew count). All ships start at *Set Sail* (waypoint 0), and Crew 1 (Port Crew by default) takes the wheel first.

## 3. The board

There are **30 stops** (waypoints 0–29):

**Set Sail (0)** → Tide Pools (1) → Gull Rock (2) → Barnacles (3) → Shipwreck Shoals (4) → Spyglass (5) → Smuggler's Cove (6) → **Foggy Narrows (7)** → Mermaid Shoal (8) → Dead Man's Reef (9) → Parrot Isle (10) → Rum Runner (11) → Powder Keg (12) → Cutlass Creek (13) → **Kraken Deep (14)** → Crow's Nest (15) → Siren Sound (16) → Sextant Cay (17) → Skull Point (18) → Cannon Ridge (19) → Hidden Cove (20) → **Mutiny Bay (21)** → Pearl Reef (22) → Storm Cape (23) → Whirlpool (24) → Harpoon (25) → Jolly Boat (26) → Map Atoll (27) → Dragon's Teeth (28) → **Treasure (29)**.

Each stop has its own icon on a parchment disc. The three effect stops are larger, with a one-line reminder under the name. Shipwreck Shoals, Dead Man's Reef, Kraken Deep, Skull Point, Storm Cape, Whirlpool, and Dragon's Teeth have a red ring — that's decoration only.

The crew at the wheel has a large colour banner, a highlighted scoreboard row, and a ring under its ship. Other crews are dimmed slightly.

### Stop effects

An effect is set when a ship **lands** on the stop, and it applies to **that crew's next turn only**. Then it's used up.

| Stop | Icon | Effect on the crew's next turn | What the facilitator does |
|---|---|---|---|
| **Foggy Narrows (7)** | Fog bank | **No hints this turn.** The *Needed a nudge* button becomes a miss: the crew stays put, then the next crew may steal. Nailed it still sails the number rolled. | Don't give a hint. If they can't solve it alone, click *Missed it*. |
| **Kraken Deep (14)** | Tentacle | **The next roll is a Kraken card.** The die is forced to 6 and the framework is hidden until the reveal. | Score it like any Kraken roll (Nailed it = sail 6). |
| **Mutiny Bay (21)** | Black flag | A reminder stop: **if the crew misses, the next crew may steal** (this is also the core rule on every other stop). | Same steal flow as everywhere else. |

### Steal (core rule)

If the crew at the wheel **misses** the question, **the next crew in turn order** gets one chance to steal it and take the advance (the number that was just rolled).

1. After Reveal, click **Missed it · next crew may steal**. The original crew stays put.
2. Ask the next crew whether they had the answer (or can still explain it from the revealed diagnosis).
3. **Stolen:** click *Stolen · [crew] sails N*. That crew sails the number rolled. The wheel then passes to the crew **after** the stealer, so the stealer doesn't immediately roll again.
4. **No steal:** click *No steal — [crew] rolls next*. Nobody else moves, and that next crew takes a normal turn (they roll a new unique ticket).

Steal is only offered to the next crew in turn order — one chance, not a free-for-all. A successful steal does **not** get catch-up wind. There is no steal on *Nailed it* or on *Needed a nudge* (except in Foggy Narrows, where a nudge is a miss and does open steal).

### Catch-up wind (3 or more crews)

With **3 or more crews**, a crew that's **strictly behind every other crew** (no ties) gets **+1 space when it solves a card unaided**. It doesn't apply to nudges or steals, and it never applies in a 2-crew game.

## 4. Dice and the ticket chest

| Roll | Framework | Tagline | Tickets in the library |
|---|---|---|---|
| 1 | **Triggers** | The "Did it run?" ladder | 2 |
| 2 | **Versions** | Live, Draft, and Ran | 1 |
| 3 | **Passing data** | Follow the value | 8 |
| 4 | **Write-backs** | Send, Accept, Land, Stick | 4 |
| 5 | **Observability** | Slow, Stuck, or Gone | 3 |
| 6 | **Kraken: Bug or Config?** | Snap verdict. The framework is hidden. | draws from the same 18 |

The deck is the **18 real submissions** in the library (the default view, excluding 6 seeded examples). Every card uses only that ticket's content: **symptom → what was checked first → resolution → framework used**, plus the library verdict (Bug, User Error, or Unsure).

- **Unique draws.** The chest shrinks as tickets are drawn. A ticket is never reused in the same voyage until the chest is empty.
- **On a 1 to 5,** the game tries to draw an unused ticket for that framework. If that framework is empty but other tickets remain, it draws from the remaining library and says so on the card. (Versions has only one real ticket, so this will happen if Versions is rolled again.)
- **On a 6 (Kraken),** the game draws any unused ticket and hides the framework until the reveal.
- **When the chest is empty,** it is shuffled and restocked with all 18 tickets, and a banner says so. Play continues; tickets can then repeat, but not until each has been drawn once.

## 5. The ticket library (not live workspaces)

The call to action on every roll is: **Can you explain this workflow in natural language and identify the framework it represents?** The library link is on the card for the **crew at the wheel** from the moment the ticket appears, so they can look it up and find the framework (the specific ticket after Reveal, or [the full library](https://claude.ai/artifact/2LGoFmnTtGxEbgZJ4HGWKc?sk=v1Dm7lsX49_pkpbt34Nh_A)). Waiting crews must guess from memory and may not use the library. Opening the library does not lock waiting-crew guesses. The host can still press **Lock guesses**, and **Hint: show framework** or **Reveal** will lock any unlocked picks.

The library — and this game's tickets — are organized around these five framework sections. Use them to study before a voyage, and for the crew at the wheel to look up a ticket during their turn:

- **Triggers** — The "Did it run?" ladder. Look here when a workflow didn't fire, a test wouldn't run, or you need to check which trigger rules are in play.
- **Versions** — Live, Draft, and Ran. Look here when a live, draft, or snapshot version may be why a run doesn't match what was edited.
- **Passing data** — Follow the value. Look here when a value is the wrong shape, didn't reach a step, or isn't mapped to the right source.
- **Write-backs** — Send, Accept, Land, Stick. Look here when a write was sent but didn't accept, land, or stick in the destination.
- **Observability** — Slow, Stuck, or Gone. Look here when a run is slow, stuck, or missing, and you need to see what happened.

A warning on the card reminds the room: **don't open a live Clay workspace.** Live workspaces can leave broken workflows behind — for example, Javier's ticket, which worked from the Run button but failed via the Claude MCP connector because of a missing work email.

The **Workflows** header button still opens an optional notes panel (saved in this browser). It is no longer the source of the question.

## 6. Turn structure

1. **Roll.** The crew at the wheel clicks **Roll the bones**. The game draws a unique library ticket that **every crew works** (a silent race). The framework name is hidden (it does not appear on the banner, the roll status line, the chips, or in "What was checked first" until a hint or the reveal).
2. **1-min prep (host-started).** The host may press **Start 1-min prep**. The 60-second countdown is visible on the card; it does **not** start automatically. When the minute is up, the clock shows **Time's up — prep is over**. The host can **Reset** the timer and start it again if needed. A timer-sound toggle is off by default; no alarm is required.
3. **Waiting-crew framework guesses.** Before Reveal, the host selects a framework guess for each crew that is not at the wheel. The on-screen reminder is: **Waiting crews: no library! Guess the framework from memory.** A correct guess is worth **+1 space**, applied when the diagnosis is revealed. The crew at the wheel does not guess — they have the library. The host can pick or change a waiting-crew guess at any time until **Lock guesses** or **Reveal**. Opening the library does **not** lock those picks. **Hint: show framework** or **Reveal the diagnosis** also locks any unlocked guesses. An empty guess scores nothing.
4. **Explain and identify (crew at the wheel).** The facilitator reads the symptom. The crew at the wheel uses the library to look the ticket up and find the framework (they do not guess), then answers out loud: they explain the workflow in natural language and name the framework. Do not open a live workspace. If they need a hint, click **Hint: show framework**; this reveals the framework name. Using the hint does **not** change the Nailed it / Needed a nudge / Missed it score. Foggy Narrows "no hints" still refers only to scoring: a nudge is a miss.
5. **Reveal.** Click **Reveal the diagnosis**. Correct waiting-crew guesses sail +1 immediately. You'll also see a brief summary of the workflow context, root cause, and solution (taken from that ticket's existing library fields, plus the framework), then what was checked first, the full resolution (and what they did next, from the library), the verdict, and the library link.
6. **Score the crew at the wheel.**
   - **Nailed it.** Solved alone: sail **the number rolled** (1 to 6), plus catch-up if it applies.
   - **Needed a nudge.** Needed a hint: sail **1** (in Foggy Narrows this is a miss instead).
   - **Missed it.** The original crew stays put, and the next crew may steal (see section 3).
7. **Pass the wheel.** The next crew in order takes the wheel, except after a **successful steal**, when the wheel skips the stealer and goes to the crew after them.

You can't lose ground. A ship stays put only on a miss (including a fog miss) or when its answer is stolen.

## 7. Scoring and winning

- Each crew's position is *Waypoint N / 29*. The crew at the wheel is highlighted on the scoreboard and on the map.
- Moves stop at the chest. You don't need an exact roll to land on it.
- **The first crew to reach waypoint 29 wins.** A "X marks the spot!" screen appears. With 3 or more crews, it also shows final standings. Click **Set sail again** to start a new voyage (the ticket chest is full again).

## 8. Timing

- **Date:** Wednesday, November 11, 2026, after the support meeting. It runs **twice**:
  - **Morning run:** London plus half of New York, at **7:00 AM PT (SF) / 10:00 AM ET (NY) / 3:00 PM GMT (London)**.
  - **Afternoon run:** San Francisco plus the other half of New York.
- **Prep timer.** There is a host-started **1-minute prep** countdown on each ticket. It never auto-starts. The host presses **Start 1-min prep**, can **Reset** it, and the clock clearly shows when time is up. Timer sound is optional and off by default. After prep, the crew at the wheel still talks the answer out — there is no auto-score when the minute ends. First to the treasure wins.
- **Room:** the team wants to book *Oxidation* in the new NY office.

## 9. Facilitator notes

- Narrate the game. Keep each crew on *explaining the workflow, identifying the framework, what was checked first, the resolution, and the verdict*.
- Have the crew at the wheel say their answer **before** you click Reveal. They may open the library at any time during the turn; that does not lock waiting-crew guesses. Press **Lock guesses** when those picks should freeze, or rely on Hint or Reveal to lock them. Offer the framework hint only if the crew at the wheel asks; it does not change how you score their turn.
- You decide between *Nailed it*, *Needed a nudge*, and *Missed it*. A sensible bar for *Nailed it*: they explained the workflow and named the right framework **and** the right verdict. Using the on-screen framework hint does not, by itself, turn a nail into a nudge.
- On Kraken rolls, let the other crews call out "bug!" or "user error!" to keep everyone engaged.
- **Music** and **Sound effects** (keys **M** and **S**) sit in the header on a wide screen, or in a fixed pill at the bottom-left on a narrower one. Music starts off; sound effects start on. The choice is remembered in this browser.
- The **Theme** button switches between the standard deep-sea background and a darker "night sea" one.
- Game state (including which tickets have been drawn and a pending steal) is saved in the browser tab, so a refresh keeps it. Closing the tab starts fresh.

**In the room.** Project the game full screen. Open **Rules** from the header if the room needs a reminder. Give each crew a captain who announces the final answer. Waiting crews guess from memory only — they should not open the library during prep.

**Remote.** One facilitator shares the browser tab. Do not paste the library link in chat until waiting-crew guesses are locked, so waiting crews cannot look it up. Don't send live workspace links.

**Running the file.** It's a single HTML file. Open it in a modern browser. Fonts load from Google Fonts; offline, it falls back to system fonts.

---

## Quick-reference card

> **ROLL TO RESOLVE: 2 to 6 crews race to the treasure (waypoint 29)**
>
> **Roll:** 1 Triggers · 2 Versions · 3 Passing data · 4 Write-backs · 5 Observability · 6 **Kraken**: framework hidden, so call bug or user error *first*
>
> **Each turn:** Roll (every crew works this ticket) → host may **Start 1-min prep** → waiting crews lock a framework guess from memory (**no library**, +1 if correct) → the crew at the wheel uses the **library** to find the framework (they do not guess), then explains it out loud (optional: Hint: show framework) → Reveal (correct guesses sail +1; summary of context, root cause, solution, plus framework) → score the crew at the wheel
>
> **Move:** Nailed it alone = sail **the number rolled** · Needed a nudge = sail **1** · Missed it = stay put, and the **next crew in turn order** may steal and sail that same number
>
> **Chest:** 18 unique library tickets; no repeats until the chest is empty, then it is restocked
>
> **Stop effects (next turn after landing):** Foggy Narrows = no hints, a miss stays put then steal is offered · Kraken Deep = next roll is a Kraken · Mutiny Bay = reminder that a miss can be stolen · **Catch-up** (3+ crews): last place alone gets +1 for solving unaided
>
> **Then** the wheel passes (after a successful steal, it skips the stealer). **First to the chest wins.** No exact roll needed. **Prep timer:** host-started, 1 minute, resettable; it does not auto-start.
>
> **Verdicts:** Bug · User Error · Unsure — taken from the library

---

## What changed in v7

- Steal is a core rule (next crew in turn order takes the rolled advance on a successful steal).
- No countdown anywhere.
- Unique tickets from a shrinking pool of 18 real library submissions; the chest restocks if it runs out.
- Cards rebuilt from the library: symptom, what was checked first, resolution, framework used. Seeded examples are not used.
- Questions point at the library, with a visible warning about live workspaces (Javier's MCP / work-email ticket).
- The board has 30 uniquely iconed checkpoints.

## What changed in v8

- The call to action on every roll is now: "Can you explain this workflow in natural language and identify the framework it represents?" The library link remains as a place to look the ticket up.
- The associated framework is hidden while the question is showing (banner, roll status line, chips/labels, and the diagnosis section). A **Hint: show framework** button reveals the name. Using the hint does not change scoring.
- After Reveal, a brief summary restates the workflow context, root cause, and solution from that ticket's existing data, plus the framework.

## What changed in v8.1

- **Silent race.** Every crew works the same rolled ticket. The crew at the wheel still answers out loud.
- **1-min prep.** A host-pressed **Start 1-min prep** button runs a visible 60-second countdown. It does not auto-start. Time's up is shown clearly on the clock. The host can reset it. Timer sound is optional and off by default.
- **Waiting-crew framework guess.** Before Reveal, each crew that is not at the wheel can lock in a framework guess from memory for **+1 space** if correct. The on-screen rule is: "Waiting crews: no library! Guess the framework from memory." The host selects each guess. The **crew at the wheel** has the library link for the whole turn and uses it to find the framework — they do not guess. Opening the library does not lock waiting-crew guesses. **Lock guesses**, **Hint**, or **Reveal** does. The hint does not change the active crew's score.
- A **Rules** button in the header opens a projector-friendly rules modal (close with X, Esc, or a click outside).
