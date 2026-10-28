import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { useWords } from "../components/Lyric";
import { color, font, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { clamp, ease, mix, noise, progress, tween } from "../lib/motion";
import { beatAt, beats, beatsBetween, pulse } from "../lib/song";
import { slamIn } from "./verse1/entrance";
import { padded } from "./verse1/format";
import { Mono } from "./verse1/Mono";

const CENTER = { x: WIDTH / 2, y: 700 };
const AVATAR_RADIUS = 140;
const RING_REACH = 560;
const RING_LIFE = 1.15;
const BUTTON = { width: 432, height: 108, top: 1500 };

const bracket = (tint: string): CSSProperties => ({
  position: "absolute",
  top: BUTTON.top,
  width: BUTTON.width,
  height: BUTTON.height,
  boxSizing: "border-box",
  border: `2px solid ${tint}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Nobody = () => {
  const { t, from, to } = useScene();
  const { words } = useWords(5);
  const beat = beatAt(t);
  const kick = pulse(t);
  const hangUp = beatsBetween(from, to).at(-1) ?? to;
  const ended = t >= hangUp;
  const ring = beat.index - beatAt(from + 0.01).index + 1;
  const shake = Math.exp(-beat.since * 24) * (ended ? 0 : 1);
  const buzz = { x: noise(t * 70, 3) * 14 * shake, y: noise(t * 70, 9) * 8 * shake };
  const [caller, ...status] = words;
  const ringBeats = [0, 1, 2].map((i) => beats[beat.index - i]).filter((born) => born < hangUp);
  const endAge = t - hangUp;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 55% at 50% 38%, ${color.night} 0%, ${color.ink} 75%)`, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${buzz.x}px, ${buzz.y}px)` }}>
        <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
          {[230, 330, 430].map((radius) => (
            <circle key={radius} cx={CENTER.x} cy={CENTER.y} r={radius} fill="none" stroke={color.smoke} strokeWidth={1.5} strokeDasharray="2 10" opacity={ended ? 0.4 : 1} />
          ))}
          {ringBeats.map((born) => {
            const life = progress(t, born, RING_LIFE);
            return (
              <circle
                key={born}
                cx={CENTER.x}
                cy={CENTER.y}
                r={AVATAR_RADIUS + RING_REACH * ease("expo.out")(life)}
                fill="none"
                stroke={color.paper}
                strokeWidth={mix(7, 1.5, life)}
                opacity={(1 - life) * 0.9}
              />
            );
          })}
          <circle cx={CENTER.x} cy={CENTER.y} r={AVATAR_RADIUS * (1 + kick * 0.05)} fill={color.ink} stroke={color.paper} strokeWidth={3} />
          <circle cx={CENTER.x} cy={CENTER.y} r={AVATAR_RADIUS - 26} fill="none" stroke={color.smoke} strokeWidth={2} />
          <circle cx={CENTER.x} cy={CENTER.y} r={11 + kick * 9} fill={color.paper} opacity={ended ? 0.35 : 1} />
        </svg>
        <Mono size={30} tint={color.paper} style={{ position: "absolute", left: 72, top: 300 }}>
          {ended ? "Call ended" : "Incoming call"}
        </Mono>
        <Mono size={30} style={{ position: "absolute", right: 72, top: 300 }}>
          {ended ? "00:00" : `Ring ${padded(ring, 2)}`}
        </Mono>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 960,
            textAlign: "center",
            fontFamily: font.display,
            fontWeight: 900,
            fontSize: 296,
            lineHeight: 0.9,
            fontVariationSettings: "'wdth' 62",
            color: color.paper,
            ...(caller.on ? slamIn(caller.age, 1.7) : { opacity: 0.1, color: color.smoke }),
          }}
        >
          {caller.w.toUpperCase()}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 1290,
            display: "flex",
            justifyContent: "center",
            gap: "0.28em",
            fontFamily: font.serif,
            fontStyle: "italic",
            fontSize: 112,
            lineHeight: 1,
            color: color.ash,
          }}
        >
          {status.map((word) => (
            <span
              key={word.index}
              style={{
                opacity: tween(word.age, 0, 0.16, 0, 1, "power2.out"),
                transform: `translateY(${tween(word.age, 0, 0.4, 28, 0, "expo.out")}px)`,
                color: word.active ? color.paper : color.ash,
              }}
            >
              {word.w}
            </span>
          ))}
        </div>
        <div style={{ opacity: ended ? 0 : 1 }}>
          <div style={{ ...bracket(color.smoke), left: 72 }}>
            <Mono size={28} tint={color.ash}>
              Decline
            </Mono>
          </div>
          <div style={{ ...bracket(color.paper), right: 72, background: color.paper, transform: `scale(${1 + kick * 0.035})` }}>
            <Mono size={28} tint={color.ink} style={{ fontWeight: 800 }}>
              Answer
            </Mono>
          </div>
        </div>
        <div
          style={{
            ...bracket(color.paper),
            left: 72,
            width: 936,
            opacity: clamp(endAge / 0.04),
            transform: `translateY(${tween(endAge, 0, 0.25, 24, 0, "expo.out")}px)`,
          }}
        >
          <Mono size={40} tint={color.paper}>
            0 missed calls
          </Mono>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
