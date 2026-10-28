import csv
import json
import sys
from pathlib import Path

import librosa
import numpy as np

FPS = 30
ROOT = Path(__file__).resolve().parent.parent
SONG = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "public" / "song.mp3"
CSV = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "lyrics.csv"
OUT = ROOT / "src" / "data"


def parse_time(value):
    value = value.strip()
    if not value:
        return None
    seconds = 0.0
    for part in value.split(":"):
        seconds = seconds * 60 + float(part)
    return seconds


def normalize(values, pct=99):
    top = np.percentile(values, pct)
    return np.clip(values / top, 0, 1) if top > 0 else values


def smooth(values, attack, release):
    out = np.empty_like(values)
    level = 0.0
    for i, v in enumerate(values):
        coef = attack if v > level else release
        level += (v - level) * coef
        out[i] = level
    return out


def per_frame(feature, sr, hop, n_frames):
    times = librosa.frames_to_time(np.arange(len(feature)), sr=sr, hop_length=hop)
    return np.interp(np.arange(n_frames) / FPS, times, feature)


def band(spec, freqs, lo, hi):
    mask = (freqs >= lo) & (freqs < hi)
    return spec[mask].mean(axis=0)


def field(row, *names):
    return next((row[name] for name in names if name in row), "")


def lyrics():
    rows = []
    if not CSV.exists():
        return rows
    with CSV.open(newline="", encoding="utf-8-sig") as f:
        for index, row in enumerate(csv.DictReader(f), start=1):
            start, end = parse_time(field(row, "start", "start_sec")), parse_time(field(row, "end", "end_sec"))
            if start is None:
                continue
            row_id = field(row, "id", "row")
            rows.append({"id": int(row_id) if row_id else index, "section": field(row, "section"), "text": field(row, "text", "lyric"), "start": start, "end": end})
    rows.sort(key=lambda r: r["start"])
    for a, b in zip(rows, rows[1:]):
        if a["end"] > b["start"]:
            a["end"] = b["start"]
    return rows


def main():
    y, sr = librosa.load(SONG, sr=22050, mono=True)
    duration = len(y) / sr
    n_frames = int(np.ceil(duration * FPS))
    hop = 256

    stft = np.abs(librosa.stft(y, n_fft=2048, hop_length=hop))
    freqs = librosa.fft_frequencies(sr=sr, n_fft=2048)
    low = band(stft, freqs, 30, 140)
    mid = band(stft, freqs, 140, 2500)
    high = band(stft, freqs, 2500, 11000)
    rms = librosa.feature.rms(y=y, hop_length=hop)[0]

    onset_env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop)
    tempo, beat_frames = librosa.beat.beat_track(onset_envelope=onset_env, sr=sr, hop_length=hop, tightness=400)
    beats = librosa.frames_to_time(beat_frames, sr=sr, hop_length=hop)

    low_onset = librosa.onset.onset_strength(S=librosa.amplitude_to_db(stft[(freqs >= 30) & (freqs < 140)]), sr=sr, hop_length=hop)
    kick_frames = librosa.onset.onset_detect(onset_envelope=low_onset, sr=sr, hop_length=hop, backtrack=False, delta=0.25, wait=8)
    kicks = librosa.frames_to_time(kick_frames, sr=sr, hop_length=hop)

    low_at_beats = np.interp(beats, librosa.frames_to_time(np.arange(len(low)), sr=sr, hop_length=hop), low)
    phase_scores = [low_at_beats[p::4].mean() for p in range(4)]
    downbeat_phase = int(np.argmax(phase_scores))
    downbeats = beats[downbeat_phase::4]

    frame_low = normalize(per_frame(low, sr, hop, n_frames))
    frame_mid = normalize(per_frame(mid, sr, hop, n_frames))
    frame_high = normalize(per_frame(high, sr, hop, n_frames))
    frame_rms = normalize(per_frame(rms, sr, hop, n_frames))
    frame_onset = normalize(per_frame(onset_env, sr, hop, n_frames), 99.5)

    energy = smooth(frame_rms, 0.08, 0.02)
    energy = energy / energy.max()

    data = {
        "fps": FPS,
        "duration": duration,
        "frames": n_frames,
        "bpm": float(np.atleast_1d(tempo)[0]),
        "beats": [round(float(t), 4) for t in beats],
        "downbeats": [round(float(t), 4) for t in downbeats],
        "kicks": [round(float(t), 4) for t in kicks],
        "lyrics": lyrics(),
    }
    curves = {
        "low": smooth(frame_low, 0.9, 0.25),
        "mid": smooth(frame_mid, 0.8, 0.2),
        "high": smooth(frame_high, 0.9, 0.3),
        "rms": smooth(frame_rms, 0.6, 0.15),
        "onset": frame_onset,
        "energy": energy,
    }

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "song.json").write_text(json.dumps(data, indent=1))
    (OUT / "curves.json").write_text(json.dumps({k: [round(float(v), 3) for v in arr] for k, arr in curves.items()}))

    print(f"duration {duration:.2f}s frames {n_frames} bpm {data['bpm']:.2f} beats {len(beats)} kicks {len(kicks)} downbeat phase {downbeat_phase}")
    step = 2.0
    for t in np.arange(0, duration, step):
        i = int(t * FPS)
        j = min(int((t + step) * FPS), n_frames)
        print(f"{int(t // 60)}:{t % 60:05.2f} e={energy[i:j].mean():.2f} low={frame_low[i:j].mean():.2f} hi={frame_high[i:j].mean():.2f} " + "#" * int(energy[i:j].mean() * 40))


if __name__ == "__main__":
    sys.exit(main())
