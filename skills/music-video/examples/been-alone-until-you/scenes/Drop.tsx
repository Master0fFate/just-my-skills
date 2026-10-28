import { AbsoluteFill } from "remotion";
import { color } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, noise, progress, tween } from "../lib/motion";
import { beatsBetween, line, pulse } from "../lib/song";
import { LineWords } from "./hooks/HookWords";
import { Bloom, Rays, Shade, Strobe } from "./hooks/Light";
import { Readout } from "./hooks/Readout";
import { beatStep, burstTravel, flash, impact, openingTime, rampedTravel } from "./hooks/timing";
import { Tunnel } from "./hooks/Tunnel";

const lineA = line(15);
const lineB = line(16);
const youStarts = [lineA.words[3].start, lineB.words[3].start];
const aloneStarts = [lineA.words[1].start, lineB.words[1].start];
const wordStarts = [...lineA.words, ...lineB.words].map((word) => word.start);
const windDown = lineB.end + 0.25;

const lightRadius = (t: number) => {
  const [first, second] = youStarts;
  if (t >= second) return tween(t - second, 0, 0.5, 1500, 2000, "expo.out");
  if (t >= first) return tween(t - first, 0, 0.55, 0, 1500, "expo.out");
  return 0;
};

const lightStrength = (t: number) => {
  const [first, second] = youStarts;
  const level = t >= second ? mix(1, 0.6, progress(t - second, 0, 0.9)) : t >= first ? mix(1, 0.5, progress(t - first, 0, 0.9)) : 0;
  return level * (1 - progress(t, windDown, 1.2));
};

const burstOpen = (t: number) =>
  Math.max(...youStarts.map((start) => (t < start ? 0 : 1.6 * Math.min(1, (t - start) / 0.06) * Math.exp(-(t - start) * 4.5))));

const formatDepth = (travel: number) =>
  Math.floor(Math.max(0, travel) / 10)
    .toLocaleString("en-US")
    .padStart(6, "0");

export const Drop = () => {
  const { t, from } = useScene();
  const beatTimes = beatsBetween(from, windDown + 1);
  const travel =
    rampedTravel(t, from, 2600, windDown, 1.2, 0.8) +
    burstTravel(t, from, 0, 3800, 7, beatTimes) +
    burstTravel(t, from, 0, 3500, 8, wordStarts) +
    burstTravel(t, from, 0, 11000, 4, youStarts);
  const tint = ease("power2.out")(progress(t - youStarts[0], 0, 0.5)) * (1 - progress(t, windDown, 1.2) * 0.9);
  const jolt = impact(t, wordStarts, 14) * 0.05 + impact(t, youStarts, 9) * 0.1;
  const shake = jolt * 160;
  const camera = `translate(${noise(t * 20, 5) * shake}px, ${noise(t * 20, 6) * shake}px) scale(${1 + pulse(t) * 0.03 + jolt})`;
  const strobe = flash(t, [openingTime(from), aloneStarts[0], youStarts[0], aloneStarts[1], youStarts[1]], 2);
  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: camera }}>
        <Bloom radius={lightRadius(t)} strength={lightStrength(t)} />
        <Rays angle={t * 14} strength={lightStrength(t) * 0.8} />
        <Tunnel
          text="ALONE"
          travel={travel}
          spin={12 * (t - from) + 16 * beatStep(t)}
          roll={noise(t * 0.5, 9) * 5}
          tint={tint}
          open={burstOpen(t)}
          opacity={1 - progress(t, windDown + 0.3, 1) * 0.5}
        />
        <Shade strength={0.4} width={1200} height={700} />
        <LineWords id={15} t={t} />
        <LineWords id={16} t={t} />
      </AbsoluteFill>
      <Readout label="DEPTH" value={`${formatDepth(travel)} M`} />
      <Strobe amount={strobe * 0.92} />
    </AbsoluteFill>
  );
};
