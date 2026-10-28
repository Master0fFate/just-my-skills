# Concept: how to turn a song into a music video worth sharing

Read this before writing DIRECTION.md. The engine can render anything; what makes the result shareable is the concept. Work through the steps in order and write the answers down — vague concepts produce generic videos.

## Contents

1. Read the song
2. Find the story and the turn
3. Color script
4. Motif and data detail
5. Type system
6. Section roles
7. One visual idea per line
8. Scene archetype catalog (with example code)
9. What makes it spread on X / TikTok
10. The reference build, mapped

---

## 1. Read the song

You have two scores: the lyric table and the energy map from `analyze.py` (or, without it, your own listen-through notes and `useLevels()` checks).

- Read the whole lyric sheet once for meaning, then line by line for **concrete nouns and verbs** (rooms, ceiling, plates, door, calendar, phone, morning). Concrete words are where visual ideas come from; abstract words (love, feel, forever) need a metaphor you invent.
- Mark the **hook phrase** (the line that repeats most). It gets its own typographic treatment and escalates every time it returns.
- From the energy map, mark sections: intro, verses (drums in, steady), pre-choruses (dip, build), choruses (peak), drops, breakdown (very low), bridge (build), finale, ending. Note the exact seconds where energy jumps; those are your big cuts.
- Note tempo. Beat length = 60 / BPM. At 120–130 BPM a beat is ~0.48 s, a bar ~1.9 s. Scene lengths of 2, 4 or 8 bars feel right.

## 2. Find the story and the turn

Almost every song is a change of state: alone → together, broke → made it, hurt → healed, small town → city, night → morning. Write it as one sentence: **"Before X, then Y happens, after that Z."** Then find the **turn**: the lyric/section where the change happens (often the first pre-chorus or chorus).

Everything before the turn looks like "before", everything after looks like "after". The turn is where your accent color appears for the first time. This single decision gives a 3-minute video a shape people feel even if they can't name it.

If the song has no change (a pure party track, a flex track), use **escalation** instead: the world gets bigger, faster, more crowded each section; the final chorus is maximal.

## 3. Color script

- **Base world:** a dark near-black (`ink`) with paper-white type and grey support colors. Dark bases make light and color feel precious and keep text readable on phones. A light base works for bright, playful songs — choose deliberately.
- **Accent:** one saturated color that means the story's "after" (in the reference: violet `#6666ff` = "you"). Withhold it until the turn. Before the turn it may appear only once as a tease (e.g. the single word that names the change).
- **Warm second color:** introduced later for growth/warmth (sunrise amber in the reference). Optional.
- No rainbow, no neon-everything. Two colors plus neutrals reads as designed; six reads as a template.

If the user gave a brand color, it becomes the accent and the story is built so its reveal matters.

## 4. Motif and data detail

Pick one **recurring motif** that carries the story across sections and pays off at the end:

- a place (a tower of dark windows with one lit → all lit → two lights in one window),
- a light (one orb → two orbiting),
- a counter (DAYS ALONE 2,183 → counts down to 0 → DAY 1),
- an object (a chair, a phone, a door).

Add **small mono data details** that make it rewatchable: counters, case numbers, labels like `LEVEL 0.69 / MOVING`, timecodes, room numbers. They're tiny, they reward pausing, and they make it feel authored.

## 5. Type system

Default trio (already loaded by the starter):

- **Archivo Variable** — heavy grotesk with a **width axis (62–125)**. Width pumping on the bass is a signature move; condensed (wdth 62) + weight 900 stacks beautifully in vertical frames.
- **Instrument Serif italic** — for tender, quiet, or ironic words inside a loud line ("until", "quiet", "good mood"). Contrast inside a line is what makes type feel art-directed.
- **JetBrains Mono** — data details only, 22–34 px, tracked out, uppercase.

Swap fonts only with a reason (a genre that clearly wants something else). Use fontsource packages and add them to `src/fonts.ts`.

## 6. Section roles

| Section | Job | Typical treatment |
|---|---|---|
| Intro (before first vocal) | Hook on mute, set the world and the motif | Frame 0 already striking; slow camera; motif + counter; hand off with a push/whip |
| Hook lines | Impact; teach the viewer the phrase | Words slam one at a time, full-bleed, width snaps, accent tease on the key word |
| Verses | Make it relatable and funny | One literal visual pun per line; deadpan UIs; quick ideas, 2–4 s each |
| Pre-chorus | Tension | Slower, cinematic, a mechanism that builds (dial, door, light, flaps) and releases on the chorus downbeat |
| Chorus (×2–3) | Signature + payoff | A recurring world (3D) under massive kinetic type; one signature shot; each repeat clearly different and escalating |
| Drop / post-chorus | Pure energy | Tunnel / strobe-cut / speed bursts on every beat |
| Breakdown | Emotional center | Quiet, beautiful, the motif's payoff moment (counter reset, lights meet) |
| Bridge | Escalation | Each repetition bigger, ends in a transition move (zoom through a letter) that lands exactly on the chorus |
| Final drop | Callbacks | Rapid-fire references to earlier scenes on 8th notes, then the biggest version of the hook |
| Outro | Resolution | Return to the opening image, changed; title card; fade |

## 7. One visual idea per line

For each lyric line ask, in order:

1. **Is there a concrete object?** Make the words BE it or live on it: text that runs along ceiling cracks, words that physically stand up, a vault dial with the line on its ring, evidence markers around dirty plates.
2. **Is there an everyday UI or artifact that says it deadpan?** A call screen with "NOBODY" as the caller, a calendar whose days get struck out, a chat bubble that dissolves into laughter, a split-flap board, a receipt, a boarding pass, a loading bar. Design these originally — never copy a real app.
3. **Is there a light or space metaphor?** A door opening a light cone, blinds letting morning stripes in, a window lighting up.
4. **Is there a typographic transformation?** One word morphing into another (MAYBE → MINE on flaps), mirrored text that flips right, letters isolated far apart (ALONE), a wall of repetition with one line cutting through.
5. Otherwise give it **pure kinetic type** in the section's established style.

Then make sure each idea **reads in under a second** and has **one sync moment** (the pun lands on a specific sung word or beat). If two neighbouring lines got the same kind of idea, change one.

Humor matters: the relatable/funny lines (eating standing up, plates as evidence, laughing too hard to answer) are what people quote-post. Play them straight, deadpan.

## 8. Scene archetype catalog

Proven patterns from the reference build. Paths are under `examples/been-alone-until-you/scenes/`. Adapt, don't copy blindly: they reference that song's line ids and words.

**Worlds and 3D (Three.js via `Stage3D`)**
- Procedural apartment tower: instanced window grid, fog falloff, one lit window, camera pull-back; later windows wake on beats — `Intro.tsx`, `Outro.tsx`, `world/Tower.tsx`, `world/LitWindow.tsx`, `world/CameraRig.tsx`, `world/Wake.tsx`, `world/Haze.tsx`.
- Two lights orbiting with comet trails, dust, rings — `world/TwoLights.tsx`, `chorus/TwoLights3D.tsx`, `world/Dust.tsx`, `world/Glow.tsx`.
- Counter / odometer that ticks on beats and resets as a story beat — `world/Counter.tsx`, `Break.tsx`.

**Hook typography**
- Isolated letters, zigzag layouts, accent-color key word with glow, stamp flashes — `Hook.tsx`, `hooks/HookWords.tsx`, `hooks/type.ts`.
- CSS-3D text tunnel of repeated words with speed bursts on beats — `hooks/Tunnel.tsx`, `Drop.tsx`.
- Zoom through a letter's counter (the inside of the "O") into the next section — `hooks/ZoomO.tsx`, `Bridge.tsx`.
- Rapid callbacks montage on 8th notes — `hooks/Callbacks.tsx`, `FinalDrop.tsx`.
- Four chorus hook layouts (stack with width pump, scattered letters on rails, wall of repetition with a cutting panel, mirror reflection that breaks) — `chorus/HookStack.tsx`, `chorus/HookScatter.tsx`, `chorus/HookWall.tsx`, `chorus/HookMirror.tsx`.

**Signature moments**
- Flatline → waveform: a flat line becomes audio-driven wave rows that the words ride — `chorus/Flatline.tsx` (with `chorus/metrics.ts` for per-glyph advance widths, fit-to-width).
- Type face: two dots and a mouth line that bends into a smile on a sung word — `chorus/MoodFace.tsx`.
- Window grid lighting on beats (2D) — `chorus/WindowGrid.tsx`.
- Chorus variant theming (palette per variant, flash/inversion intensity) — `Chorus.tsx`, `chorus/theme.ts`, `chorus/blocks.ts`.

**Literal puns and deadpan UIs**
- Droste recursion: a photo plate containing itself, one level deeper per beat — `Rooms.tsx`.
- Text on procedural crack paths (SVG textPath), counter ticking — `Ceiling.tsx`, `verse1/cracks.ts`.
- Original incoming-call screen, rings on beats, "0 MISSED CALLS" — `Nobody.tsx`.
- Calendar week struck out with hand-drawn strokes per beat — `Calendar.tsx`, `verse1/scribble.ts`.
- Light cone through a door with words lying on the floor in perspective — `Door.tsx`.
- Vault dial with the line set on a ring, accelerating into a click-open flash — `Lock.tsx`.
- Words that lie flat and stand up when sung — `Standing.tsx`.
- Evidence markers + diagonal tape — `Evidence.tsx`.
- Chat bubbles with typing dots, words typing in as sung — `Chat.tsx`, `verse2/Bubble.tsx`.
- Bubble flood that multiplies on every beat — `Laughing.tsx`.
- Words living inside light stripes from blinds; sun disc rising — `Mornings.tsx`.
- Split-flap board morphing one word into another — `Maybe.tsx`, `verse2/flap.tsx`.

## 9. What makes it spread on X / TikTok

- **Frame 0 is the thumbnail and the hook.** Muted autoplay decides everything in the first second. Strong image + a tiny mystery (a counter, a single light).
- **Vertical 9:16, safe band.** Keep key text inside the central 4:5 band (feeds may crop). Large type: if it's not readable on a phone at arm's length, it's too small.
- **60 fps** motion looks noticeably more premium on X.
- **Quotable moments.** Funny/relatable lines rendered deadpan get clipped and quote-posted. Make at least three moments that work as a 5-second clip on their own.
- **Watermark through design.** The HUD (artist top-left, title bottom-left, beat dots, timecode) means reposts and clips still carry the name.
- **Loopable ending.** The outro resolves the first image; viewers who rewatch notice.
- **Length.** X without Premium caps at 2:20 — always export a clip that ends on a scene cut (platforms.md). The first ~80 s (intro → first chorus → first drop) is usually the strongest standalone cut.

## 10. The reference build, mapped

"Been Alone Until You" (126 BPM, 3:43). Story: six years alone → someone arrives. Turn: the first pre-chorus (a door opens and violet light enters). Before the turn everything is monochrome; the one hook word naming the other person is violet as a tease. Motif: a tower of dark windows with one lit window + a DAYS ALONE counter; the breakdown counts it down to 0 and flips to DAY 1; the outro shows the same window with two lights. Choruses share a two-lights 3D world and a flatline-to-waveform signature shot; variant 2 adds amber and a window grid lighting up; variant 3 inverts to paper white at the peak. Verses are deadpan puns (rooms, cracks, call screen, calendar, standing words, evidence, chat, laughter flood, blinds, split-flap). Final drop runs callbacks of verse motifs. Full direction: `examples/been-alone-until-you/DIRECTION.md`.
