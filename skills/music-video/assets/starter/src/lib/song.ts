import song from "../data/song.json";
import curveData from "../data/curves.json";
import wordData from "../data/words.json";

export type Word = { w: string; start: number; end: number };
export type Line = { id: number; section: string; text: string; start: number; end: number; words: Word[] };
export type CurveName = keyof typeof curveData;

export const DURATION = song.duration;
export const BPM = song.bpm;
export const BEAT = 60 / song.bpm;
export const beats: readonly number[] = song.beats;
export const downbeats: readonly number[] = song.downbeats;

const lastAtOrBefore = (list: readonly number[], t: number) => {
  let lo = 0;
  let hi = list.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (list[mid] <= t) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return found;
};

const gridAt = (list: readonly number[], t: number, span: number) => {
  if (list.length === 0) return { index: -1, start: 0, since: Infinity, until: Infinity, phase: 0 };
  const index = lastAtOrBefore(list, t);
  const start = index < 0 ? list[0] - span : list[index];
  const next = list[index + 1] ?? start + span;
  const since = t - start;
  return { index, start, since, until: next - t, phase: Math.min(1, since / (next - start)) };
};

export const beatAt = (t: number) => gridAt(beats, t, BEAT);

export const barAt = (t: number) => {
  const bar = gridAt(downbeats, t, BEAT * 4);
  return { ...bar, beatInBar: Math.min(3, Math.floor(bar.phase * 4)) };
};

export const pulse = (t: number, decay = 9) => Math.exp(-Math.max(0, beatAt(t).since) * decay);

export const barPulse = (t: number, decay = 5) => Math.exp(-Math.max(0, barAt(t).since) * decay);

export const nearestBeat = (t: number) => {
  if (beats.length === 0) return t;
  const index = lastAtOrBefore(beats, t);
  const before = beats[Math.max(0, index)];
  const after = beats[Math.min(beats.length - 1, index + 1)];
  return t - before <= after - t ? before : after;
};

export const beatsBetween = (from: number, to: number) => beats.filter((b) => b >= from && b < to);

export const cutBefore = (t: number) => {
  const index = lastAtOrBefore(beats, t - 0.03);
  return index < 0 ? t : beats[index];
};

export const curve = (name: CurveName, t: number) => {
  const data = curveData[name];
  const x = t * song.fps;
  const i = Math.floor(x);
  if (i < 0) return data[0];
  if (i >= data.length - 1) return data[data.length - 1];
  return data[i] + (data[i + 1] - data[i]) * (x - i);
};

const syllables = (word: string) => Math.max(1, (word.toLowerCase().match(/[aeiouy]+/g) ?? []).length);

const spreadWords = (text: string, start: number, end: number): Word[] => {
  const tokens = text.split(" ");
  const weights = tokens.map((token, i) => syllables(token) + (i === tokens.length - 1 ? 1.5 : 0));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = start;
  return tokens.map((w, i) => {
    const span = ((end - start) * weights[i]) / total;
    const word = { w, start: cursor, end: cursor + span };
    cursor += span;
    return word;
  });
};

const timedWords = wordData as Record<string, Word[]>;

export const lines: Line[] = song.lyrics.map((entry) => ({
  ...entry,
  words: timedWords[String(entry.id)] ?? spreadWords(entry.text, entry.start, entry.end),
}));

const linesById = new Map(lines.map((entry) => [entry.id, entry]));

export const line = (id: number) => {
  const found = linesById.get(id);
  if (!found) throw new Error(`No lyric line ${id}`);
  return found;
};
