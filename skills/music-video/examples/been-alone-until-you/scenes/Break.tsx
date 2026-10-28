import { AbsoluteFill } from "remotion";
import { Stage3D } from "../components/Stage3D";
import { color } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, progress } from "../lib/motion";
import { beatsBetween, downbeats, pulse } from "../lib/song";
import { CameraRig } from "./world/CameraRig";
import { CounterStack } from "./world/Counter";
import { Dust } from "./world/Dust";
import { FOV } from "./world/framing";
import { Glow } from "./world/Glow";
import { lightPair, TwoLights, type Orbit, type Placement } from "./world/TwoLights";

const START_COUNT = 2190;
const downbeatAfter = (time: number) => downbeats.find((d) => d > time)!;
const countStart = downbeatAfter(143.7);
const landing = downbeatAfter(153);
const dayOneAt = downbeatAfter(155);
const finalBeats = beatsBetween(landing, dayOneAt);

const CALM_SPEED = 0.45;
const LANDING_SPEED = 1;
const FINAL_SPEED = 4.6;

const angleAt = (t: number, from: number, to: number) => {
  const toLanding = Math.min(t, landing) - from;
  const landingSpan = landing - from;
  let angle = CALM_SPEED * toLanding + ((LANDING_SPEED - CALM_SPEED) * toLanding * toLanding) / (2 * landingSpan);
  if (t > landing) angle += LANDING_SPEED * (Math.min(t, dayOneAt) - landing);
  if (t > dayOneAt) {
    const span = to - dayOneAt;
    const u = (t - dayOneAt) / span;
    angle += LANDING_SPEED * (t - dayOneAt) + ((FINAL_SPEED - LANDING_SPEED) * span * u * u * u) / 3;
  }
  return angle;
};

const radiusAt = (t: number) => {
  const approach = ease("power2.inOut")(progress(t, countStart, landing - countStart));
  const meeting = ease("expo.in")(progress(t, landing, finalBeats[finalBeats.length - 1] - landing));
  const release = ease("expo.out")(progress(t, dayOneAt, 1.1));
  const closing = ease("power2.in")(progress(t, dayOneAt + 1.1, 4));
  return mix(mix(mix(4.6, 1.7, approach), 0.5, meeting), 2.3, release) * mix(1, 0.62, closing);
};

const countAt = (t: number) => {
  if (t < countStart) return START_COUNT;
  if (t < landing) return Math.round(3 + (START_COUNT - 3) * (1 - ease("power2.inOut")(progress(t, countStart, landing - countStart))));
  return Math.max(0, 3 - (finalBeats.filter((beat) => beat <= t).length - 1));
};

export const Break = () => {
  const { t, from, to, local } = useScene();
  const orbit = (time: number): Orbit => ({ angle: 0.6 + angleAt(time, from, to), radius: radiusAt(time) });
  const placement: Placement = { tilt: 1.0, yaw: 0.35 + 0.012 * local, center: [0, 0.5, 0] };
  const pair = lightPair(orbit(t), placement);

  const sinceDayOne = t - dayOneAt;
  const born = t >= dayOneAt;
  const lastBeatBefore = finalBeats.filter((beat) => beat <= t);
  const sinceTick = lastBeatBefore.length > 0 ? t - lastBeatBefore[lastBeatBefore.length - 1] : 1;
  const count = countAt(t);
  const fastness = Math.abs(countAt(t - 0.05) - countAt(t + 0.05)) / 0.1;

  const buildUp = ease("power2.in")(progress(t, to - 3.2, 3.2));
  const burst = born ? Math.exp(-sinceDayOne * 3.2) : 0;
  const level = 0.92 + 0.08 * pulse(t) + 0.9 * burst + 0.5 * buildUp;
  const push = born ? Math.exp(-sinceDayOne * 5) * 0.09 : 0;
  const distance = mix(14, 12.2, ease("sine.inOut")(progress(local, 0, 12))) * (1 - push) * mix(1, 0.8, buildUp);
  const camera: [number, number, number] = [1.1 * Math.sin(local * 0.09), 1.1 + 0.3 * Math.sin(local * 0.07), distance];
  const settle = Math.exp(-local * 3.5);

  return (
    <AbsoluteFill style={{ background: color.ink }}>
      <Stage3D camera={{ fov: FOV, near: 0.5, far: 200 }} flat>
        <color attach="background" args={[color.ink]} />
        <CameraRig position={camera} target={[0, -0.55, 0]} />
        <Glow position={[0, 0, -9]} size={34} color={color.accentDeep} opacity={0.22 + 0.2 * burst + 0.2 * buildUp} />
        <Glow position={[0, 0, -9]} size={14} color={color.accent} opacity={0.08 + 0.12 * burst} />
        <Dust
          t={t}
          count={900}
          box={[17, 13, 17]}
          center={[0, 0, 0]}
          drift={[0.02, 0.07 + 0.35 * buildUp, 0]}
          size={0.034}
          base={0.014}
          span={2.6}
          fov={FOV}
          seed={9}
          lights={[
            { position: pair.white, color: "#ffffff", reach: 0.95 * level },
            { position: pair.violet, color: color.accent, reach: 1.5 * level },
          ]}
        />
        <TwoLights
          t={t}
          orbit={orbit}
          placement={placement}
          fov={FOV}
          size={0.55}
          level={level}
          trailSeconds={mix(1.7, 1.1, buildUp)}
          trailSize={0.34}
          rings={0.3 * (1 - buildUp)}
        />
      </Stage3D>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% 42%, ${color.accentHi}, transparent 70%)`,
          opacity: 0.5 * settle + 0.55 * burst,
        }}
      />
      <CounterStack
        label={born ? "Day" : count === 1 ? "Day alone" : "Days alone"}
        labelTint={born ? color.accentHi : color.ash}
        value={born ? 1 : count}
        previous={born ? 0 : count + 1}
        change={born ? progress(sinceDayOne, 0, 0.7) : progress(sinceTick, 0, 0.45)}
        direction={born ? 1 : -1}
        tint={born ? color.accentHi : color.paper}
        glow={born ? color.accent : undefined}
        blur={born ? 0 : Math.min(1.8, fastness / 220)}
        scale={born ? 1 + 0.4 * Math.exp(-sinceDayOne * 6) + 0.04 * pulse(t) : 1}
      />
    </AbsoluteFill>
  );
};
