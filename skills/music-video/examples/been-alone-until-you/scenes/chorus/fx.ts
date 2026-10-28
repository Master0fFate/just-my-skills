import { clamp } from "../../lib/motion";
import { curve, pulse } from "../../lib/song";

export const kick = (t: number) => pulse(t, 7);

export const pump = (t: number) => clamp(pulse(t, 6) * 0.85 + curve("low", t) * 0.3);

const channels = (hex: string) => {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255] as const;
};

export const withAlpha = (hex: string, alpha: number) => {
  const [r, g, b] = channels(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const toRgb = (hex: string) => {
  const [r, g, b] = channels(hex);
  return [r / 255, g / 255, b / 255] as const;
};
