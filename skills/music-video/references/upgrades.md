# Checking the machine and offering upgrades

This skill gets shared, so never assume what's installed. Probe, then offer upgrades in one question, then build with whatever the user picks. Every upgrade is optional; the video is still full quality without them, just less exact.

## 1. Probe (plain commands, read-only)

| What | Command | Notes |
|---|---|---|
| Node (required, ≥ 18) | `node -v` | Missing → ask the user to install Node LTS from nodejs.org, then continue. |
| Python | `python3 --version` (macOS/Linux), `python --version` or `py --version` (Windows) | Use whichever answers. Don't pass `-I` when running scripts later; user site-packages must load. |
| librosa | `python -c "import librosa, numpy; print(librosa.__version__)"` | Beat-analysis upgrade already present if this prints a version. |
| Whisper stack | `python -c "import torch, transformers; print(torch.__version__, torch.cuda.is_available())"` | Word-timing upgrade present if it prints; `True` means a usable GPU. |
| GPU | Windows: `powershell -NoProfile -Command "Get-CimInstance Win32_VideoController \| Select-Object -ExpandProperty Name"` · macOS: `system_profiler SPDisplaysDataType \| grep -i chipset` · Linux: `nvidia-smi -L` or `lspci \| grep -iE "vga\|3d"` | No discrete GPU → suggest 30 fps and lighter 3D. |
| ffmpeg (full build) | `ffmpeg -version` | Needed for contact sheets and fades in exports. Remotion's bundled one (`npx remotion ffmpeg`) only scales and encodes. |
| Image generation | look at your own tool list for an image tool (`generate_image`, imagegen, …) | If one exists, test it with one small image before planning plates around it. |
| Subagents | is an Agent/Task tool available? | Decides parallel vs. solo build. |

Chrome is not needed: Remotion downloads its own headless Chrome on first render.

## 2. The offer (one question)

Ask once, multi-select, plain words, recommendation first. Skip options that are already installed. Example wording:

- **Beat-locked editing (recommended)** — "Analyzes the song so every cut and hit lands exactly on the beat. Installs librosa for Python (~100 MB)." → `python -m pip install --user librosa numpy soundfile`
- **Exact word timing** — "Words pop the instant they're sung instead of being spread across the line. Installs torch + transformers (~2–3 GB) and downloads a ~1.6 GB Whisper model on first run; ~10 min per song on CPU." → `python -m pip install --user torch transformers numpy librosa`
- **ffmpeg** — "Lets me make contact sheets while reviewing and fade the end of the short cut. Small install." → Windows `winget install --id Gyan.FFmpeg -e`, macOS `brew install ffmpeg`, Linux `sudo apt install ffmpeg` (or the distro's package manager).
- **Photo backgrounds** — "Adds cinematic photo plates behind some scenes using a local image model on your GPU. Installs the free imagegen-cc plugin (by this skill's author) and a 7–18 GB model; needs a Claude Code restart." → see §3
- **None — build with what's here.**

If Python itself is missing, mention that installing Python 3 (python.org, or the OS package manager) unlocks the first two, and let the user decide.

Run install commands only after a clear yes. If an install fails, say so with the error and fall back; don't loop on it.

## 3. imagegen-cc

Repo: https://github.com/Master0fFate/imagegen-cc — local models via stable-diffusion.cpp (picks a model that fits the GPU), or the user's ComfyUI, or an OpenAI-compatible image API.

```bash
claude plugin marketplace add Master0fFate/imagegen-cc
claude plugin install imagegen-cc@imagegen-cc
```

Then the user restarts Claude Code and runs `/imagegen-cc:setup` (opens a local page: Local models → pick the "Best fit" model → Install, then Backends → Test). Slash commands are for the user to type. The image tools only appear after the restart, so offer two paths: pause and resume after setup (the project folder keeps all progress), or keep building procedurally now and add plates on the next run.

## 4. What each choice changes

| Situation | Build approach |
|---|---|
| librosa available | `analyze.py` → beat grid + curves + energy map. Cuts with `cutBefore()`, hits with `pulse()`, levels with `curve()`. |
| No librosa | Write `song.json` yourself (stack.md §2). Ask for BPM + first downbeat if the user knows them (producers usually do) to build a grid; otherwise `useLevels()` drives hits and cuts sit on lyric starts. |
| Whisper available | `words.py` in the background → `words.json`; words land on the syllable. |
| No Whisper | Syllable-weighted words within each timed line (automatic). |
| Lyrics are plain text, no timing | Whisper can time them: run it over the whole song and match the known lines (adapt `words.py`: transcribe in ~30 s windows, align the full word list, derive line start/end). No Whisper → ask for a timed file (LRC/SRT from any lyric or subtitle tool), or place lines per section by ear from the energy map and say that timing is approximate. |
| No lyrics at all | Visual-only video on the beat and energy; titles from the song name. Never invent or fetch lyrics. |
| Image generation on | Generate all plates before building scenes (production.md §1). |
| Image generation off | Fully procedural scenes. |
| No system ffmpeg | Review with individual stills; exports via `npx remotion ffmpeg` with the clip ending on a scene cut (no fades). |
| No subagents | Build scenes yourself in order of impact. |
| No GPU | 30 fps, fewer 3D scenes, longer render. |

## 5. Caches to mention at hand-off

- Whisper model in the Hugging Face cache (`~/.cache/huggingface`, ~1.6 GB).
- Remotion's headless Chrome under the project's `node_modules/.remotion`.
- imagegen-cc models live in the plugin's data folder and leave with its own uninstall.
