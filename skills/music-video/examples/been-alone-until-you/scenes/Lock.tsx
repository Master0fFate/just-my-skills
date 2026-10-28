import { AbsoluteFill } from "remotion";
import { useWords } from "../components/Lyric";
import { color, font } from "../config";
import { useScene } from "../lib/clock";
import { clamp, ease, mix, noise, progress, tween } from "../lib/motion";
import { beatAt, BEAT, beatsBetween, pulse } from "../lib/song";
import { padded } from "./verse1/format";
import { Mono } from "./verse1/Mono";

const CENTER = { x: 540, y: 940 };
const RIM = 500;
const NUMBERS = 436;
const TEXT = 330;
const INNER = 262;
const HUB = 190;
const FONT_SIZE = 92;
const SNAP = 0.28;
const CIRCUMFERENCE = 2 * Math.PI * TEXT;
const TEXT_CIRCLE = `M ${CENTER.x} ${CENTER.y - TEXT} A ${TEXT} ${TEXT} 0 1 1 ${CENTER.x} ${CENTER.y + TEXT} A ${TEXT} ${TEXT} 0 1 1 ${CENTER.x} ${CENTER.y - TEXT}`;

const polar = (radius: number, degrees: number) => {
  const radians = (degrees * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.sin(radians), y: CENTER.y - radius * Math.cos(radians) };
};

const tickPath = (radius: number, count: number, length: number, every = 1) =>
  Array.from({ length: count }, (_, i) => i)
    .filter((i) => i % every === 0)
    .map((i) => {
      const outer = polar(radius, (i * 360) / count);
      const inner = polar(radius - length, (i * 360) / count);
      return `M ${outer.x.toFixed(1)} ${outer.y.toFixed(1)} L ${inner.x.toFixed(1)} ${inner.y.toFixed(1)}`;
    })
    .join(" ");

const RIM_TICKS = tickPath(RIM, 120, 16);
const RIM_MAJOR = tickPath(RIM, 120, 34, 5);
const INNER_TICKS = tickPath(INNER, 72, 18);
const INNER_MAJOR = tickPath(INNER, 72, 34, 6);
const DIAL_NUMBERS = Array.from({ length: 20 }, (_, i) => i * 5);

const subPulse = (t: number, divisions: number) => {
  const { phase } = beatAt(t);
  const cell = phase * divisions;
  return Math.exp(-(cell - Math.floor(cell)) * (BEAT / divisions) * 16);
};

export const Lock = () => {
  const { t, from, to } = useScene();
  const { words } = useWords(8);
  const clickAt = beatsBetween(from, to).at(-1) ?? to;
  const frozen = Math.min(t, clickAt);
  const tension = ease("power2.in")(progress(t, words[0].start, clickAt - words[0].start));
  const kick = pulse(t);
  const divisions = tension > 0.7 ? 4 : tension > 0.4 ? 2 : 1;
  const tick = divisions === 1 ? kick : subPulse(t, divisions);
  const open = progress(t, clickAt, to - clickAt);
  const unlocked = t >= clickAt;

  const slots = words.map((word) => word.w.length + 1);
  const totalSlots = slots.reduce((sum, slot) => sum + slot, 0);
  const centers = slots.map((slot, i) => ((slots.slice(0, i).reduce((sum, s) => sum + s, 0) + slot / 2) / totalSlots) * 360);
  const targets = centers.map((center) => -center);
  const snaps = words.map((word, i) => {
    const length = i === 0 ? 0 : Math.min(SNAP, word.start - words[i - 1].start);
    return { start: word.start - length, length };
  });
  const turned = snaps.reduce((latest, snap, i) => (i > 0 && t >= snap.start ? i : latest), 0);
  const settle =
    turned === 0
      ? tween(t, from, words[0].start - from, targets[0] + 600, targets[0], "expo.out")
      : tween(t, snaps[turned].start, snaps[turned].length, targets[turned - 1], targets[turned], "back.out(1.7)");
  const textAngle = settle + tween(t, clickAt, 0.14, 0, 16, "power3.out");

  const shakeAmount = unlocked ? 0 : 1.5 + 15 * tension ** 3;
  const shake = {
    x: noise(frozen * 50, 4) * shakeAmount,
    y: noise(frozen * 50, 8) * shakeAmount * 0.6,
    roll: noise(frozen * 40, 2) * 0.5 * tension,
  };
  const rimAngle = 10 * (frozen - from) + 190 * tension ** 3;
  const numbersAngle = -(6 * (frozen - from) + 150 * tension ** 3);
  const innerAngle = 14 * (frozen - from) + 260 * tension ** 3;
  const glow = (0.12 + 0.88 * tension ** 2) * (0.7 + 0.3 * tick);
  const dialFade = unlocked ? tween(t, clickAt, 0.4, 1, 0, "power2.in") : 1;
  const dialScale = (1 + kick * 0.012) * (unlocked ? tween(t, clickAt, 0.45, 1, 1.35, "expo.in") : 1);
  const clicks = words.filter((word) => word.on).length;
  const pointerFlash = unlocked ? 1 : Math.max(...words.map((word) => Math.exp(-Math.max(0, word.age) * 12) * (word.on ? 1 : 0)));
  const bloomScale = mix(0.06, 1.25, ease("expo.in")(open));
  const spike = unlocked ? tween(t, clickAt, 0.22, 1, 0, "expo.out") : 0;
  const whiteout = tween(t, to - 0.2, 0.2, 0, 0.9, "power2.in");

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 49%, ${color.night} 0%, ${color.ink} 70%)`, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: CENTER.x - 700,
          top: CENTER.y - 700,
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color.accentHi} 0%, ${color.accent} 22%, ${color.accentDeep} 48%, rgba(35,35,138,0) 70%)`,
          opacity: glow * 0.5,
          transform: `scale(${0.3 + tension * 0.55 + kick * 0.04})`,
        }}
      />
      <div style={{ opacity: dialFade, transform: `translate(${shake.x}px, ${shake.y}px) rotate(${shake.roll}deg) scale(${dialScale})`, transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <path id="lock-text-circle" d={TEXT_CIRCLE} />
            <radialGradient id="lock-keyhole" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor={color.accentHi} />
              <stop offset="100%" stopColor={color.accent} stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={CENTER.x} cy={CENTER.y} r={RIM + 14} fill="none" stroke={color.smoke} strokeWidth={2} />
          <circle cx={CENTER.x} cy={CENTER.y} r={NUMBERS + 28} fill="none" stroke={color.smoke} strokeWidth={2} />
          <circle cx={CENTER.x} cy={CENTER.y} r={TEXT - 14} fill="none" stroke={color.smoke} strokeWidth={2} />
          <g transform={`rotate(${rimAngle} ${CENTER.x} ${CENTER.y})`}>
            <path d={RIM_TICKS} stroke={color.ash} strokeWidth={2} opacity={0.7} />
            <path d={RIM_MAJOR} stroke={color.paper} strokeWidth={3.5} />
          </g>
          <g transform={`rotate(${numbersAngle} ${CENTER.x} ${CENTER.y})`} fontFamily={font.mono} fontSize={28} fontWeight={500} fill={color.ash} textAnchor="middle">
            {DIAL_NUMBERS.map((value) => (
              <text key={value} x={CENTER.x} y={CENTER.y - NUMBERS} transform={`rotate(${value * 3.6} ${CENTER.x} ${CENTER.y})`} letterSpacing="0.1em">
                {padded(value, 2)}
              </text>
            ))}
          </g>
          <g
            transform={`rotate(${textAngle} ${CENTER.x} ${CENTER.y})`}
            fontFamily={font.display}
            fontWeight={800}
            fontSize={FONT_SIZE}
            textAnchor="middle"
            style={{ fontVariationSettings: "'wdth' 62", textTransform: "uppercase" }}
          >
            {words.map((word, i) => (
              <text key={word.index} fill={word.active ? color.paper : color.ash} fillOpacity={word.on ? 1 : 0.12}>
                <textPath href="#lock-text-circle" startOffset={(centers[i] / 360) * CIRCUMFERENCE}>
                  {word.w}
                </textPath>
              </text>
            ))}
          </g>
          <g transform={`rotate(${innerAngle} ${CENTER.x} ${CENTER.y})`}>
            <path d={INNER_TICKS} stroke={color.ash} strokeWidth={2} opacity={0.6} />
            <path d={INNER_MAJOR} stroke={color.paper} strokeWidth={3} />
          </g>
          <circle cx={CENTER.x} cy={CENTER.y} r={HUB} fill={color.ink} stroke={color.paper} strokeWidth={3} />
          <circle cx={CENTER.x} cy={CENTER.y} r={HUB - 26} fill="none" stroke={color.smoke} strokeWidth={2} />
          <circle cx={CENTER.x} cy={CENTER.y - 22} r={140 * glow + 20} fill="url(#lock-keyhole)" opacity={glow} />
          <circle cx={CENTER.x} cy={CENTER.y - 18} r={34} fill={color.ink} stroke={color.paper} strokeWidth={3} />
          <path d={`M ${CENTER.x - 20} ${CENTER.y + 8} L ${CENTER.x + 20} ${CENTER.y + 8} L ${CENTER.x + 36} ${CENTER.y + 92} L ${CENTER.x - 36} ${CENTER.y + 92} Z`} fill={color.ink} stroke={color.paper} strokeWidth={3} strokeLinejoin="round" />
          <path d={`M ${CENTER.x - 24} ${CENTER.y - 508} L ${CENTER.x + 24} ${CENTER.y - 508} L ${CENTER.x} ${CENTER.y - 462} Z`} fill={color.paper} />
          <path d={`M ${CENTER.x - 24} ${CENTER.y - 508} L ${CENTER.x + 24} ${CENTER.y - 508} L ${CENTER.x} ${CENTER.y - 462} Z`} fill={color.accent} opacity={pointerFlash} />
        </svg>
      </div>
      <Mono size={30} tint={color.paper} style={{ position: "absolute", left: 72, top: 296 }}>
        Combination
      </Mono>
      <Mono size={30} style={{ position: "absolute", right: 72, top: 296 }}>
        Click {padded(clicks, 2)} / {padded(words.length, 2)}
      </Mono>
      <Mono size={44} tint={unlocked ? color.paper : color.ash} style={{ position: "absolute", left: 0, right: 0, top: 1530, textAlign: "center", letterSpacing: "0.4em" }}>
        {unlocked ? "Open" : "Locked"}
      </Mono>
      <div
        style={{
          position: "absolute",
          left: CENTER.x - 1200,
          top: CENTER.y - 1200,
          width: 2400,
          height: 2400,
          borderRadius: "50%",
          background: `radial-gradient(circle, #ffffff 0%, #ffffff 16%, ${color.accentHi} 32%, ${color.accent} 52%, rgba(102,102,255,0) 72%)`,
          opacity: open > 0 ? 1 : 0,
          transform: `scale(${bloomScale})`,
        }}
      />
      <AbsoluteFill style={{ background: "#ffffff", opacity: clamp(Math.max(spike, whiteout)) }} />
    </AbsoluteFill>
  );
};
