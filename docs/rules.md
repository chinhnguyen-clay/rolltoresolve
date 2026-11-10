# Roll to Resolve: Rules

*A pirate-themed troubleshooting race for **PSS Workflows Training, Session 2** (Wed Nov 11, 2026).*
*These rules describe what the game file (`index.html`, v7) does today.*

---

## 1. Premise

Two to six pirate crews race across a treasure map of **30 checkpoints** to a chest. Each turn, the crew at the wheel rolls a die. The face they roll picks one of the five Workflows troubleshooting frameworks, and the game draws a **unique** real ticket from the [Workflows Troubleshooting Library](https://app.notion.com/p/clayrun/0edab6bc51a6493eaad1e6a342f60065?v=e390b30f8e9740fea92869bdaf266c16). The crew finds that ticket in the library, talks through the framework out loud, and names how it was resolved. Then the facilitator reveals the diagnosis (what was checked first, the resolution, the framework used, and the verdict). Solving it alone moves the ship further than solving it with a hint. If they miss, the **next crew in turn order may steal** the question and take the advance. There is **no timer** and **no countdown** — teams talk it out. The first crew to reach the chest wins.

**Do not open a live Clay workspace.** Live workspaces can leave broken workflows behind (for example, Javier's ticket: works from the Run button, fails via Claude MCP — missing work email). Questions point at the ticket library, not at live workspaces.

## 2. Setup and teams

- **Pick the number of crews (2 to 6).** Use the **Crews** control in the header. The default is 2. Changing the number **starts a new voyage**: every ship goes back to *Set Sail*, the ticket chest is full again, and the first crew takes the wheel. Crew names you've already typed are kept.
- **Crews, colors, and pennants:**

  | # | Default name | Ship color | Pennant |
  |---|---|---|---|
  | 1 | Port Crew | red | triangle |
  | 2 | Starboard Crew | green | swallowtail |
  | 3 | Crow's Nest Crew | blue | square |
  | 4 | Powder Monkeys | purple | long streamer |
  | 5 | Sea Dog Crew | orange | zigzag |
  | 6 | Bilge Rat Crew | slate | rounded banner |

  Click a crew's name on the scoreboard to rename it (16 characters max).
- **One shared screen.** A facilitator runs the game on a screen-shared or projected display. Crews don't need their own copy.
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

Crews should **find and read the resolution in the library**, using the link on the card (the specific ticket, or [the full library](https://app.notion.com/p/clayrun/0edab6bc51a6493eaad1e6a342f60065?v=e390b30f8e9740fea92869bdaf266c16)).

A warning on the card reminds the room: **don't open a live Clay workspace.** Live workspaces can leave broken workflows behind — for example, Javier's ticket, which worked from the Run button but failed via the Claude MCP connector because of a missing work email.

The **Workflows** header button still opens an optional notes panel (saved in this browser). It is no longer the source of the question.

## 6. Turn structure

1. **Roll.** The crew at the wheel clicks **Roll the bones**. The die picks the framework (or the Kraken) and a unique library ticket.
2. **Find it in the library.** The facilitator reads the symptom and the crew looks up that ticket in the library — not in a live workspace.
3. **Work the framework out loud.** The crew says what they'd check first, the resolution, the framework, and a bug / user-error / unsure verdict. There is no countdown.
4. **Reveal.** Click **Reveal the diagnosis**. You'll see what was checked first, the resolution (and what they did next, from the library), the verdict and framework used, and the library link.
5. **Score.**
   - **Nailed it.** Solved alone: sail **the number rolled** (1 to 6), plus catch-up if it applies.
   - **Needed a nudge.** Needed a hint: sail **1** (in Foggy Narrows this is a miss instead).
   - **Missed it.** The original crew stays put, and the next crew may steal (see section 3).
6. **Pass the wheel.** The next crew in order takes the wheel, except after a **successful steal**, when the wheel skips the stealer and goes to the crew after them.

You can't lose ground. A ship stays put only on a miss (including a fog miss) or when its answer is stolen.

## 7. Scoring and winning

- Each crew's position is *Waypoint N / 29*. The crew at the wheel is highlighted on the scoreboard and on the map.
- Moves stop at the chest. You don't need an exact roll to land on it.
- **The first crew to reach waypoint 29 wins.** A "X marks the spot!" screen appears. With 3 or more crews, it also shows final standings. Click **Set sail again** to start a new voyage (the ticket chest is full again).

## 8. Timing

- **Date:** Wednesday, November 11, 2026, after the support meeting. It runs **twice**:
  - **Morning run:** London plus half of New York, at **7:00 AM PT (SF) / 10:00 AM ET (NY) / 3:00 PM GMT (London)**.
  - **Afternoon run:** San Francisco plus the other half of New York.
- **The game has no timer and no countdown**, in the UI or in these rules. Teams talk it out. First to the treasure wins. The facilitator may still keep the room moving in conversation, but nothing on screen counts down.
- **Room:** the team wants to book *Oxidation* in the new NY office.

## 9. Facilitator notes

- Narrate the game. Keep each crew on *which framework, what was checked first, the resolution, and the verdict*.
- Have crews say their answer **before** you click Reveal.
- You decide between *Nailed it*, *Needed a nudge*, and *Missed it*. A sensible bar for *Nailed it*: they named the right check or failure **and** the right verdict without a hint.
- On Kraken rolls, let the other crews call out "bug!" or "user error!" to keep everyone engaged.
- **Music** and **Sound effects** (keys **M** and **S**) sit in the header on a wide screen, or in a fixed pill at the bottom-left on a narrower one. Music starts off; sound effects start on. The choice is remembered in this browser.
- The **Theme** button switches between the standard deep-sea background and a darker "night sea" one.
- Game state (including which tickets have been drawn and a pending steal) is saved in the browser tab, so a refresh keeps it. Closing the tab starts fresh.

**In the room.** Project the game full screen. Give each crew a captain who announces the final answer.

**Remote.** One facilitator shares the browser tab. Paste the library link in chat so crews can open the ticket themselves. Don't send live workspace links.

**Running the file.** It's a single HTML file. Open it in a modern browser. Fonts load from Google Fonts; offline, it falls back to system fonts.

---

## Quick-reference card

> **ROLL TO RESOLVE: 2 to 6 crews race to the treasure (waypoint 29)**
>
> **Roll:** 1 Triggers · 2 Versions · 3 Passing data · 4 Write-backs · 5 Observability · 6 **Kraken**: framework hidden, so call bug or user error *first*
>
> **Each turn:** Roll → find the ticket in the **library** (not a live workspace) → work the framework out loud → Reveal → score
>
> **Move:** Nailed it alone = sail **the number rolled** · Needed a nudge = sail **1** · Missed it = stay put, and the **next crew in turn order** may steal and sail that same number
>
> **Chest:** 18 unique library tickets; no repeats until the chest is empty, then it is restocked
>
> **Stop effects (next turn after landing):** Foggy Narrows = no hints, a miss stays put then steal is offered · Kraken Deep = next roll is a Kraken · Mutiny Bay = reminder that a miss can be stolen · **Catch-up** (3+ crews): last place alone gets +1 for solving unaided
>
> **Then** the wheel passes (after a successful steal, it skips the stealer). **First to the chest wins.** No exact roll needed. **No timer.**
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
