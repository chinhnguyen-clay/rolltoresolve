# Roll to Resolve: Rules

*A pirate-themed troubleshooting race for **PSS Workflows Training, Session 2** (Wed Nov 11, 2026).*
*These rules describe what the game file (`index.html`, v3 with stop effects) does today. Ideas from the Oct 29 Chinh/Reagan review that the game doesn't do yet are listed in the mismatch section at the end.*

---

## 1. Premise

Two to six pirate crews race across a treasure map to a chest. Each turn, the crew at the wheel rolls a die. The face they roll picks one of the five Workflows troubleshooting frameworks, and the game draws a real customer "distress call" (a ticket modeled on #support-copilot cases) for that framework. The crew talks through the framework out loud and names where the workflow failed. Then the facilitator reveals the diagnosis. Solving it alone moves the ship further than solving it with a hint. The first crew to reach the chest "claims the Workflows playbook."

The game exists to practice the habit taught in Session 1: pin down the run, use the right framework, give a bug-or-config verdict, and write a two-sentence customer reply.

## 2. Setup and teams

- **Pick the number of crews (2 to 6).** Use the **Crews** control in the header. The default is 2. Changing the number **starts a new voyage**: every ship goes back to *Set Sail*, and the first crew takes the wheel. Crew names you've already typed are kept.
- **Crews, colors, and pennants:**

  | # | Default name | Ship color | Pennant |
  |---|---|---|---|
  | 1 | Port Crew | red | triangle |
  | 2 | Starboard Crew | green | swallowtail |
  | 3 | Crow's Nest Crew | blue | square |
  | 4 | Powder Monkeys | purple | long streamer |
  | 5 | Sea Dog Crew | orange | zigzag |
  | 6 | Bilge Rat Crew | slate | rounded banner |

  Click a crew's name on the scoreboard to rename it (16 characters max). The new name shows up everywhere, including the win screen.
- **Who's on which crew.** The final split isn't decided. Reagan is sending the group-split notes for the two time-zone runs (see Timing).
- **One shared screen.** A facilitator runs the game on a screen-shared or projected display. Crews don't need their own copy.
- **Set up the broken workflows before the session** (see section 5). Reagan is building one intentionally broken Clay workflow per framework. Reset their version history between runs.
- **Start a game.** Click **New voyage** (or change the crew count). All ships start at *Set Sail* (waypoint 0), and Crew 1 (Port Crew by default) takes the wheel first.

## 3. The board

There are 13 stops: **Set Sail (0)** → Tide Pools (1) → Gull Rock (2) → Shipwreck Shoals (3) → Smuggler's Cove (4) → **Foggy Narrows (5)** → **Kraken Deep (6)** → Dead Man's Reef (7) → Parrot Isle (8) → **Mutiny Bay (9)** → Skull Point (10) → Cannon Ridge (11) → **Treasure (12)**.

On screen, the board is a flat, engraved sea chart: parchment islands on a deep-teal sea, a dotted route from the dock at *Set Sail* to the chest on Treasure island, and a numbered parchment disc for each stop with its name on a label plate. Ships sail along the route when they move, and crews sharing a stop sit side by side. Any number of ships can share a stop. The crew at the wheel has a gold ring under its ship, and its ship bobs.

Shipwreck Shoals, Kraken Deep, Dead Man's Reef, and Skull Point have a red ring and a red number. That's just decoration and has no effect.

### Stop effects

Three stops have an effect. Each one is a bigger disc with a big icon and a one-line reminder under its name. When an effect kicks in, a banner with the icon appears over the map for a few seconds, and the same reminder stays at the top of the case card for the whole turn.

**How they work:** an effect is set when a ship **lands** on the stop, and it applies to **that crew's next turn only**. Then it's used up. A crew that stays on the stop (it missed and didn't move) doesn't trigger it again.

| Stop | Icon | Effect on the crew's next turn | What the facilitator does |
|---|---|---|---|
| **Foggy Narrows (5)** | Fog bank | **No hints this turn.** The *Needed a nudge* button becomes **Missed it (no hints in the fog) · stay put**. Nailed it still sails the number rolled. | Don't give a hint. If the crew can't solve it alone, click *Missed it*. The ship stays at Foggy Narrows, and the fog doesn't come back next turn. |
| **Kraken Deep (6)** | Tentacle | **The next roll is a Kraken card.** The die is forced to 6, the Kraken popup plays, and the framework is hidden until the reveal, like any Kraken. | Nothing extra. Score it like any Kraken roll (Nailed it = sail 6). |
| **Mutiny Bay (9)** | Black flag with crossed cutlasses | **If the crew misses, the next crew may steal it.** A third button appears after the reveal: **Missed it · *next crew* steals it (+1 to them)**. | When the crew at the wheel is stuck, let the next crew in turn order answer **before you click Reveal**. If they get it right, click the steal button. The crew that missed stays put, and the stealing crew sails 1. If nobody steals, score *Nailed it* or *Needed a nudge* as usual. |

### Catch-up wind (3 or more crews)

With **3 or more crews**, a crew that's **strictly behind every other crew** (no ties) gets **+1 space when it solves a card unaided**. The Nailed it button shows it (for example, *Nailed it · sail 4 +1 catch-up*), a reminder sits at the top of the card, and a "Catch-up wind!" banner appears when it's used. It doesn't apply to nudges or steals, and it never applies in a 2-crew game.

## 4. Dice: what each face tests ("the bones")

| Roll | Framework | Tagline | Cards in deck |
|---|---|---|---|
| 1 | **Triggers** | The "Did it run?" ladder | 5 |
| 2 | **Versions** | Live, Draft, and Ran | 5 |
| 3 | **Passing data** | Follow the value | 5 |
| 4 | **Write-backs** | Send, Accept, Land, Stick | 5 |
| 5 | **Observability** | Slow, Stuck, or Gone | 4 |
| 6 | **Kraken: Bug or Config?** | Snap verdict. The framework is hidden. | draws from all 24 |

- **On a 1 to 5,** the game draws a random card from that framework's deck.
- **On a 6 (Kraken),** the game secretly picks one of the five frameworks, then draws a random card from that deck. Until the reveal, the card says only *"Snap verdict · framework hidden until the reveal."* The crew must **make the bug-or-config call from the ticket alone**. A short "The Kraken rises!" animation plays over the card when it's drawn (it doesn't block any buttons). At the reveal, the tag changes to *"framework revealed: …"*, and the matching broken workflow appears.
- Draws are fully random. The same card can come up again within a game, and you can't choose a difficulty.

## 5. Broken-workflow slots (facilitator setup)

Click **Workflows** in the header to open the **Ship's orders** panel. Each of the five frameworks has two fields:

- **Broken workflow link.** The URL of that framework's intentionally broken Clay workflow. Anything starting with `http://` or `https://` becomes an "Open the broken … workflow ↗" link that opens in a new tab. Any other text is shown as typed.
- **Fixed when…** A one-line check that tells the crew they've fixed it. For example, "a new run completes and the value lands."

How the slots behave:
- They start as clear placeholders, such as *[Reagan: link to broken Triggers workflow]* and *[Reagan: one-line 'fixed when' check for Triggers]*. Placeholders are shown in grey italics so it's obvious when a slot hasn't been filled in.
- Changes save as you type, to the browser's **localStorage**. They survive refreshes and new voyages, but they're saved **per browser and per machine**. Fill them in on the computer you'll present from, or paste them in again on a new machine. **Reset to placeholders** clears all five.
- On the card, a slot appears **only after Reveal**, in a "Hands-on · broken *Framework* workflow" box under the customer reply. On a Kraken, the box shows the workflow for the framework that was secretly drawn.
- The panel also lists the open-bug cards (see section 9).

## 6. Turn structure

1. **Roll.** The crew at the wheel clicks **Roll the bones**. The die tumbles, and the case card shows the framework (or the Kraken) and the customer's distress call (ticket ID and quote).
2. **Read it aloud.** The facilitator reads the distress call to the room.
3. **Work the framework out loud.** The crew names the rung or check where it failed, gives a bug-or-config verdict, and drafts the customer reply.
4. **Reveal.** Click **Reveal the diagnosis**. You'll see:
   - **Work the framework:** the move to make (on a Kraken, it's prefixed with "Make the call first, then check:")
   - **Where it failed:** the diagnosis
   - **Verdict:** one of *Config / expected behavior*, *Real bug — escalate with evidence*, or *Customer's CRM admin*
   - **Two-sentence customer reply:** a model answer
   - **Hands-on box:** the framework's broken-workflow link and its "fixed when" line
5. **Hands-on (optional, facilitator's call).** The crew opens the broken workflow, finds the evidence, and checks it against the "fixed when" line.
6. **Score.** The facilitator judges how the crew did and clicks one button:
   - **✓ Nailed it.** The crew solved it alone and sails **the number they rolled** (1 to 6).
   - **Needed a nudge.** The crew needed a hint and sails **1**.
   - **Stop effects change these buttons** (see section 3): in Foggy Narrows the nudge button becomes *Missed it · stay put*, at Mutiny Bay there's a third *steals it* button, and with catch-up wind Nailed it sails +1.
7. **Pass the wheel.** The next crew in order takes the wheel (1 → 2 → … → last → 1). Turns always rotate, whatever the result.

You can't lose ground, but a ship can stay put: after a miss in Foggy Narrows, or when its answer is stolen at Mutiny Bay. Every other turn moves a ship at least one stop.

## 7. Scoring and winning

- Each crew's position is shown on the scoreboard as *Waypoint N / 12*. The crew at the wheel is outlined in gold and tagged "⚓ At the wheel."
- Moves stop at the chest. You don't need an exact roll to land on it.
- **The first crew to reach waypoint 12 wins.** A "X marks the spot!" screen appears with confetti in the winning crew's color. With 3 or more crews, it also shows the **final standings**: the winner first, then every other crew by waypoint. Click **Set sail again** to start a new voyage with the same crew count and names.
- **Game length:** a crew needs at least 2 of its own turns (two nailed 6s) and about 12 (all nudges), plus a turn for each miss in Foggy Narrows or steal at Mutiny Bay. With more crews there are more turns per lap, so the game runs longer. Budget for it (see Timing).

## 8. Timing

- **Date:** Wednesday, November 11, 2026, after the support meeting. It runs **twice**:
  - **Morning run:** London plus half of New York, at **7:00 AM PT (SF) / 10:00 AM ET (NY) / 3:00 PM GMT (London)**.
  - **Afternoon run:** San Francisco plus the other half of New York. The time wasn't set in the meeting.
- **Length:** Reagan said "an hour, at least." The Notion plan lists Session 2 as both 1 hour and 2 hours (see mismatches).
- **Per turn:** the game has no timer. The hands-on step is the slowest part, so cap it (for example, a few minutes per turn), or save hands-on for "Needed a nudge" turns. With 4 or more crews, also expect each crew to wait longer between its own turns.
- **Room:** the team wants to book *Oxidation* in the new NY office. Reagan is checking with Tess in #workplace-experience.

## 9. Facilitator notes

**General**
- Narrate the game. The in-person workshop showed that groups left on their own get bogged down in specifics. Keep each crew anchored on *which framework, which rung or check, and bug or config*.
- Have crews say their answer **before** you click Reveal. Use the revealed customer reply as a model to compare against, not something to read off.
- You decide between *Nailed it* and *Needed a nudge*. A sensible bar: they named the right rung or check **and** gave the right verdict without a hint.
- On Kraken rolls, let the crews not at the wheel call out "bug!" or "config!" to keep everyone engaged.
- The **Theme** button (lantern icon) switches between the standard deep-sea background and a darker "night sea" one. The cards stay parchment in both, for projector contrast. Pick whichever reads better on the room's screen.

**Open-bug cards (marked †, cards to swap).** These four cards have answers that depend on open bugs, so nothing can actually be fixed in a hands-on workflow. Their content is unchanged. A small **†** after the ticket ID marks them (hover for a tooltip). Consider swapping them for fixable cases:

| Card | Framework | Distress call | Why it's flagged |
|---|---|---|---|
| **#WF-233** | Triggers | "'Run 10' test says it accepted the rows, but no runs ever appear in the Runs list." | "Run 10" creates no runs (open bug) |
| **#WF-199** | Versions | "I restored V1 but the lookup steps I'd deleted didn't come back." | Restore can't rebuild edited-out lookup steps (confirmed bug) |
| **#WF-177** | Versions | "Why are both of my workflows pushing to the same HeyReach campaign?" | Duplicated workflows share nodes (WOR2-1615) |
| **#WF-224** | Observability | "My runs are missing from the Runs list — and 'Run analytics query failed.'" | Runs list dropping entries (platform issue) |

**In the room**
- Project the game full screen. The type is sized to be read from the back of a room.
- Give each crew a captain who announces the final answer.

**Remote (Zoom/Meet)**
- One facilitator shares the browser tab. Remote players don't click anything. For hands-on turns, a crew member can open the workflow link themselves if you paste it in chat.
- Ask crews to answer out loud or in chat. Call on a named person per turn so remote players get turns too. Reagan saw people talking over each other in the remote Jeopardy! session.
- If remote players struggle to read the screen, zoom the browser (Ctrl/Cmd +). The layout adjusts.

**Running the file**
- It's a single HTML file. Open it in a modern browser (Chrome, Edge, Safari, or Firefox). Fonts load from Google Fonts. Offline, it falls back to system fonts and still works.
- Game state (crew count, positions, the open card, the winner) is saved in the browser tab, so a refresh keeps it. Closing the tab starts fresh. The workflow slots are saved separately, in localStorage, and persist.
- Known quirk: if you refresh while a case card is open, the Roll button turns back on. Resolve the open card (Nailed it, Needed a nudge, or the stop-effect button) before rolling again. If you roll again instead, that turn's stop effect is lost, because it was used up by the first roll.
- Stop effects and catch-up are saved with the rest of the game state, so a refresh keeps them.
- Per the Notion plan: say "reset" for putting the broken workflows back, not "restore" (Restore is a Workflows feature). Don't create crew copies by duplicating a workflow, because duplicates share nodes with the original (WOR2-1615).

---

## Quick-reference card

> **ROLL TO RESOLVE: 2 to 6 crews race to the treasure (waypoint 12)**
>
> **Roll:** 1 Triggers · 2 Versions · 3 Passing data · 4 Write-backs · 5 Observability · 6 **Kraken**: framework hidden, so call bug or config *first*
>
> **Each turn:** Roll → read the distress call → work the framework out loud (rung or check, verdict, customer reply) → Reveal → *(optional)* open the broken workflow and check "fixed when"
>
> **Move:** Nailed it alone = sail **the number rolled** · Needed a nudge = sail **1**
>
> **Stop effects (next turn after landing):** Foggy Narrows = no hints, a miss stays put · Kraken Deep = next roll is a Kraken · Mutiny Bay = miss, and the next crew can steal it for +1 · **Catch-up** (3+ crews): last place alone gets +1 for solving unaided
>
> **Then** the wheel passes to the next crew. **First to the chest wins.** No exact roll needed.
>
> **Verdicts:** Config / expected behavior · Real bug (escalate with evidence) · Customer's CRM admin · **†** = open-bug card (facilitator only)

---

## Mismatches between the game, the meeting, and the Notion plan

**Resolved (Oct 29 update)**

- ✅ **Session placement, footer wording.** The footer now says this is the Session 2 game for the PSS Workflows training on Wed Nov 11, 2026. The "mockup" and "candidate for Session 1 or Session 2" wording is gone, and the header badge reads "Session 2 · Wed Nov 11." *(The Notion run-of-show still lists "Roll the dice game?" under Session 1. That's a Notion edit, not made.)*
- ✅ **The Kraken framework wasn't really hidden.** The framework name is now hidden until the reveal, so the label and the card agree.
- ✅ **Hands-on broken workflows.** Each framework now has an editable workflow link and "fixed when" slot, shown at the reveal (including on a Kraken). *The links themselves are still placeholders until Reagan builds the workflows.*
- ✅ **Team structure.** The game now supports 2 to 6 crews, not just 2.
- ✅ **Cards based on open bugs.** The four cards are marked † and listed above as cards to swap. Their content is unchanged, and they haven't been replaced yet.

**Still open**

1. **Difficulty.** In the meeting, Chinh said "we can choose a difficulty." The game has no difficulty levels or ordering. Every draw is random.
2. **What counts as "fixed."** The slots exist, but Reagan still needs to write each framework's "fixed when" line. Whether a hands-on fix is required to score "Nailed it" is the facilitator's call and isn't written down. Reagan also said "five or six" workflows, but the game has five framework slots (the Kraken reuses them).
3. **Booster or power-up cards.** These were discussed and agreed as a later add-on only if they fit. They aren't implemented.
4. **Movement rule still open.** In the meeting, Chinh said of the sail-1 rule "we can adjust the rules." The game uses: nailed = number rolled, nudge = 1, plus the stop effects and catch-up rule in section 3 (added Oct 29).
5. **Session 2 length and format.** Notion lists Session 2 as "1 hrs" in the run-of-show and "2 hours" in the plan. Its detailed agenda (path huddles, about 50 minutes of path presentations, cross-path discussion, a bug-or-config vote) predates the game. The meeting decided on a facilitated dice game of "an hour, at least."
6. **Bug-or-config vote.** Notion plans a live room vote on evidence-only cases. The game has only the Kraken face, where the crew at the wheel makes the call. There's no voting step.
7. **Confidence level.** Notion says every investigation ends with a verdict *and a confidence level*. The game shows a verdict only.
8. **Foundation skill missing.** Notion's foundation framework, "Read before you fix," isn't a die face or a card.
9. **Uneven decks.** Observability has 4 cards. The other frameworks have 5.
10. **Audience size and crew split.** The audience is 12–25 in Notion, "about 30" elsewhere in Notion, and "all 35 of us" in the meeting. How many crews to run per time-zone run hasn't been decided.
