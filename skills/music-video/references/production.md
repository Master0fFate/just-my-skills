# Production: plates, building, review, render

## Contents

1. Plates
2. Splitting the build across workers
3. Worker brief
4. Building solo
5. Review checklist
6. Render

---

## 1. Plates

Photo plates are backgrounds that the graphics sit on (a room, a ceiling, a sink, blinds). They make verses feel like a music video instead of a type reel. Use them for organic, real-world subjects; keep anything that needs exact control (window grids lighting on beats, tunnels, orbiting lights) procedural.

- Generate **all** plates before scene work: an image model and Remotion's WebGL renders on one GPU slow each other to a crawl (2.5 min/image became 40 min in the reference build).
- Vertical: 928×1664 (or the model's nearest 9:16). Landscape: 1664×928. `Plate` covers and pushes in, so slight upscaling disappears under grain.
- No people, faces or hands, no readable text, no logos. Real-photo look, not CGI. Say where the empty space for type goes ("upper third mostly empty wall").
- Style suffix to adapt: *"Cinematic 35mm film still, vertical composition, shot on Kodak Vision3, low key lighting, deep blacks, soft halation around light sources, fine film grain, shallow depth of field, quiet and minimal, no people, no text."*
- Don't ask for "extremely dark" — models obey and you get unreadable black frames. Ask for visible midtone detail.
- One at a time; look at each; at most two retries. Save to `public/plates/<name>.png`, copying from the tool's reported absolute path (some tools resolve relative save paths elsewhere). Note subject/empty-space positions in DIRECTION.md.

## 2. Splitting the build across workers

Before launching: project set up, song data written, DIRECTION.md done, every scene in `Video.tsx` with a `Placeholder` (the full video plays), plates generated.

Split by section so each worker owns a visual family and one helper folder. A 3–4 minute song maps well to five groups:

| Group | Scenes |
|---|---|
| world | intro, breakdown/instrumental, outro (the motif's place, lights, counter) |
| hooks | hook lines, drops, bridge, final drop (hook typography, tunnels, strobes) |
| verse 1 | verse 1 lines + pre-chorus 1 (the "before" puns, the turn) |
| chorus | one Chorus component with variants (the signature and its escalation) |
| verse 2 | verse 2 lines + pre-chorus 2 (the "after" puns) |

Merge groups for short songs, split further for long ones. Launch all workers in one message. Expect 25–40 minutes each.

## 3. Worker brief

Workers see only their brief, so it must stand alone:

> You are building scenes for a Remotion music video. Read the direction doc in full first — it is your brief, contract and style guide: `<PROJECT>/DIRECTION.md`. Then read `<SKILL>/references/stack.md` and the foundation code (`src/lib`, `src/components`, `src/config.ts`, `src/Video.tsx`).
>
> You own: `<files>` (each currently a placeholder with the same export name; keep the names) and a new folder `src/scenes/<group>/`. Scene times and lyric lines: `<rows>`.
>
> What matters most: `<3–5 specific bullets: the idea, the sync moments, the color rules for this stretch, the first frame, the hand-off into the next scene>`.
>
> Proven patterns to adapt: `<example paths from concept.md §8>`.
>
> Verify visually with stills and contact sheets (stack.md §8) written to `out/<group>/` only. Read every image, iterate until it looks premium, keep `npx tsc -p .` clean, delete your `out/<group>/` when done. Only edit your own files.
>
> Report in under 200 words: what each scene does, timestamps worth checking, anything you couldn't get right, shared-code changes you'd want.

Keep final judgment for yourself: review their work as in §5, don't trust reports.

## 4. Building solo

Build in order of impact so a partial result is still strong: intro + first hook (the first 15 seconds decide whether anyone watches), chorus variant 1 then the others, drops, bridge, verses, outro. After each scene: still → look → fix → next. Keep a running fix list instead of polishing one scene forever.

## 5. Review checklist

Make a contact sheet per scene, stills on both sides of every cut (0.03 s before and after), and a 12-frame strip at two high-motion moments (commands in stack.md §8). Check:

- **Frame 0** is striking on mute and works as a thumbnail.
- **Color script** holds: no accent before the turn except the planned tease; warm color only where planned.
- **Text** is big, inside the safe band, not clipped at the edges (fit long words to width), not under the HUD.
- **Each scene's first frame** is strong; no near-empty frames right after cuts.
- **Cuts**: no black frames or double exposures; match cuts where planned.
- **Words** appear on their sung times (spot-check a few at start + 0.03 s).
- **Beat**: something visibly reacts on beats in every scene.
- **Flashes**: 1–3 frames, ≤ 4 per second; no long white holds.
- **Variety**: neighbouring scenes use different ideas; chorus variants look clearly different.
- **Finale**: callbacks present; the outro resolves the opening image; title card legible.
- **Strip**: consecutive frames move smoothly (flicker means non-determinism).
- **Code**: `npx tsc -p .` clean; the determinism grep (stack.md §7) prints nothing.

## 6. Render

1. Sample: `npx remotion render Video out/sample.mp4 --frames=0-239`, time it, and give the user an ETA (a 3:43 song at 60 fps is 13,380 frames; ~8–9 fps on a strong GPU ≈ 25–30 min).
2. Full render in the background: `npx remotion render Video out/master.mp4` (archive quality, often over 500 MB).
3. Platform exports with the commands in `platforms.md`.
4. Verify every output: `npx remotion ffprobe <file>` for duration/size, a decode pass (`npx remotion ffmpeg -v error -i <file> -f null -`), and a frame strip from the file itself (system ffmpeg; otherwise a couple of stills).
5. Hand off: deliver the files, say what the video is (story and a few signature moments), which file goes where, what you checked and what you didn't (usually: watching it end to end with sound), and delete your stills/samples.
