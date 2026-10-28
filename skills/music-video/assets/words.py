import json
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

import librosa
import numpy as np
import torch
from transformers import pipeline

MODEL = "openai/whisper-large-v3-turbo"
SAMPLE_RATE = 16000
PAD_BEFORE = 0.25
PAD_AFTER = 0.35
MIN_WORD = 0.07
MATCH_FLOOR = 0.6
HOLD_WEIGHT = 2.0
ROOT = Path(__file__).resolve().parent.parent
SONG = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "public" / "song.mp3"
LANGUAGE = sys.argv[2] if len(sys.argv) > 2 else "en"
SONG_DATA = ROOT / "src" / "data" / "song.json"
OUT = ROOT / "src" / "data" / "words.json"


def normalize(word):
    return re.sub(r"[^a-z0-9']", "", word.lower().replace("’", "'"))


def word_weight(word):
    letters = normalize(word)
    syllables = len(re.findall(r"[aeiouy]+", letters))
    if letters.endswith("e") and not letters.endswith("le") and syllables > 1:
        syllables -= 1
    return max(syllables, 1) + 0.1 * len(letters)


def load_asr():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    return pipeline("automatic-speech-recognition", model=MODEL, dtype=torch.float32, device=device)


def transcribe(asr, audio, line):
    offset = line["start"] - PAD_BEFORE
    clip = audio[int(offset * SAMPLE_RATE):int((line["end"] + PAD_AFTER) * SAMPLE_RATE)]
    prompt = asr.tokenizer.get_prompt_ids(line["text"], return_tensors="pt")
    result = asr(
        {"raw": clip, "sampling_rate": SAMPLE_RATE},
        return_timestamps="word",
        generate_kwargs={"language": LANGUAGE, "task": "transcribe", "prompt_ids": prompt},
    )
    return [(normalize(c["text"]), offset + c["timestamp"][0], offset + c["timestamp"][1]) for c in result["chunks"]]


def match_words(known, heard):
    rows, cols = len(known), len(heard)
    ratios = [[SequenceMatcher(None, normalize(k), h[0]).ratio() for h in heard] for k in known]
    score = np.zeros((rows + 1, cols + 1))
    for i in range(rows):
        for j in range(cols):
            best = max(score[i, j + 1], score[i + 1, j])
            if ratios[i][j] >= MATCH_FLOOR:
                best = max(best, score[i, j] + ratios[i][j])
            score[i + 1, j + 1] = best
    pairs = {}
    i, j = rows, cols
    while i and j:
        if score[i, j] == score[i - 1, j]:
            i -= 1
        elif score[i, j] == score[i, j - 1]:
            j -= 1
        else:
            pairs[i - 1] = j - 1
            i -= 1
            j -= 1
    return pairs


def spread(words, start, stop, hold_last):
    if not words:
        return []
    weights = [word_weight(w) for w in words]
    if hold_last:
        weights[-1] *= HOLD_WEIGHT
    scale = (stop - start) / sum(weights)
    spans = []
    cursor = start
    for weight in weights:
        spans.append((cursor, cursor + weight * scale))
        cursor += weight * scale
    return spans


def place_words(known, heard, pairs, lo, hi):
    spans = []
    run = []
    cursor = lo
    for i, word in enumerate(known):
        if i not in pairs:
            run.append(word)
            continue
        start, end = heard[pairs[i]][1:]
        start = lo if i == 0 else start
        end = hi if i == len(known) - 1 else end
        spans += spread(run, cursor, start, False)
        spans.append((start, end))
        run = []
        cursor = end
    return spans + spread(run, cursor, hi, True)


def regularize(spans, lo, hi):
    count = len(spans)
    cursor = lo
    fitted = []
    for i, (start, end) in enumerate(spans):
        start = min(max(start, cursor), hi - MIN_WORD * (count - i))
        end = min(max(end, start + MIN_WORD), hi - MIN_WORD * (count - i - 1))
        fitted.append((start, end))
        cursor = end
    return fitted


def window(line):
    lo = round(line["start"], 3)
    hi = round(line["end"], 3)
    if lo < line["start"]:
        lo = round(lo + 0.001, 3)
    if hi > line["end"]:
        hi = round(hi - 0.001, 3)
    return lo, hi


def align_line(asr, audio, line):
    known = line["text"].split(" ")
    lo, hi = window(line)
    heard = transcribe(asr, audio, line)
    pairs = match_words(known, heard)
    by_asr = len(pairs) * 2 >= len(known)
    spans = place_words(known, heard, pairs if by_asr else {}, lo, hi)
    fitted = regularize(spans, lo, hi)
    words = [{"w": w, "start": round(s, 3), "end": round(e, 3)} for w, (s, e) in zip(known, fitted)]
    return words, by_asr


def main():
    audio, _ = librosa.load(SONG, sr=SAMPLE_RATE, mono=True)
    lyrics = json.loads(SONG_DATA.read_text(encoding="utf-8"))["lyrics"]
    asr = load_asr()
    words = {}
    fallback = []
    for line in lyrics:
        words[line["id"]], by_asr = align_line(asr, audio, line)
        if not by_asr:
            fallback.append(line["id"])
    OUT.write_text(json.dumps(words, indent=1), encoding="utf-8")
    print(f"asr {len(lyrics) - len(fallback)}, fallback {len(fallback)} {fallback}")


if __name__ == "__main__":
    sys.exit(main())
