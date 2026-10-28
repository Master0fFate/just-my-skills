import type { CSSProperties } from "react";
import { tween } from "../../lib/motion";
import type { Block } from "./blocks";
import { withAlpha } from "./fx";
import type { Look } from "./theme";

export type BlockProps = { block: Block; look: Look };

export const ghostText = (look: Look): CSSProperties => ({
  color: "transparent",
  WebkitTextStroke: `2px ${look.palette.mute}`,
  opacity: 0.38,
});

export const slamIn = (age: number, lift = 60): CSSProperties => ({
  opacity: age < 0 ? 0 : tween(age, 0, 0.05, 0, 1, "none"),
  transform: `translateY(${tween(age, 0, 0.3, lift, 0, "expo.out")}px) scaleY(${tween(age, 0, 0.26, 1.22, 1, "expo.out")})`,
});

export const heatOf = (age: number, decay = 3.5) => Math.exp(-Math.max(0, age) * decay);

export const youText = (look: Look, age: number): CSSProperties => ({
  color: look.palette.you,
  textShadow: `0 0 ${28 + heatOf(age) * 34}px ${withAlpha(look.palette.you, 0.9)}, 0 0 6px ${withAlpha(look.palette.glow, 0.7)}`,
});

export const wordHeat = (look: Look, age: number): CSSProperties => ({
  textShadow: `0 0 ${heatOf(age, 6) * 44}px ${withAlpha(look.palette.fg, 0.8)}`,
});

export const YouBloom = ({ look, age, x, y, radius }: { look: Look; age: number; x: number; y: number; radius: number }) => {
  const heat = heatOf(age);
  return (
    <div
      style={{
        position: "absolute",
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        background: `radial-gradient(closest-side, ${withAlpha(look.palette.you, 0.5 + 0.35 * heat)}, transparent)`,
        opacity: age < 0 ? 0 : 1,
        transform: `scale(${1 + heat * 0.35})`,
      }}
    />
  );
};
