import { AbsoluteFill } from "remotion";
import { Stage3D } from "../components/Stage3D";
import { color, font } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, noise, progress, tween } from "../lib/motion";
import { beatsBetween, downbeats, pulse } from "../lib/song";
import { CameraRig } from "./world/CameraRig";
import { Dust } from "./world/Dust";
import { aimTarget, FOV } from "./world/framing";
import { Glow } from "./world/Glow";
import { Haze } from "./world/Haze";
import { LIT_CENTER, type Vec3 } from "./world/layout";
import { LitWindow } from "./world/LitWindow";
import { Skyline } from "./world/Tower";
import { lightPair, TwoLights, type Orbit, type Placement } from "./world/TwoLights";
import { Wake } from "./world/Wake";

const NEAR = 2.2;
const WIDE = 130;
const END = 28;
const REFERENCE_FAR = 200;
const FOG_DENSITY = 0.0036;
const MUSIC_END = 219.95;
const TITLE_AT = MUSIC_END + 0.15;
const TAGLINE_AT = TITLE_AT + 1.1;
const FADE_LENGTH = 0.95;

const sway = (time: number): Orbit => ({ angle: Math.PI + 0.5 * Math.sin(time * 0.75), radius: 0.62 });

const titleWord = (t: number, start: number) => ({
  opacity: tween(t, start, 0.9, 0, 1, "power2.out"),
  filter: `blur(${tween(t, start, 0.9, 14, 0, "power2.out")}px)`,
  transform: `translateY(${tween(t, start, 1.2, 26, 0, "power3.out")}px)`,
});

export const Outro = () => {
  const { t, from, to, local } = useScene();
  const wide = NEAR * Math.pow(WIDE / NEAR, ease("expo.out")(progress(local, 0, 3.2)));
  const distance = wide * Math.pow(END / WIDE, ease("power2.inOut")(progress(local, 3.4, 5))) * (1 - 0.025 * pulse(t));
  const openness = Math.log(distance / NEAR) / Math.log(REFERENCE_FAR / NEAR);
  const arc = 0.5 * ease("power2.inOut")(openness);
  const drop = 28 * openness;
  const shake = 0.004 * distance;
  const camera: Vec3 = [
    LIT_CENTER[0] + distance * Math.sin(arc) + noise(local * 0.5, 5) * shake,
    LIT_CENTER[1] - drop + noise(local * 0.4, 6) * shake,
    LIT_CENTER[2] + distance * Math.cos(arc),
  ];
  const screenY = mix(mix(960, 1130, ease("power2.out")(progress(local, 0, 3.2))), 640, ease("power2.inOut")(progress(local, 4.4, 4)));
  const target = aimTarget(camera, LIT_CENTER, screenY);

  const calm = mix(1, 0.3, ease("power2.inOut")(progress(t, MUSIC_END - 0.4, 1.6)));
  const level = (0.88 + 0.25 * pulse(t)) * mix(1, 0.8, 1 - calm);
  const placement: Placement = { tilt: 1.2, yaw: 0, center: [LIT_CENTER[0], LIT_CENTER[1], LIT_CENTER[2] + 0.12] };
  const pair = lightPair(sway(t), placement);
  const spread = 1 + distance / 24;
  const roomLevel = mix(0.3, 0.16, ease("power2.out")(progress(local, 0, 1.2)));
  const reach = Math.max(1, distance / 6);
  const ringTimes = beatsBetween(from, from + 8);

  const shockwaves = downbeats.filter((downbeat) => downbeat <= t && t - downbeat < 1.6);

  return (
    <AbsoluteFill style={{ background: color.ink }}>
      <Stage3D camera={{ fov: FOV, near: 1, far: 800 }} flat>
        <color attach="background" args={[color.ink]} />
        <fogExp2 attach="fog" args={[color.ink, FOG_DENSITY]} />
        <CameraRig position={camera} target={target} />
        <Skyline />
        <Haze distance={distance} />
        <Wake t={t} ringTimes={ringTimes} calm={calm} />
        <LitWindow distance={distance} level={level * calm + 0.5 * (1 - calm)} room={roomLevel} tint="#dcdcff">
          {shockwaves.map((downbeat) => {
            const age = (t - downbeat) / 1.6;
            return (
              <Glow
                key={downbeat}
                position={[0, 0, 0.6]}
                size={(2 + 46 * ease("expo.out")(age)) * spread}
                color={color.accentHi}
                opacity={0.4 * (1 - age) * calm}
                shape="ring"
              />
            );
          })}
        </LitWindow>
        <TwoLights t={t} orbit={sway} placement={placement} size={0.12 * (1 + distance / 25)} level={1.2 + 0.25 * pulse(t)} />
        <Dust
          t={t}
          count={260}
          box={[reach * 3.2, reach * 4.2, reach * 3]}
          center={[LIT_CENTER[0], LIT_CENTER[1], LIT_CENTER[2] + reach * 1.6]}
          drift={[0.05 * reach, 0.1 * reach, 0]}
          size={0.016 * reach}
          span={2.2 * reach}
          seed={6}
          lights={[
            { position: pair.white, color: "#ffffff", reach: 0.8 * level },
            { position: pair.violet, color: color.accent, reach: 1.1 * level },
          ]}
        />
      </Stage3D>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 50%, ${color.accentHi}, transparent 70%)`,
          opacity: 0.55 * Math.exp(-local * 7),
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, transparent 0%, transparent 32%, rgba(7,7,11,0.78) 46%, rgba(7,7,11,0.78) 82%, rgba(7,7,11,0.5) 100%)`,
          opacity: progress(t, TITLE_AT - 0.9, 1.4),
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            top: 840,
            fontFamily: font.serif,
            fontStyle: "italic",
            fontSize: 196,
            lineHeight: 0.92,
            color: color.paper,
          }}
        >
          <div style={titleWord(t, TITLE_AT)}>Been alone</div>
          <div style={titleWord(t, TITLE_AT + 0.5)}>
            until{" "}
            <span style={{ color: color.accentHi, textShadow: `0 0 46px ${color.accent}, 0 0 110px ${color.accent}` }}>you</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 1330,
            fontFamily: font.mono,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "0.5em",
            paddingLeft: "0.5em",
            color: color.ash,
            opacity: tween(t, TAGLINE_AT, 0.8, 0, 1, "power2.out"),
          }}
        >
          prlxx
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: color.ink, opacity: progress(t, to - FADE_LENGTH - 0.1, FADE_LENGTH) }} />
    </AbsoluteFill>
  );
};
