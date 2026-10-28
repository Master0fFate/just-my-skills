import { gsap } from "gsap";

export type Ease = (p: number) => number;

const eases = new Map<string, Ease>();

export const ease = (name: string): Ease => {
  let fn = eases.get(name);
  if (!fn) {
    fn = gsap.parseEase(name) as Ease;
    eases.set(name, fn);
  }
  return fn;
};

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

export const progress = (t: number, start: number, duration: number) =>
  duration <= 0 ? (t >= start ? 1 : 0) : clamp((t - start) / duration);

export const tween = (t: number, start: number, duration: number, from: number, to: number, easeName = "power3.out") =>
  mix(from, to, ease(easeName)(progress(t, start, duration)));

export const envelope = (t: number, start: number, end: number, fadeIn = 0.2, fadeOut = 0.2, easeName = "power2.inOut") =>
  ease(easeName)(progress(t, start, fadeIn)) * (1 - ease(easeName)(progress(t, end - fadeOut, fadeOut)));

export const rand = (seed: number) => {
  let s = (seed * 0x6d2b79f5) | 0;
  s = Math.imul(s ^ (s >>> 15), s | 1);
  s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
  return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
};

export const noise = (x: number, seed = 0) => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return mix(rand(i * 7919 + seed * 104729), rand((i + 1) * 7919 + seed * 104729), u) * 2 - 1;
};
