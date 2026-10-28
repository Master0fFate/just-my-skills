# Platforms and export

Limits change; these were current when the skill was written. Check the platform's help page if a limit matters.

| Platform | Frame | Length | Notes |
|---|---|---|---|
| X / Twitter | 1080×1920 (any aspect works) | 2:20 without Premium | 512 MB per upload without Premium. Premium allows much longer and larger. 60 fps supported. Always make both a full file and a ≤ 2:20 cut. |
| TikTok | 1080×1920 | up to 10 min in app | |
| Instagram Reels | 1080×1920 | up to 3 min | |
| YouTube Shorts | 1080×1920 | up to 3 min | vertical or square |
| YouTube | 16:9 ideal | long | uploads over 15 min need a verified account |

## Encode commands

Use a system `ffmpeg` (see upgrades.md). The master from Remotion is full-range; `scale=out_range=tv` converts to the limited range every platform expects (otherwise you get `yuvj420p`). Without a system ffmpeg, the same full-upload command works with `npx remotion ffmpeg` (Remotion's stripped build has `scale`, `format`, libx264 and aac), but it has no `fade`/`afade`: make the short cut end exactly on a scene cut and drop the two fade filters.

Full upload (X, TikTok, Reels, Shorts — H.264 High, capped at 16 Mbit/s, fast start):

```bash
ffmpeg -y -i out/master.mp4 -vf "scale=out_range=tv,format=yuv420p" -c:v libx264 -preset slow -crf 18 -maxrate 16M -bufsize 32M -profile:v high -level 4.2 -c:a aac -b:a 256k -ar 48000 -movflags +faststart out/x-full.mp4
```

Short cut (X without Premium: ≤ 140 s; Reels/Shorts: ≤ 180 s). Pick the end on a scene cut (from `Video.tsx`), usually the end of the first drop or chorus. Fade the last 0.6 s of picture and 1.2 s of sound:

```bash
ffmpeg -y -i out/master.mp4 -t <END> -vf "fade=t=out:st=<END-0.6>:d=0.6,scale=out_range=tv,format=yuv420p" -af "afade=t=out:st=<END-1.2>:d=1.2" -c:v libx264 -preset slow -crf 18 -maxrate 16M -bufsize 32M -profile:v high -level 4.2 -c:a aac -b:a 256k -ar 48000 -movflags +faststart out/x-clip.mp4
```

If an X file comes out over 512 MB, re-run with `-maxrate 12M -bufsize 24M` (or lower). Check sizes with `npx remotion ffprobe out/x-full.mp4`.

YouTube: upload the master as is, or the full encode above without the `-maxrate`/`-bufsize` cap.

## Posting tips worth passing on

- Upload natively (not a link) so it autoplays; the first frame is the preview.
- Post the clip with the hook line or a question in the text; put the full version in a reply or pin.
- Intro → first chorus → first drop (≈ 80–90 s) is usually the strongest standalone cut.
