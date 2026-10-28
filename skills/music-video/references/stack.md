# Stack: Remotion + Three.js + GSAP

## Contents

1. Set up the project
2. Song data files
3. Time and beats
4. Motion helpers
5. Components
6. Writing a scene and the timeline
7. Determinism rules
8. Stills, contact sheets, renders
9. Windows long paths

---

## 1. Set up the project

```bash
cp -r SKILL/assets/starter PROJECT        # Windows PowerShell: Copy-Item -Recurse SKILL\assets\starter PROJECT
cp "<song file>" PROJECT/public/song.mp3  # create public/ first; keep the real extension if not mp3
cd PROJECT && npm install
```

Pinned versions (tested together): remotion / @remotion/cli / @remotion/three / @remotion/media-utils 4.0.539, react 19.3.1, three 0.186.1, @react-three/fiber 9.8.2, gsap 3.15.0, fonts from fontsource (Archivo Variable, Instrument Serif, JetBrains Mono). If a newer Remotion is out, keep all `remotion`/`@remotion/*` on the same exact version.

Edit the top of `src/config.ts`: `meta` (title, artist), `AUDIO` (file name in public/), `ASPECT` ("9:16" | "16:9" | "1:1" | "4:5"), `FPS` (60, or 30 without a GPU), `HUD`, `ACCENT`, `WARM`. Everything else (WIDTH, HEIGHT, SAFE band, palette) derives from those. Edit the neutral colors there if the concept wants a light base. `npm run dev` opens Remotion Studio.

Layout:

```
PROJECT/
  DIRECTION.md, lyrics.csv
  public/song.mp3, public/plates/*.png
  scripts/analyze.py, scripts/words.py      (only with the upgrades)
  src/config.ts, fonts.ts, Root.tsx, Video.tsx
  src/lib/clock.tsx, song.ts, motion.ts, levels.ts
  src/components/Lyric.tsx, Plate.tsx, Stage3D.tsx, Grade.tsx, Hud.tsx, Placeholder.tsx
  src/scenes/<Scene>.tsx + helper folders per section
  src/data/song.json, curves.json, words.json
```

## 2. Song data files

`src/data/song.json` (from `analyze.py`, or written by you):

```json
{ "fps": 30, "duration": 223.0, "bpm": 126.05,
  "beats": [0.22, 0.708], "downbeats": [1.66, 3.541], "kicks": [],
  "lyrics": [{ "id": 1, "section": "Hook", "text": "words as sung", "start": 8.145, "end": 10.19 }] }
```

- **With librosa** (`python scripts/analyze.py [audio] [lyrics.csv]`): fills everything plus `curves.json` (`low`, `mid`, `high`, `rms`, `onset`, `energy`, 0..1 at 30 fps) and prints an energy map in 2-second rows. `lyrics.csv` columns: `id,section,text,start,end` (times as seconds or `mm:ss.mmm`; rows without a start are skipped). Convert LRC/SRT/VTT to this CSV yourself — read the file, write the CSV.
- **Without librosa**: write song.json yourself. Duration: `npx remotion ffprobe public/song.mp3`. Lyrics from the user's file. If the user knows the BPM and when the first downbeat hits, generate `beats` as `offset + k * 60 / bpm` and `downbeats` as every 4th beat; otherwise leave both `[]` (then `pulse()` returns 0 and you use `useLevels()` for hits). Leave `curves.json` as shipped (zeros).
- `src/data/words.json` (from `words.py`): `{ "<line id>": [{ "w": "word", "start": 8.14, "end": 8.45 }] }`. Without it, words are spread across each line by syllables automatically.

## 3. Time and beats

```ts
import { useTime, useScene, useTimeline } from "../lib/clock";
import { beatAt, barAt, pulse, barPulse, beats, beatsBetween, nearestBeat, cutBefore, BEAT, BPM, DURATION, curve, line, lines } from "../lib/song";
import { useLevels } from "../lib/levels";
```

- `useTime()` → global song seconds; `useScene()` → `{ t, from, to, local, duration, progress }` inside a scene. Use global `t` for anything synced to lyrics/beats; `local`/`progress` for scene choreography.
- `pulse(t, decay = 9)` → 1 on each beat, decaying (the universal kick bump: `scale(1 + pulse(t) * 0.05)`); `barPulse(t)` for downbeats; `beatAt(t)` / `barAt(t)` for phase and index; `nearestBeat`, `beatsBetween`, `BEAT` (seconds per beat).
- `curve(name, t)` → analyzed levels (librosa path). `useLevels()` → `{ low, mid, high }` for the current frame from Remotion's built-in `visualizeAudio` — works with no analysis at all.
- `line(id)` → `{ id, section, text, start, end, words: [{ w, start, end }] }`; always read word times from here or `useWords(id)` — never hardcode them.
- `useTimeline(build, time)` → a paused GSAP timeline built once and seeked every frame; for long hand-choreographed sequences (animated elements must not also get those styles from React props).

## 4. Motion helpers (`lib/motion.ts`)

`ease("expo.out")` (any GSAP ease string, e.g. `"back.out(2.2)"`, `"elastic.out(1,0.4)"`, `"steps(6)"`), `tween(t, start, duration, from, to, ease)`, `progress(t, start, duration)`, `envelope(t, start, end, fadeIn, fadeOut)`, `mix`, `clamp`, `rand(seed)`, `noise(x, seed)` (smooth −1..1 for drift and shake).

Timings that feel right: word entrances 0.12–0.45 s, slams 0.18–0.25 s `expo.out`, overshoot `back.out(2)`, exits 0.2–0.35 s `power2.in`.

## 5. Components

- `<Lyric id mode size family weight stretch tint ghost upper italic align stack lead hold exit style wordStyle />` — quick kinetic line (`pop`, `rise`, `slam`, `blur`, `type`); `stretch` = Archivo width axis 62–125; `ghost` = opacity of unsung words. For real scenes build custom layouts with `useWords(id)` → `{ t, line, words: [{ w, start, end, index, age, on, active, p }] }`.
- `<Plate name zoom pan exposure saturation contrast tint tintAmount origin>` — graded photo from `public/plates/<name>.png`, slow push across the scene.
- `<Stage3D camera={{ fov, position }}>` — full-frame Three.js canvas; `useTime()` works inside. One per scene; instancing for many objects; additive sprites for glow.
- `<Grade>` (grain + vignette) and `<Hud>` (artist, title, beat dots, timecode) are mounted once in `Video.tsx`. Don't add more grain; keep important things out from under the HUD.
- `<Placeholder title ids>` — stub for unbuilt scenes.
- `config.ts`: `color.ink/night/paper/ash/smoke/accent/accentHi/accentDeep/warm`, `font.display/serif/mono`, `SAFE` (central 4:5 band on vertical frames: y 285–1635 at 1080×1920), `WIDTH`, `HEIGHT`, `FPS`, `VERTICAL`, `meta`.

## 6. Writing a scene and the timeline

```tsx
import { AbsoluteFill } from "remotion";
import { useWords } from "../components/Lyric";
import { color, font, SAFE } from "../config";
import { useScene } from "../lib/clock";
import { tween } from "../lib/motion";
import { pulse } from "../lib/song";

export const Rooms = () => {
  const { t, progress } = useScene();
  const { words } = useWords(3);
  return (
    <AbsoluteFill style={{ background: color.ink, transform: `scale(${(1 + progress * 0.06) * (1 + pulse(t) * 0.04)})` }}>
      <div style={{ position: "absolute", top: SAFE.top, left: SAFE.side, right: SAFE.side, display: "flex", flexWrap: "wrap", gap: "0 0.25em", fontFamily: font.display, fontWeight: 900, fontSize: 180, lineHeight: 0.9, color: color.paper, textTransform: "uppercase" }}>
        {words.map((word) => (
          <span key={word.index} style={{ display: "inline-block", opacity: word.on ? 1 : 0, transform: `translateY(${word.on ? tween(word.age, 0, 0.35, 60, 0, "expo.out") : 60}px)` }}>
            {word.w}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
```

Timeline in `src/Video.tsx`, cuts snapped with `cutBefore(t)` (last beat at least 30 ms before `t`; returns `t` itself when there are no beats):

```tsx
<Scene name="Intro" from={0} to={cutBefore(line(1).start)}><Intro /></Scene>
<Scene name="Hook" from={cutBefore(line(1).start)} to={cutBefore(line(3).start)}><Hook /></Scene>
<Scene name="Rooms" from={cutBefore(line(3).start)} to={cutBefore(line(4).start)}><Rooms /></Scene>
```

One file per scene, named arrow-function exports, helpers in a folder per section (`scenes/chorus/…`). A chorus is one component reused with a `variant` prop.

## 7. Determinism rules

Remotion renders frames out of order in parallel browser tabs; any frame must look the same whenever it's rendered, or the video flickers.

- Derive everything from `useTime()` / `useScene()`.
- No `Math.random`, `Date`, `performance.now`, timers, `requestAnimationFrame`, CSS `transition`/`animation`/`@keyframes`, or R3F `useFrame`. Use `rand(seed)` / `noise(x, seed)` or Remotion's `random(seed)`.
- Images through Remotion's `Img`; fonts are awaited in `fonts.ts` (add new fontsource imports there and to its load list).
- Before the final render: `grep -rnE "Math\.random|Date\.now|new Date|performance\.now|useFrame|setTimeout|setInterval|requestAnimationFrame|transition:|animation:|@keyframes" src` must print nothing.

## 8. Stills, contact sheets, renders

```bash
npx remotion still Video out/stills/hook-9.4.jpg --frame=564          # frame = seconds × FPS
npx remotion render Video out/review/chorus.mp4 --frames=2692-3120    # a scene or a few seconds
npx remotion render Video out/master.mp4                              # full render (config sets h264, CRF 16, yuv420p, 320k audio)
```

Contact sheets and frame strips need a full ffmpeg on PATH (the one bundled with Remotion, `npx remotion ffmpeg`, is stripped down to `scale`/`format` and has no `select`, `tile` or `fade`):

```bash
ffmpeg -y -i out/review/chorus.mp4 -vf "select='not(mod(n\,36))',scale=270:-1,tile=6x2:padding=6:color=white" -frames:v 1 out/review/chorus-sheet.jpg
ffmpeg -y -i out/review/chorus.mp4 -vf "select='between(n\,60\,71)',scale=200:-1,tile=12x1:padding=4:color=white" -frames:v 1 out/review/chorus-strip.jpg
```

Without a system ffmpeg, render a handful of `still`s instead and look at them one by one. `npx remotion ffprobe <file>` works either way for durations and sizes.

Read images with your image viewer tool. The first `render`/`still` downloads Remotion's headless Chrome (one time). Give each parallel worker its own `out/<label>/` folder. Time a 4-second sample render first to estimate the full render (frames ÷ frames-per-second; ~8–9 fps at 1080×1920 on a strong GPU).

## 9. Windows long paths

If the project lives in a very deep folder, spawning Remotion's Chrome or ffmpeg fails with `spawn … ENOENT` although the files exist (the 260-character path limit). Best fix: move the project to a short path. If it must stay, add to `remotion.config.ts`:

```ts
Config.setBrowserExecutable("C:/Program Files/Google/Chrome/Application/chrome.exe");
Config.setBinariesDirectory("C:/Users/<you>/AppData/Local/Temp/remotion-bin");
```

after copying `node_modules/@remotion/compositor-win32-x64-msvc` to that short folder. Delete the copy when the project is done.
