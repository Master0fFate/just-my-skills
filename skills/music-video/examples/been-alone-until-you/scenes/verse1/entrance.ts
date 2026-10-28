import type { CSSProperties } from "react";
import { tween } from "../../lib/motion";

export const slamIn = (age: number, from = 1.6): CSSProperties => ({
  opacity: tween(age, 0, 0.05, 0, 1, "none"),
  transform: `scale(${tween(age, 0, 0.3, from, 1, "expo.out")})`,
  filter: `blur(${tween(age, 0, 0.18, 12, 0, "power2.out")}px)`,
});

export const riseIn = (age: number, distance = 60): CSSProperties => ({
  opacity: tween(age, 0, 0.18, 0, 1, "power2.out"),
  transform: `translateY(${tween(age, 0, 0.45, distance, 0, "expo.out")}px)`,
});
