import { rand } from "../../lib/motion";

export type Point = { x: number; y: number };

export type Crack = { points: Point[]; width: number; parent: number; at: number };

const grow = (seed: number, origin: Point, heading: number, length: number, wander: number) => {
  const points = [origin];
  let cursor = origin;
  let drift = 0;
  for (let travelled = 0, i = 0; travelled < length; i++) {
    drift += (rand(seed + i * 3) - 0.5) * 0.22;
    const angle = heading + drift + (rand(seed + i * 7 + 2) - 0.5) * wander;
    const step = 14 + rand(seed + i * 5 + 1) * 26;
    cursor = { x: cursor.x + Math.cos(angle) * step, y: cursor.y + Math.sin(angle) * step };
    points.push(cursor);
    travelled += step;
  }
  return points;
};

export const buildCracks = (origin: Point, headings: number[], seed: number) => {
  const cracks: Crack[] = [];
  headings.forEach((heading, h) => {
    const main = cracks.length;
    const points = grow(seed + h * 101, origin, heading, 950 + rand(seed + h) * 500, 1.0);
    cracks.push({ points, width: 5, parent: -1, at: 0 });
    for (let i = 7; i < points.length - 3; i += 7 + Math.floor(rand(seed + h * 31 + i) * 6)) {
      const side = rand(seed + h * 53 + i) < 0.5 ? -1 : 1;
      const branch = grow(seed + h * 977 + i * 13, points[i], heading + side * (0.6 + rand(seed + i) * 0.6), 170 + rand(seed + h + i) * 260, 1.2);
      cracks.push({ points: branch, width: 3, parent: main, at: i / (points.length - 1) });
    }
  });
  return cracks;
};

export const roughen = (seed: number, anchors: Point[], step: number, amplitude: number) => {
  const points: Point[] = [anchors[0]];
  anchors.slice(1).forEach((anchor, a) => {
    const previous = anchors[a];
    const dx = anchor.x - previous.x;
    const dy = anchor.y - previous.y;
    const length = Math.hypot(dx, dy);
    const count = Math.max(1, Math.round(length / step));
    for (let i = 1; i <= count; i++) {
      const f = i / count;
      const offset = i === count ? 0 : (rand(seed + a * 41 + i) - 0.5) * 2 * amplitude;
      points.push({ x: previous.x + dx * f - (dy / length) * offset, y: previous.y + dy * f + (dx / length) * offset });
    }
  });
  return points;
};

export const pathOf = (points: Point[]) => `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")}`;

export const smoothPath = (points: Point[]) => {
  const first = points[0];
  const last = points[points.length - 1];
  const curves = points.slice(1, -1).map((p, i) => {
    const next = points[i + 2];
    return `Q ${p.x} ${p.y} ${(p.x + next.x) / 2} ${(p.y + next.y) / 2}`;
  });
  return `M ${first.x} ${first.y} L ${(first.x + points[1].x) / 2} ${(first.y + points[1].y) / 2} ${curves.join(" ")} L ${last.x} ${last.y}`;
};
