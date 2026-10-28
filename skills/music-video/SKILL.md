---
name: music-video
description: Build a scroll-stopping, beat-synced music video for a song, where the lyrics are motion graphics living inside cinematic scenes (not a plain lyric video), using Remotion + Three.js + GSAP, rendered to MP4 and exported for X/Twitter, TikTok, Reels, Shorts or YouTube. Use this whenever someone hands over an audio track (mp3/wav/m4a) and wants a music video, an animated video for their song, a lyric motion video, kinetic typography for a track, a visualizer with lyrics, or "a banger video for socials" — even if they never mention Remotion, code, or lyrics files. Checks what the machine has, offers optional upgrades (beat analysis, word timing, image generation), and builds with whatever is available.
---

# Music Video

You direct and build a music video people stop scrolling for. Every scene is code in a Remotion project: React/DOM type, SVG, Three.js, GSAP easing, optional photo plates. The lyrics are not subtitles; each line becomes the object of its scene (words that crack along a ceiling, ring as an incoming call, stand up off a table, flip on a split-flap board).

The video this skill was distilled from is in `examples/been-alone-until-you/` (3:43, 9:16, 60 fps, 22 scenes): its `DIRECTION.md` and scene code are the quality bar.

## The bar

- **A music video, not a lyric video.** Every line has a visual idea, usually a literal pun where the words are the objects. Words appear when they're sung.
- **A story with a color script.** Restrained base world, one accent color revealed at the story's turn, an optional warm color for growth, a motif that pays off at the end.
- **Frame 0 hooks on mute.** Feeds autoplay muted; the first frame is the thumbnail. Never black.
- **Something lands on every beat.** Cuts, bumps, ticks, flashes.
- **Distinct, readable scenes.** Big type inside the safe band, strong first frame per scene (cuts are hard cuts on beats), choruses that escalate instead of repeating.
- **An ending.** Callbacks in the final section, the outro resolves the opening image, a title card.
- **Clean.** Flashes 1–3 frames, ≤ 4 per second. Deterministic renders (no flicker).

## Ground rules

- **Lyrics come from the user** — their lyrics file, or a transcription of the audio they gave you. Don't look lyrics up online or write them from memory. No lyrics → ask for a file, or make a visual-only video.
- **Visuals are original.** Invent characters, UIs and marks. A "call screen" or "chat thread" is your own design, never a copy of a real app. No brand logos, no well-known characters.
- If the track is clearly someone else's commercial release, mention once that posting it may get claimed, then carry on.
- Remotion is free for individuals and companies up to 3 people; bigger companies need a license (remotion.pro). Mention it once if relevant.

## Workflow

`SKILL` = this skill's folder. `PROJECT` = the video project you create.

### 1. Intake

Collect from the conversation, then ask once (AskUserQuestion if available) only for what's missing:

- audio file (required) and lyrics file (CSV, LRC, SRT, VTT or plain text — any timed format is best)
- title and artist (default: parse "Artist - Title.mp3")
- platform → aspect (default X/TikTok: 9:16 at 60 fps; YouTube: 16:9)
- accent / brand color (optional; otherwise pick one in the concept)

### 2. Check the machine and offer upgrades

Probe, don't assume. Read `references/upgrades.md` for the exact commands and what each result means. In short:

- **Node ≥ 18 is required** (the stack is Remotion). If it's missing, stop and ask the user to install Node LTS.
- Then offer the upgrades in ONE question with plain costs, and build with whatever the user picks:
  1. **Beat analysis** (Python + `librosa`): exact beat grid, downbeats, bass/mid/high curves → cuts and hits land on the beat. Without it: Remotion's built-in audio levels drive the motion and cuts follow the lyric timing.
  2. **Word timing** (Python + Whisper): every word pops exactly when sung. Without it: words are spread across each line by syllables.
  3. **Photo plates** (image generation): if you have no image tool, offer the author's free plugin imagegen-cc (local models on your GPU): https://github.com/Master0fFate/imagegen-cc. Without it: everything is procedural, which is how the strongest scenes in the reference were made anyway.
  4. **ffmpeg** (system build): contact sheets for review and fades on the short cut. Without it: review individual stills; exports still work with Remotion's bundled ffmpeg.
  5. **No GPU**: suggest 30 fps.

### 3. Set up the project

Follow `references/stack.md`: copy `SKILL/assets/starter` to PROJECT (prefer a short path like `~/videos/<song>` — Windows breaks on very deep folders), copy the audio to `public/`, set title/artist/aspect/fps/accent in `src/config.ts`, `npm install`.

Then the song data:

- With the beat-analysis upgrade: convert the lyrics to `lyrics.csv` (`id,section,text,start,end`; you can read LRC/SRT/VTT and write the CSV yourself), copy `SKILL/assets/analyze.py` into `scripts/` and run it. It writes `src/data/song.json` and `curves.json` and prints an energy map — your score.
- With the word-timing upgrade: copy `SKILL/assets/words.py` and run it in the background (`src/data/words.json`; ~10 min on CPU).
- Without upgrades: write `src/data/song.json` yourself from the lyrics file (shape in `references/stack.md`) and use `useLevels()` for audio reactivity.

### 4. Concept

Read `references/concept.md` — the creative method and the most important file here. Decide the story and its turn, the color script, the motif, the type system, a role per section, and one visual idea per lyric line. Write `PROJECT/DIRECTION.md` from `references/direction-template.md`; it's the contract every scene follows. Tell the user the concept in 5–8 lines and keep going, unless they asked to approve it first.

### 5. Timeline

List the scenes in `src/Video.tsx` (`<Scene name from to>`), one per verse line, a reusable multi-block component for choruses (`variant` prop), dedicated scenes for hooks, drops, bridge, breakdown, intro and outro. Put cuts on a beat just before each scene's first sung word (`references/stack.md` has the snippet). Stub unbuilt scenes with `<Placeholder>` so the whole video plays from the start (`npm run dev`).

### 6. Plates (only if image generation is on)

Generate all plates **before** building scenes. The image model and Remotion's WebGL renders share the GPU and slow each other to a crawl. Prompt rules: `references/production.md`.

### 7. Build the scenes

`references/stack.md` has the API and the determinism rules. `references/production.md` has the build split.

- **With subagents:** 4–6 parallel workers by section (world/intro/outro, hooks + drops + bridge, verse 1 + pre-chorus, chorus variants, verse 2 + pre-chorus). Each gets DIRECTION.md, `stack.md`, the matching example files, the files it owns, and the verify loop.
- **Without subagents:** build in order of impact: first 15 seconds, chorus, drops, then the rest.

### 8. Review like a director

Look at stills and contact sheets of every scene, both sides of every cut, and a run of consecutive frames around a beat. `references/production.md` has the commands and the checklist. Fix, re-check what changed, keep `npx tsc -p .` clean.

### 9. Render, export, hand off

Time a 4-second sample for an honest ETA, render the master in the background, then encode per platform with the ffmpeg commands in `references/platforms.md` (always make a ≤ 2:20 cut for X). Verify each file (duration, size, decodes end to end), deliver it, and say what you checked and what you didn't. Delete your stills and samples.

## Pitfalls from the reference build

- **Windows long paths:** in very deep folders Remotion's Chrome/ffmpeg fail with `spawn … ENOENT` even though the files exist. Use a short project path, or the config fix in `references/stack.md`.
- **GPU contention:** never generate images while rendering.
- **Flicker = non-determinism:** no `Math.random`, `Date`, timers, CSS animations, or R3F `useFrame`; everything derives from time.
- **Parallel workers** each write stills to their own folder; nobody runs `rm out/*`.
- **Heavy CSS blur** on big layers every frame kills render speed.
