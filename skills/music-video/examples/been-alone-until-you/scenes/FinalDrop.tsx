import { AbsoluteFill } from "remotion";
import { color } from "../config";
import { useScene } from "../lib/clock";
import { ease, noise, progress, tween } from "../lib/motion";
import { beatAt, line, pulse } from "../lib/song";
import { Callback, type CallbackKind, type Orientation } from "./hooks/Callbacks";
import { Anchor, Display, violetGlow, youStroke } from "./hooks/Display";
import { LineWords } from "./hooks/HookWords";
import { Bloom, Rays, Shade, Shock, Strobe } from "./hooks/Light";
import { Readout } from "./hooks/Readout";
import { beatStep, burstTravel, eighths, flash, impact, openingTime } from "./hooks/timing";
import { Tunnel } from "./hooks/Tunnel";
import { WIDE } from "./hooks/type";

const lines = [41, 42, 43].map(line);
const youStarts = lines.map((entry) => entry.words[3].start);
const aloneStarts = lines.map((entry) => entry.words[1].start);
const wordStarts = lines.flatMap((entry) => entry.words.map((word) => word.start));
const finalYou = youStarts[2];

const KINDS: CallbackKind[] = ["years", "nobody", "cracks", "maybe", "mine"];
const ORIENTATIONS: Orientation[] = ["flat", "vertical", "bleed"];
const MIN_HIT = 0.2;

type Hit = { time: number; end: number; kind: CallbackKind; orientation: Orientation };

const hitWindow = (opens: number, closes: number, orientation: Orientation): Hit[] => {
  const times = eighths.filter((time) => time >= opens && time <= closes - MIN_HIT);
  return times.map((time, i) => ({ time, end: times[i + 1] ?? closes, kind: KINDS[i % KINDS.length], orientation }));
};

const sceneStart = 203.639;
const hits = [
  ...hitWindow(sceneStart, lines[0].start, ORIENTATIONS[0]),
  ...hitWindow(lines[0].end, lines[1].start, ORIENTATIONS[1]),
  ...hitWindow(lines[1].end, lines[2].start, ORIENTATIONS[2]),
];
const hitTimes = hits.map((hit) => hit.time);

const LETTERS = ["Y", "O", "U"];
const LETTER_SIZE = 620;
const LETTER_PITCH = 450;
const LETTER_STAGGER = 0.07;
const CAP_CENTER_SHIFT = 0.0105 * LETTER_SIZE;
const FIRST_DAYS = 2190;

const burstOpen = (t: number) =>
  Math.max(
    0.35 * impact(t, hitTimes, 12),
    ...youStarts.map((start) => (t < start ? 0 : 1.6 * Math.min(1, (t - start) / 0.06) * Math.exp(-(t - start) * 4.5))),
  );

const FinalYou = ({ t, end }: { t: number; end: number }) => {
  const age = t - finalYou;
  if (age < 0) return null;
  const surge = 1 + 0.03 * pulse(t) + 0.08 * progress(t, end - 0.4, 0.4);
  return (
    <>
      <Bloom radius={1500} strength={tween(age, 0, 0.4, 0.6, 1, "power2.out")} />
      <Rays angle={t * 24} strength={0.9} />
      <Shock age={age} size={240} reach={14} duration={0.8} />
      <AbsoluteFill style={{ transform: `scale(${surge})` }}>
        {LETTERS.map((letter, k) => {
          const letterAge = age - k * LETTER_STAGGER;
          if (letterAge < 0) return null;
          return (
            <Anchor
              key={letter}
              y={960 + (k - 1) * LETTER_PITCH + CAP_CENTER_SHIFT}
              transform={`scale(${tween(letterAge, 0, 0.28, 2.6, 1, "expo.out")})`}
              opacity={tween(letterAge, 0, 0.04, 0, 1, "none")}
            >
              <Display
                text={letter}
                size={LETTER_SIZE}
                stretch={WIDE}
                tint={color.paper}
                style={{ WebkitTextStroke: youStroke, textShadow: violetGlow(tween(letterAge, 0, 0.7, 2, 1, "power3.out")) }}
              />
            </Anchor>
          );
        })}
      </AbsoluteFill>
    </>
  );
};

export const FinalDrop = () => {
  const { t, from, to } = useScene();
  const travel =
    3600 * (t - from) +
    burstTravel(t, from, 0, 2400, 10, hitTimes) +
    burstTravel(t, from, 0, 5000, 8, wordStarts) +
    burstTravel(t, from, 0, 14000, 4, youStarts);
  const jolt = impact(t, wordStarts, 14) * 0.05 + impact(t, hitTimes, 16) * 0.04 + impact(t, youStarts, 9) * 0.1;
  const shake = jolt * 160;
  const swing = beatAt(t).index % 2 ? 1 : -1;
  const camera = `translate(${noise(t * 20, 11) * shake}px, ${noise(t * 20, 12) * shake}px) scale(${1 + pulse(t) * 0.03 + jolt})`;
  const youBlast = impact(t, youStarts, 2);
  const days = Math.round(FIRST_DAYS * (1 - ease("power2.inOut")(progress(t, from, finalYou - from))));
  const strobe =
    flash(t, [openingTime(from), aloneStarts[0], youStarts[0], aloneStarts[1], youStarts[1], aloneStarts[2]], 2) + flash(t, [finalYou], 3);
  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: camera }}>
        <Bloom radius={1300 + 900 * youBlast} strength={0.55 + 0.45 * youBlast} />
        <Rays angle={t * 18} strength={0.5 + 0.3 * pulse(t)} />
        <AbsoluteFill style={{ transform: `rotate(${noise(t * 0.8, 13) * 8 + swing * 3 * pulse(t)}deg)` }}>
          <Tunnel text="ALONE" travel={travel} spin={20 * (t - from) + 18 * beatStep(t)} roll={0} tint={1} open={burstOpen(t)} />
        </AbsoluteFill>
        <Shade strength={0.45} width={1200} height={800} />
        {hits.map((hit) => {
          const age = t - hit.time;
          if (age < 0 || t >= hit.end) return null;
          return <Callback key={hit.time} kind={hit.kind} age={age} orientation={hit.orientation} />;
        })}
        {lines.map((entry, i) => (
          <LineWords key={entry.id} id={entry.id} t={t} hold={0} omit={i === lines.length - 1 ? 3 : undefined} />
        ))}
        <FinalYou t={t} end={to} />
      </AbsoluteFill>
      <Readout label="DAYS ALONE" value={String(days).padStart(4, "0")} />
      <Strobe amount={Math.min(1, strobe) * 0.9} />
    </AbsoluteFill>
  );
};
