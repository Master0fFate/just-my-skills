import type { CSSProperties } from "react";
import { color, font } from "../../config";
import { clamp, ease } from "../../lib/motion";

export type FlapStep = { at: number; to: string; steps: number; stepDuration: number };
export type FlapState = { letter: string; previous: string; phase: number };

export const STRIP = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const flapState = (initial: string, program: FlapStep[], t: number): FlapState => {
  let from = initial;
  let active: FlapStep | null = null;
  for (const entry of program) {
    if (entry.at > t) break;
    if (active) from = active.to;
    active = entry;
  }
  if (!active) return { letter: initial, previous: initial, phase: 0 };
  const target = STRIP.indexOf(active.to);
  const distance = (target - STRIP.indexOf(from) + STRIP.length) % STRIP.length;
  const steps = Math.min(distance, active.steps);
  const elapsed = (t - active.at) / active.stepDuration;
  if (steps === 0 || elapsed >= steps) return { letter: active.to, previous: active.to, phase: 0 };
  const index = Math.floor(elapsed);
  const letterAt = (k: number) => (k === 0 ? from : STRIP[(target - steps + k + STRIP.length) % STRIP.length]);
  return { letter: letterAt(index + 1), previous: letterAt(index), phase: elapsed - index };
};

type HalfProps = {
  top: boolean;
  letter: string;
  width: number;
  height: number;
  tint: string;
  style?: CSSProperties;
};

const Half = ({ top, letter, width, height, tint, style }: HalfProps) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: top ? 0 : height / 2,
      width,
      height: height / 2,
      overflow: "hidden",
      borderRadius: top ? "7px 7px 0 0" : "0 0 7px 7px",
      background: top ? "linear-gradient(#20202c, #14141d)" : "linear-gradient(#0d0d14, #181822)",
      backfaceVisibility: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        top: top ? 0 : -height / 2,
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: height * 0.04,
        fontFamily: font.display,
        fontWeight: 800,
        fontSize: height * 0.8,
        fontVariationSettings: "'wdth' 80",
        lineHeight: 1,
        color: tint,
      }}
    >
      {letter}
    </div>
  </div>
);

type FlapCellProps = FlapState & { width: number; height: number; tint: string; style?: CSSProperties };

export const FlapCell = ({ letter, previous, phase, width, height, tint, style }: FlapCellProps) => {
  const flipping = phase > 0 && phase < 1;
  const falling = ease("power2.in")(clamp(phase * 2));
  const landing = ease("power2.out")(clamp(phase * 2 - 1));
  return (
    <div style={{ position: "relative", width, height, perspective: height * 3, flex: "none", ...style }}>
      <Half top letter={letter} width={width} height={height} tint={tint} />
      <Half top={false} letter={flipping ? previous : letter} width={width} height={height} tint={tint} />
      {flipping && phase < 0.5 && (
        <Half
          top
          letter={previous}
          width={width}
          height={height}
          tint={tint}
          style={{ transformOrigin: "50% 100%", transform: `rotateX(${-90 * falling}deg)`, filter: `brightness(${1 - falling * 0.6})` }}
        />
      )}
      {flipping && phase >= 0.5 && (
        <Half
          top={false}
          letter={letter}
          width={width}
          height={height}
          tint={tint}
          style={{ transformOrigin: "50% 0%", transform: `rotateX(${90 * (1 - landing)}deg)`, filter: `brightness(${0.4 + landing * 0.6})` }}
        />
      )}
      <div style={{ position: "absolute", left: 0, top: height / 2 - 1.5, width, height: 3, background: color.ink, zIndex: 3 }} />
      <div style={{ position: "absolute", left: 3, top: height / 2 - 4, width: 8, height: 8, borderRadius: 4, background: color.smoke, zIndex: 4 }} />
      <div style={{ position: "absolute", right: 3, top: height / 2 - 4, width: 8, height: 8, borderRadius: 4, background: color.smoke, zIndex: 4 }} />
    </div>
  );
};
