import type { CSSProperties, ReactNode } from "react";
import { color, font } from "../../config";
import { mix, progress } from "../../lib/motion";
import { TRACKING } from "./type";

const channels = (value: string) =>
  value.startsWith("#") ? [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16)) : value.match(/\d+/g)!.map(Number);

export const mixColor = (from: string, to: string, p: number) => {
  const a = channels(from);
  const b = channels(to);
  return `rgb(${a.map((value, i) => Math.round(mix(value, b[i], p))).join(",")})`;
};

export const violetGlow = (spread: number) =>
  `0 0 ${40 * spread}px rgba(102,102,255,0.9), 0 0 ${140 * spread}px rgba(102,102,255,0.75), 0 0 ${320 * spread}px rgba(35,35,138,0.9)`;

export const youTint = (age: number) => mixColor(color.paper, color.accent, progress(age, 0.04, 0.3));

export const youStroke = `3px ${color.accentHi}`;

type DisplayProps = { text: string; size: number; stretch: number; tint?: string; style?: CSSProperties };

export const Display = ({ text, size, stretch, tint = color.paper, style }: DisplayProps) => (
  <div
    style={{
      fontFamily: font.display,
      fontWeight: 900,
      fontVariationSettings: `'wdth' ${stretch}`,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: `${TRACKING}em`,
      whiteSpace: "nowrap",
      color: tint,
      ...style,
    }}
  >
    {text}
  </div>
);

type AnchorProps = { x?: number; y?: number; transform?: string; opacity?: number; style?: CSSProperties; children: ReactNode };

export const Anchor = ({ x = 540, y = 960, transform = "", opacity = 1, style, children }: AnchorProps) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) ${transform}`, opacity, ...style }}>
    {children}
  </div>
);

export const Serif = ({ text, size, tint = color.paper, style }: { text: string; size: number; tint?: string; style?: CSSProperties }) => (
  <div
    style={{
      fontFamily: font.serif,
      fontStyle: "italic",
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1,
      whiteSpace: "nowrap",
      color: tint,
      ...style,
    }}
  >
    {text}
  </div>
);
