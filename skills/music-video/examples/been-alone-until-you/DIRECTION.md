# BEEN ALONE UNTIL YOU — music video direction (shared by all scene workers)

Project root (PROJECT below):
C:\Users\fate\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\scratch-workspaces\a96c0cc5-81c6-4082-be69-2896bdad307f\5f3a5a54-a6a5-4a99-8418-b45726d9f02b\scratch-2026-10-28-a7b7d4\been-alone-until-you

## The goal

A vertical (1080x1920, 60 fps) music video for "Been Alone Until You" by prlxx (126 BPM dance-pop / house, 3:43) built to go viral on X/Twitter. It is NOT a lyric video. The lyrics are motion graphics living inside each scene: the words ARE the objects (they stand up, crack, ring, lie in a light beam, get crossed out, morph). Every scene must be entertaining to watch on mute and must hit the beat. Think award-level motion design reel, not a template. Each scene should have one clear, clever visual idea that makes someone stop scrolling and one "satisfying" sync moment.

The story: someone lived alone for six years (cold, quiet, monochrome, one white light), then "you" arrived (the violet light #6666ff) and life filled with motion and color.

## Color script (strict)

- `color.ink #07070b` background, `color.night #0e0e18`, `color.paper #f2f1ee` main type, `color.ash #8b8b98` secondary, `color.smoke #3a3a46` ghost/lines.
- `color.you #6666ff` = "you". `color.youHi #a6a6ff` highlights/glow cores, `color.youDeep #23238a` dark violet.
- `color.warm #ffb36b` = mornings/warmth. Appears only from Mornings (98.5 s) onward.
- 0 s – 30.5 s: monochrome only. The ONE exception: the word "YOU" in the Hook is violet (a tease of what is coming).
- From the Door scene (30.5 s) violet enters and stays.
- Glow is allowed and encouraged for violet light (layered text-shadow / additive sprites / radial gradients). No rainbow, no other hues, no neon cyberpunk, no emoji, no rounded "app card" UI slop, no drop-shadow card stacks.

## Typography (fonts are already loaded in src/fonts.ts)

- `font.display` = 'Archivo Variable', weight 100–900 and WIDTH axis 62–125. Animate width with `fontVariationSettings: "'wdth' <62..125>"` (or the Lyric `stretch` prop). Uppercase, tight leading (0.85–0.95), tight tracking (-0.02em to -0.04em) for big hooks; very condensed (wdth 62) + weight 900 looks great tall and stacked in vertical frames.
- `font.serif` = 'Instrument Serif' (regular and italic) for tender/quiet words and contrast inside a hook ("until", "quiet", and the soft closing phrases of lines 7 and 14).
- `font.mono` = 'JetBrains Mono Variable' for small data/UI details (counters, labels, timecodes), 22–34 px, letter-spacing 0.12–0.2em, uppercase.
- Lyric words are BIG: 110–260 px normally, hook words can be 300–600 px. Small text is only for deliberate details.
- Max two type styles per moment.

## Frame layout

- 1080 x 1920. Keep key lyric text inside the 4:5 center band y = 285 … 1635 (X may crop the feed preview to that). Side margin 72 px. Backgrounds and motion should still fill the full 9:16 frame.
- A global HUD (already rendered on top of every scene, do not duplicate it) sits at y≈118 (PRLXX, 4 beat dots) and y≈1755 (title, timecode). Don't put important things under it.
- A global film grain + vignette is already on top of everything (src/components/Grade.tsx). Don't add another grain.

## Tech contract (Remotion 4.0.539, React 19, three 0.186 + @react-three/fiber 9 via @remotion/three, GSAP 3.15)

Everything is a pure function of time. Rendering happens frame by frame, out of order, in parallel tabs.
- NEVER use Math.random, Date, performance.now, setTimeout, CSS transitions/animations/keyframes, requestAnimationFrame, or R3F `useFrame`. Use `rand(seed)` / `noise(x, seed)` from src/lib/motion.ts or `random(seed)` from remotion.
- Time hooks (src/lib/clock.tsx): `useTime()` → global seconds; `useScene()` → `{ t, from, to, local, duration, progress }` for the scene you are in. Prefer absolute song time `t` for anything synced to lyrics/beats, `local` for scene choreography.
- `useTimeline(build, time)` (src/lib/clock.tsx): build a paused GSAP timeline once (scoped to the returned ref; use class selectors inside the scope) and it gets seeked to `time` every frame. Elements animated by GSAP must not also get the same style properties from React props.
- Easing/tweening (src/lib/motion.ts): `ease("expo.out")` (any GSAP ease string, incl. "back.out(2)", "elastic.out(1,0.4)", "steps(6)"), `tween(t, start, dur, from, to, easeName)`, `progress(t, start, dur)`, `envelope(t, start, end, fadeIn, fadeOut)`, `mix`, `clamp`, `rand`, `noise`.
- Song data (src/lib/song.ts): `line(id)` → `{ id, section, text, start, end, words: [{ w, start, end }] }`; `beatAt(t)` → `{ index, start, since, until, phase }`; `barAt(t)` → `{ …, beatInBar }`; `pulse(t, decay=9)` = exp(-secondsSinceBeat*decay) → 1 on each beat decaying to 0 (use for kicks/bumps); `barPulse(t)`; `beats` (array of beat times), `beatsBetween(a, b)`, `nearestBeat(t)`, `BEAT` (0.476 s); `curve(name, t)` with names low (bass), mid, high (hats/air), rms, onset, energy (slow overall intensity), all 0..1.
- Word timing: `line(id).words` — per-word sung times. A separate process may refine src/data/words.json while you work, so NEVER hardcode word times; always read them from `line(id).words` / `useWords(id)`. Line windows (start/end) are fixed.
- Lyric component (src/components/Lyric.tsx): `<Lyric id mode="pop|rise|slam|blur|type" size family weight stretch tint ghost upper italic align stack lead hold exit style wordStyle />` and hook `useWords(id)` → `{ t, line, words: [{ w, start, end, index, age, on, active, p }] }`. Use it as a quick base, but most scenes should build custom word layouts with `useWords` so the words become part of the scene's idea.
- 3D: `<Stage3D camera={{ fov, position, near, far }}>` (src/components/Stage3D.tsx) wraps ThreeCanvas at full frame; inside it React context works, so `useTime()` works in 3D components. Max one Stage3D per scene. Use instancing for many objects. For text in 3D either render text to a CanvasTexture (fonts are loaded) or use CSS 3D transforms on DOM text instead (often crisper).
- Photo plates: `<Plate name="room" zoom={[1.06,1.16]} pan={[x,y]} exposure saturation contrast tint tintAmount origin>` (src/components/Plate.tsx) renders public/plates/<name>.png graded (desaturated, contrast, soft-light tint) with a slow push across the scene. Plates are being generated right now by another worker (928x1664, upscaled with cover): room (empty room, one chair, moonlight window), ceiling (cracked plaster ceiling, bare bulb, top-down), door (dark hallway, violet light spilling through an open door), sink (top-down sink with dirty plates), counter (single plate on a kitchen counter, no chair), blinds (blinds with warm sunrise stripes), mugs (two mugs on a sunrise windowsill). Check `ls PROJECT/public/plates` — a plate is only usable when its png exists; if yours isn't there yet, build the graphic layer first and check again later. Look at the plate image (Read tool) before laying graphics over it.
- Colors/fonts/frame constants: src/config.ts (`color`, `font`, `SAFE`, `FPS`, `WIDTH`, `HEIGHT`).

## Performance (the full video is 13,380 frames at 60 fps)

- Avoid CSS `filter: blur()` above ~16 px on large elements, and never on full-screen layers every frame. Prefer opacity/transform. Blur on individual words during a 0.2 s entrance is fine.
- Keep DOM under ~1,500 nodes per scene; use SVG paths or canvas/three for thousands of items.
- Keep the scene's first frame strong (cuts are hard cuts on beats; no slow fade from black unless it is the intro).

## Motion rules

- Every word appears exactly when it is sung (its `start`), with an entrance of 0.12–0.45 s. Unsung words are hidden or ghosted (opacity ≤ 0.15) — never fully visible early.
- Something moves on every beat: a bump, a cut, a flash, a counter tick, a camera push. Kick-reactive scale bumps use `pulse(t)` (1 + pulse*0.03…0.08). Hats can drive small jitter/flicker via `curve("high", t)`.
- Camera feel: slow continuous push/drift (never fully static) plus beat bumps. Optional subtle shake in high-energy parts via `noise(t*8, seed)`.
- Exits: lines hold briefly after `end` then leave with intent (wipe, collapse, fly, blur out) — or the scene cut replaces them.
- Small mono "data" details (counters, case numbers, labels) add a designed, rewatchable feel. Use sparingly.

## The timeline (seconds, cuts are on beats)

| Scene | from → to | lyric line ids | owner |
|---|---|---|---|
| Intro | 0 → 7.802 | — | world |
| Hook | 7.802 → 15.36 | 1, 2 | hooks |
| Rooms | 15.36 → 19.122 | 3 | verse1 |
| Ceiling | 19.122 → 23.394 | 4 | verse1 |
| Nobody | 23.394 → 26.62 | 5 | verse1 |
| Calendar | 26.62 → 30.476 | 6 | verse1 |
| Door | 30.476 → 38.023 | 7 | verse1 |
| Lock | 38.023 → 44.861 | 8 | verse1 |
| Chorus 1 | 44.861 → 75.604 | 9–14 | chorus |
| Drop | 75.604 → 84.335 | 15, 16 | hooks |
| Standing | 84.335 → 87.179 | 18 | verse2 |
| Evidence | 87.179 → 90.953 | 19 | verse2 |
| Chat | 90.953 → 94.737 | 20 | verse2 |
| Laughing | 94.737 → 98.511 | 21 | verse2 |
| Mornings | 98.511 → 105.593 | 22 | verse2 |
| Maybe | 105.593 → 111.746 | 23 | verse2 |
| Chorus 2 | 111.746 → 143.163 | 24–29 | chorus |
| Break | 143.163 → 159.927 | — (instrumental) | world |
| Bridge | 159.927 → 173.151 | 31–34 | hooks |
| Chorus 3 | 173.151 → 203.639 | 35–40 | chorus |
| Final Drop | 203.639 → 214.494 | 41, 42, 43 | hooks |
| Outro | 214.494 → 222.97 | — | world |

Energy: 0–15 medium (no full drums), 15.7–30 verse with drums, 30.5–44.8 pre-chorus dip, 44.9–75 peak, 75.6–84 drop, 84–98 verse, 98.5–112 pre-chorus dip, 112–142 peak, 143–158 breakdown (very quiet, almost no drums), 158–173 bridge build, 173–203 peak, 204–219 final drop, 219–223 ends.

Read lyric text and times from PROJECT/src/data/song.json (key "lyrics").

## Scene concepts

These are the intended ideas. You own the execution and may improve them, but keep the core idea and the color script.

Intro (world): Cold open on a procedural Three.js apartment tower at night: a vast grid of dark windows in fog, exactly one window lit cold white ("me"). First frame already intriguing (not black): close on the lit window, mono counter "DAYS ALONE 2,183" that ticks up one per bar to 2,190 (six years). Camera slowly pulls back to reveal the immensity: thousands of dark windows, one light. Light breathes with the bass. Last beat: rush toward the window to hand off into the Hook.

Hook (hooks): The song's hook, line 1 and line 2. Each word slams in huge, one at a time, full width. "ALONE" with its letters isolated far apart (each letter alone in its own space). "YOU" is the only violet thing in the first 30 s (glow + flash). Line 2 is a different composition from line 1 (e.g. the lone white dot / lone letter motif). Between the lines (10.2–11.8) a visual breath: letters drift apart in the void.

Rooms (verse1): drums kick in at 15.7. Droste/recursive zoom: the "room" plate contains a frame that contains the same room, pushing one level deeper on every beat = years repeating. Huge numeral "6". "QUIET" whispered (small serif italic) vs "ROOMS" heavy.

Ceiling (verse1): "ceiling" plate top-down. Procedural branching cracks (SVG) grow across the frame on beats; the lyric runs ALONG a crack path (SVG textPath) revealing as sung; mono counter "CRACKS COUNTED 0 → 1,284" ticking fast.

Nobody (verse1): original minimal incoming-call screen (not an iOS/Android clone): caller name slot reads "NOBODY" in huge type; ring pulses (concentric rings) on beats; the rest of the line as the status text; ends "0 MISSED CALLS". Deadpan funny.

Calendar (verse1): a big 7-day week grid MON–SUN. Words of the line fill cells as sung; each beat strikes a day out with a hand-drawn SVG stroke. At the end the grid falls away into darkness.

Door (verse1): violet arrives. "door" plate; the door opens and a violet light wedge sweeps across the frame; lyric words lie on the floor inside the light beam (perspective rotateX) and are revealed by the sweep; the line's closing phrase in serif italic; dust motes in the beam. Slower, cinematic (pre-chorus dip).

Lock (verse1): vault/combination-dial close-up made of concentric rotating rings with ticks; the line is set around a ring (text on circle) revealing as sung; tension builds (rings spin faster, ticks, shake) and on the last beat before 44.861 the lock clicks open with a white/violet flash into the chorus.

Chorus 1/2/3 (chorus): one component with `variant`. Blocks per chorus: hook lines (×2), the "silence" line (11 / 26 / 37), hook lines (×2), the "mood" line (14 / 29 / 40). Signature ideas:
- Hook lines: massive kinetic type (width axis pumping with the bass, words stacked full-bleed, "YOU" always violet) over a 3D world of two lights (white + violet orbs) orbiting each other with light trails and kick-reactive particles.
- Silence line: a flat horizontal line across the frame (silence = flatline). As the words are sung the line comes alive into a waveform driven by the audio curves, and the letters ride the wave; by "move" everything dances.
- Second hook pair: a different layout (e.g. a wall of repeating "ALONE" in ash with "UNTIL YOU" cutting through in violet).
- Mood line: a minimal type-face: two dots and a flat mouth line that bends into a smile on "good mood"; "STRANGER" shown mirrored then flipping right.
- Variant 1 establishes (ink, white, violet). Variant 2 adds warmth (amber) and a 2D grid of apartment windows lighting up on beats (callback to the lonely tower: now full of light). Variant 3 is maximal: everything harder, flashes on downbeats, inversions, faster camera. Each variant must look clearly different, not a copy.

Drop (hooks): lines 15 and 16. 3D/CSS-3D text tunnel: rings made of repeated "ALONE" rushing past the camera, speed bursts on beats, and on "YOU" the tunnel bursts open into violet light.

Standing (verse2): "counter" plate. The words lie flat on the counter and literally STAND UP one by one (rotateX 90° → 0°) as sung; "UP" jumps.

Evidence (verse2): "sink" plate top-down. Numbered evidence markers pop onto the plates on beats with dashed circles; a tape strip repeating the line's last words swings across diagonally (violet tape, white type); mono case label "CASE #2190 — STATUS: NOTHING".

Chat (verse2): original minimal chat thread: a violet incoming bubble with a typing indicator (dots bounce on beats), the line itself types into bubbles word by word as sung. Big, readable, designed — not a phone screenshot.

Laughing (verse2): the reply tries to type, then "HA" bubbles explode and multiply on every beat until the screen is full; the lyric line stays big on top. Everything flies up at the end.

Mornings (verse2): first warm light. "blinds" plate; horizontal slats open and the lyric words appear inside the light stripes (text masked by stripes); a warm sun disc rises behind the type. Slow, glowing, pre-chorus.

Maybe (verse2): split-flap departure-board letters: "MAYBE" flips letter by letter into "MINE" (M stays, others flip, the E drops off), on the sung words; the rest of the line around it; flips accelerate into the chorus.

Break (world): instrumental breakdown (quiet). Two lights (white and violet) slowly orbiting each other in a dark 3D void with drifting dust; the "DAYS ALONE 2,190" counter returns, counts DOWN to 0, then the label becomes "DAY 1". Build intensity in the last 2 s into the bridge.

Bridge (hooks): "Alone until you" ×4 (three short, one long). Each repetition closer/bigger with stronger strobes and black/white inversions; the long last one zooms INTO the "O" of ALONE (zoom-through-letter) whose inside becomes violet light, landing exactly on the chorus cut at 173.151.

Final Drop (hooks): lines 41–43, the maximal reprise: tunnel + strobe + rapid-fire callbacks of earlier motifs as type ("6 YEARS", "NOBODY", "CRACKS", "MAYBE→MINE") on 8th notes, final "YOU" slam.

Outro (world): back to the tower at night, wide: the one lit window now holds TWO lights (white and violet) side by side; counter "DAYS ALONE 0"; title "Been alone until you" in Instrument Serif italic + "prlxx" mono; music ends ~219.5–220, hold, fade to black by 222.9.

## Verify your work visually (mandatory)

- Render stills and contact sheets as described in the skill's references/stack.md §8, then look at every image. Check several moments per scene: first frame, word entrances (a few frames apart, e.g. word.start + 0.03, +0.1, +0.3), beat hits, the exit, and the last frame.
- Iterate until it genuinely looks like a premium motion-design piece. Fix weak composition, empty frames, unreadable text, text outside the safe band, misaligned overlays.
- `npx tsc -p .` must pass with no errors before you finish.
- Delete your out/*.jpg stills when done.

## Code rules (hard)

- NO code comments of any kind. Clear names instead.
- Named arrow-function exports like the existing code (`export const Rooms = () => …`), TypeScript, no default exports, no unused imports, no dead code.
- Only edit the files you own (your scene files, plus new files you create under src/scenes/). Do not edit src/lib, src/components, src/config.ts, src/Video.tsx, src/Root.tsx, src/fonts.ts, package.json. If you truly need a shared change, describe it in your report instead.
- Do not install packages.
