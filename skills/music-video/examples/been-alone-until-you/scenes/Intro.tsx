import { AbsoluteFill } from "remotion";
import { Stage3D } from "../components/Stage3D";
import { color } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, noise, progress } from "../lib/motion";
import { beats, downbeats, nearestBeat, pulse } from "../lib/song";
import { CameraRig } from "./world/CameraRig";
import { CounterStack } from "./world/Counter";
import { Dust } from "./world/Dust";
import { Haze } from "./world/Haze";
import { aimTarget, bassLevel, FOV } from "./world/framing";
import { LIT_CENTER, type Vec3 } from "./world/layout";
import { LitWindow } from "./world/LitWindow";
import { Skyline } from "./world/Tower";

const FIRST_COUNT = 2183;
const LAST_COUNT = 2190;
const NEAR = 4.2;
const FAR = 200;
const CLOSEST = 2;
const FOG_DENSITY = 0.0036;
const firstTick = beats.indexOf(nearestBeat(downbeats[0]));
const ticks = beats.slice(firstTick).filter((_, i) => i % 2 === 0).slice(0, LAST_COUNT - FIRST_COUNT);
const pullEnd = beats[firstTick + 10];
const rushStart = beats[firstTick + 11];
const rushEnd = beats[firstTick + 13];
const FLICKERS = [3.82, 3.9, 5.15];

const distanceAt = (t: number) => {
  const pull = ease("power2.inOut")(progress(t, 0, pullEnd));
  const wide = NEAR * Math.pow(FAR / NEAR, pull);
  const rush = ease("power2.in")(progress(t, rushStart, rushEnd - rushStart));
  return wide * Math.pow(CLOSEST / wide, rush);
};

export const Intro = () => {
  const { t } = useScene();
  const distance = distanceAt(t);
  const openness = Math.log(distance / NEAR) / Math.log(FAR / NEAR);
  const arc = 0.5 * ease("power2.inOut")(Math.max(0, openness));
  const drop = 28 * Math.max(0, openness);
  const shakeAmount = 0.004 * distance;
  const camera: Vec3 = [
    LIT_CENTER[0] + distance * Math.sin(arc) + noise(t * 0.5, 1) * shakeAmount,
    LIT_CENTER[1] - drop + noise(t * 0.4, 2) * shakeAmount,
    LIT_CENTER[2] + distance * Math.cos(arc),
  ];
  const target = aimTarget(camera, LIT_CENTER, mix(700, 1130, ease("power2.inOut")(Math.max(0, openness))));

  const passed = ticks.filter((tick) => tick <= t).length;
  const sinceTick = passed > 0 ? t - ticks[passed - 1] : 1;
  const flicker = FLICKERS.some((start) => t >= start && t < start + 0.05) ? 0.45 : 1;
  const level = (0.74 + 0.26 * bassLevel(t) + 0.08 * pulse(t)) * flicker;
  const reach = Math.max(1, distance / 6);
  const lastTick = ticks[ticks.length - 1];

  return (
    <AbsoluteFill style={{ background: color.ink }}>
      <Stage3D camera={{ fov: FOV, near: 1, far: 800 }} flat>
        <color attach="background" args={[color.ink]} />
        <fogExp2 attach="fog" args={[color.ink, FOG_DENSITY]} />
        <CameraRig position={camera} target={target} />
        <Skyline />
        <Haze distance={distance} />
        <LitWindow distance={distance} level={level} />
        <Dust
          t={t}
          count={240}
          box={[reach * 3.2, reach * 4.2, reach * 3]}
          center={[LIT_CENTER[0], LIT_CENTER[1], LIT_CENTER[2] + reach * 1.6]}
          drift={[0.05 * reach, 0.1 * reach, 0]}
          size={0.016 * reach}
          span={2.2 * reach}
          seed={4}
          lights={[
            { position: [LIT_CENTER[0], LIT_CENTER[1], LIT_CENTER[2] + 0.5], color: "#ffffff", reach: 0.85 * level },
            { position: [0, -999, 0], color: "#000000", reach: 0 },
          ]}
        />
      </Stage3D>
      <AbsoluteFill style={{ background: color.paper, opacity: 0.96 * ease("power2.in")(progress(t, rushStart + 0.62, 0.3)) }} />
      <AbsoluteFill style={{ opacity: 1 - progress(t, rushStart + 0.66, 0.2) }}>
        <CounterStack
          label="Days alone"
          value={FIRST_COUNT + passed}
          previous={FIRST_COUNT + passed - 1}
          change={progress(sinceTick, 0, 0.5)}
          caption="= 6 years"
          captionOpacity={progress(t, lastTick, 0.2)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
