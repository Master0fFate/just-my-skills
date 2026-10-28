import { mix } from "../../lib/motion";

const advances: Record<string, readonly [number, number]> = {
  A: [0.53, 0.954],
  B: [0.498, 0.93],
  C: [0.513, 0.939],
  D: [0.509, 0.933],
  E: [0.462, 0.86],
  I: [0.263, 0.395],
  K: [0.51, 0.988],
  L: [0.432, 0.786],
  M: [0.705, 1.178],
  N: [0.518, 1.007],
  O: [0.554, 1.008],
  R: [0.509, 0.943],
  S: [0.469, 0.882],
  T: [0.475, 0.877],
  U: [0.503, 0.989],
  Y: [0.481, 0.966],
  "6": [0.445, 0.815],
  " ": [0.11, 0.29],
};

export const TALL = 62;
export const WIDE = 125;
export const TRACKING = -0.03;
export const CAP_HEIGHT = 0.687;
export const FULL_WIDTH = 936;

export const emWidth = (text: string, stretch: number) => {
  const p = (stretch - TALL) / (WIDE - TALL);
  let total = 0;
  for (const char of text) total += mix(advances[char][0], advances[char][1], p) + TRACKING;
  return total;
};

export const fitSize = (text: string, width: number, stretch: number) => width / emWidth(text, stretch);
