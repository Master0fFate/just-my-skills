import { rand } from "../../lib/motion";

export const scribble = (seed: number, x0: number, x1: number, y: number, lift = 10) => {
  const slope = rand(seed + 3) < 0.5 ? -1 : 1;
  const stroke = (from: number, to: number, offset: number, salt: number) => {
    const points = Array.from({ length: 8 }, (_, i) => {
      const f = i / 7;
      const x = from + (to - from) * f;
      const sway = (rand(seed + salt + i * 17) - 0.5) * lift * 0.5;
      return `${x.toFixed(1)} ${(y + offset + slope * (f - 0.5) * lift + sway).toFixed(1)}`;
    });
    return `M ${points.join(" L ")}`;
  };
  return [
    stroke(x0 + rand(seed) * 24, x1 - rand(seed + 1) * 16, -lift * 0.45, 5),
    stroke(x1 - 20 - rand(seed + 2) * 30, x0 + 30 + rand(seed + 4) * 30, lift * 0.55, 11),
  ];
};
