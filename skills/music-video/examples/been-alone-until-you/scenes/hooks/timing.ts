import { FPS } from "../../config";
import { ease } from "../../lib/motion";
import { beatAt, beats } from "../../lib/song";

export const frameSpan = (count: number) => count / FPS;

export const sinceLast = (t: number, times: readonly number[]) => {
  let elapsed = Infinity;
  for (const time of times) if (time <= t) elapsed = Math.min(elapsed, t - time);
  return elapsed;
};

export const impact = (t: number, times: readonly number[], decay: number) => Math.exp(-sinceLast(t, times) * decay);

export const openingTime = (from: number) => from - frameSpan(0.5);

export const flash = (t: number, times: readonly number[], frames = 2) => (sinceLast(t, times) < frameSpan(frames) ? 1 : 0);

export const eighths = beats.flatMap((beat, i) => (i < beats.length - 1 ? [beat, (beat + beats[i + 1]) / 2] : [beat]));

export const burstTravel = (t: number, from: number, base: number, boost: number, decay: number, times: readonly number[]) => {
  let travel = base * (t - from);
  for (const time of times) if (time <= t) travel += (boost * (1 - Math.exp(-decay * (t - time)))) / decay;
  return travel;
};

export const beatStep = (t: number, length = 0.25) => {
  const { index, since } = beatAt(t);
  return index + ease("expo.out")(Math.min(1, since / length));
};

export const rampedTravel = (t: number, from: number, base: number, rampStart: number, rampLength: number, drop: number) => {
  const u = Math.max(0, t - rampStart);
  const area = u < rampLength ? (u * u) / (2 * rampLength) : rampLength / 2 + (u - rampLength);
  return base * (t - from) - base * drop * area;
};
