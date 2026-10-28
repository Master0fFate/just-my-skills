# DIRECTION.md template

Copy everything below the line into `PROJECT/DIRECTION.md` and fill every `<…>`. This is the only context scene builders get besides the engine reference, so be concrete: name colors, sizes, moments, words. A filled example: `examples/been-alone-until-you/DIRECTION.md`.

---

# <TITLE> — <ARTIST> — music video direction

Project root: `<absolute PROJECT path>`
Stack reference: `<absolute SKILL path>/references/stack.md` (read it before writing code)
Examples: `<absolute SKILL path>/examples/been-alone-until-you/scenes/` (proven patterns; adapt, don't copy line ids or words)

## The goal

A <aspect, e.g. vertical 1080x1920>, <fps> fps music video for "<TITLE>" by <ARTIST> (<BPM> BPM, <genre/feel>, <duration>) built to be shared on <platforms>. It is NOT a lyric video: the lyrics are motion graphics living inside each scene; the words ARE the objects. Every scene must be entertaining on mute and hit the beat. One clear, clever idea per scene and one satisfying sync moment.

The story: <one sentence: before → turn → after>.

## Color script (strict)

- `color.ink <hex>` background, `color.night`, `color.paper` type, `color.ash` secondary, `color.smoke` ghost/lines.
- `color.accent <hex>` = <what it means in the story>. `color.accentHi` glow cores, `color.accentDeep` dark tint.
- `color.warm <hex>` = <meaning>, appears only from <scene/time> on (or "not used").
- <0 → turn time>: <base only>. The one exception: <the tease, e.g. the word "YOU" in the hook is accent-colored>.
- From <turn scene/time> the accent enters and stays.
- Glow is allowed for the accent (layered text-shadow, additive sprites, radial gradients). No other hues, no neon-everything, no emoji, no rounded "app card" slop.

## Typography

- `font.display` (Archivo Variable, weight 100–900, width 62–125): <how it's used — e.g. uppercase hooks, wdth 62 + 900 stacked, width pumping on the bass>.
- `font.serif` (Instrument Serif, italic): <tender/ironic words, which ones>.
- `font.mono` (JetBrains Mono): data details only, 22–34 px, tracked 0.12–0.2em, uppercase.
- Lyric words are big: <size range for this aspect>; hook words up to <size>. Max two type styles per moment.

## Frame

- <WIDTH>x<HEIGHT>. Key text inside the safe band (`SAFE` in config: <values>). Backgrounds fill the full frame.
- Global HUD (already rendered — don't duplicate): <positions>. Global grain + vignette already on top — don't add grain.

## Motif

<the recurring motif, its states across the song, and its payoff> 
Data details: <counters/labels and where they appear>.

## Tech contract

Read `stack.md`. Everything is a pure function of time; no Math.random/Date/timers/CSS animations/useFrame. Read word times only via `useWords(id)` / `line(id).words`. One `Stage3D` per scene max. Avoid big CSS blur on large layers.

## Motion rules

- Every word appears exactly at its sung `start` with a 0.12–0.45 s entrance; unsung words hidden or ghosted (≤ 0.15).
- Something moves on every beat (`pulse(t)` bumps, cuts, ticks, flashes). Hats via `curve("high", t)` for small jitter.
- Camera never fully static: slow push/drift + beat bumps; optional subtle shake in high-energy parts.
- Exits with intent, or let the cut replace them. Each scene's first frame is already strong (hard cuts on beats).
- Full-frame flashes 1–3 frames, ≤ 4 per second.

## Timeline

| Scene | from → to | lines | owner |
|---|---|---|---|
<one row per <Scene> in src/Video.tsx, with the resolved seconds>

Energy: <section-by-section energy notes from the analyzer, with seconds>.

Lyric text and times: `src/data/song.json` (key "lyrics"); words: `useWords(id)`.

## Scene concepts

<One paragraph per scene: the visual idea, how the words become the object, the sync moment, colors, camera, first frame, exit/hand-off. For multi-block scenes (chorus), list blocks and how variants differ.>

## Plates

<list of public/plates/*.png with content and where the empty space is — or "procedural only">

## Verify (mandatory for every scene)

- Stills and contact sheets per stack.md §8, written to `out/<your-label>/` only: word entrances (start + 0.03, +0.1, +0.3), beat hits, the exit, and the last frame. Read every image.
- Iterate until it looks like a premium motion-design piece: fix weak composition, empty frames, unreadable or clipped text, text outside the safe band, misaligned overlays.
- `npx tsc -p .` clean. Delete your `out/<your-label>/` folder when done; never delete other folders in `out/`.

## Code rules

- Named arrow-function exports matching existing code, TypeScript, no default exports, no unused imports, no dead code. <add the user's own style rules here, e.g. "no code comments">.
- Only edit the files you own (your scene files plus new files in your own `src/scenes/<folder>/`). Don't edit `src/lib`, `src/components`, `src/config.ts`, `src/Video.tsx`, `src/Root.tsx`, `src/fonts.ts`, `package.json` — describe needed shared changes in your report instead.
- Don't install packages.
