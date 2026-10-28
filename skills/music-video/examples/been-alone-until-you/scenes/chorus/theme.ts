import { color, FPS } from "../../config";
import { barAt, line } from "../../lib/song";
import type { Block } from "./blocks";

export type Variant = 1 | 2 | 3;
export type HookLayout = "stack" | "scatter" | "wall" | "mirror";

export type Palette = {
  bg: string;
  fg: string;
  mute: string;
  you: string;
  glow: string;
  inverted: boolean;
};

export type Theme = {
  warm: boolean;
  windows: boolean;
  particles: number;
  orbit: number;
  camera: number;
  punch: number;
  shake: number;
  cutFlash: number;
  barFlash: number;
  youFlash: number;
  strobe: boolean;
  layouts: readonly HookLayout[];
};

export type Look = { variant: Variant; theme: Theme; palette: Palette };

const inkPalette: Palette = { bg: color.ink, fg: color.paper, mute: color.ash, you: color.accent, glow: color.accentHi, inverted: false };
const paperPalette: Palette = { bg: color.paper, fg: color.ink, mute: color.ash, you: color.accent, glow: color.accentDeep, inverted: true };

export const themes: Record<Variant, Theme> = {
  1: { warm: false, windows: false, particles: 220, orbit: 1, camera: 0.6, punch: 0.016, shake: 0, cutFlash: 0.3, barFlash: 0, youFlash: 0.35, strobe: false, layouts: ["stack", "scatter", "wall", "mirror"] },
  2: { warm: true, windows: true, particles: 340, orbit: 1.25, camera: 1, punch: 0.026, shake: 3, cutFlash: 0.5, barFlash: 0.14, youFlash: 0.5, strobe: false, layouts: ["wall", "mirror", "scatter", "stack"] },
  3: { warm: true, windows: true, particles: 520, orbit: 1.75, camera: 1.6, punch: 0.042, shake: 9, cutFlash: 0.9, barFlash: 0.36, youFlash: 0.8, strobe: true, layouts: ["mirror", "wall", "stack", "scatter"] },
};

const negativeBlocks = new Set([1, 4]);

export const paletteAt = (variant: Variant, block: Block, t: number): Palette => {
  if (variant !== 3) return inkPalette;
  const bar = barAt(t);
  const strobing = bar.index % 2 === 0 && bar.since < 4 / FPS;
  const settled =
    negativeBlocks.has(block.index) || (block.kind === "mood" && t >= line(block.id).words[7].start);
  return settled !== strobing ? paperPalette : inkPalette;
};
