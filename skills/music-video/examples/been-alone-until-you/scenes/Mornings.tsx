import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { useWords, type WordState } from "../components/Lyric";
import { Plate } from "../components/Plate";
import { color, font, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, progress, tween } from "../lib/motion";
import { BEAT, pulse } from "../lib/song";
import { Mono, Motes } from "./verse2/kit";

const PERIOD = 46;
const SUNLIGHT = "#fff1dc";

type RowSpec = { words: number[]; size: number };

const ROWS: RowSpec[] = [
  { words: [0, 1], size: 150 },
  { words: [2], size: 228 },
  { words: [3, 4], size: 150 },
  { words: [5], size: 304 },
  { words: [6, 7], size: 290 },
];

const SERIF_WORDS = new Set([0, 1, 3, 4, 6]);

const stripeMask = (open: number, offset: number): CSSProperties => {
  const lit = Math.max(0.5, PERIOD * open);
  const image = `repeating-linear-gradient(180deg, #000 0px, #000 ${lit}px, transparent ${lit}px, transparent ${PERIOD}px)`;
  const position = `0px ${offset}px`;
  return { WebkitMaskImage: image, maskImage: image, WebkitMaskPosition: position, maskPosition: position };
};

type WordStackProps = { words: WordState[]; lit: boolean };

const WordStack = ({ words, lit }: WordStackProps) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, paddingTop: 40 }}>
    {ROWS.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: "flex", alignItems: "baseline", columnGap: row.size * 0.2 }}>
        {row.words.map((index) => {
          const word = words[index];
          const serif = SERIF_WORDS.has(index);
          const enter = word.on ? tween(word.age, 0, 0.5, 0, 1, "expo.out") : 0;
          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                fontFamily: serif ? font.serif : font.display,
                fontStyle: serif ? "italic" : "normal",
                fontSize: row.size,
                fontWeight: serif ? 400 : 900,
                fontVariationSettings: serif ? undefined : "'wdth' 66",
                lineHeight: 0.9,
                letterSpacing: serif ? "-0.01em" : "-0.03em",
                textTransform: serif ? "none" : "uppercase",
                color: lit ? SUNLIGHT : "transparent",
                WebkitTextStroke: lit ? undefined : `2px ${color.paper}24`,
                opacity: lit ? enter : 1,
                transform: lit ? `translateY(${(1 - enter) * 46}px)` : undefined,
                filter: lit && enter < 1 ? `blur(${(1 - enter) * 14}px)` : undefined,
                textShadow: lit ? `0 0 46px ${color.warm}99` : undefined,
              }}
            >
              {word.w}
            </span>
          );
        })}
      </div>
    ))}
  </AbsoluteFill>
);

export const Mornings = () => {
  const { t, local, duration } = useScene();
  const { words } = useWords(22);
  const last = words[words.length - 1];
  const bump = pulse(t);
  const opening =
    0.2 +
    0.22 * ease("power2.out")(progress(local, 0, 3)) +
    0.58 * ease("power2.inOut")(progress(t, last.start - 0.3, 1.2)) +
    0.45 * Math.exp(-local * 9) +
    bump * 0.07;
  const open = Math.min(1, opening);
  const offset = -local * 12;
  const sunY = mix(HEIGHT * 0.86, 660, ease("sine.out")(progress(local, 0, duration * 0.92)));
  const sun = ease("power2.out")(progress(local, 0, 2.2));
  const stripes = stripeMask(open, offset);

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <Plate name="blinds" zoom={[1.04, 1.14]} exposure={mix(0.62, 1.05, open)} saturation={1} contrast={1.05} tint={color.warm} tintAmount={0.2} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 100% 50% at 50% ${(sunY / HEIGHT) * 100}%, ${color.warm}55, transparent 70%)` }} />
      <AbsoluteFill style={stripes}>
        <div
          style={{
            position: "absolute",
            left: WIDTH / 2 - 400,
            top: sunY - 400,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${SUNLIGHT}d0 0%, ${color.warm}b0 52%, ${color.warm}00 72%)`,
            opacity: sun * (0.82 + bump * 0.18),
            transform: `scale(${1 + bump * 0.02})`,
          }}
        />
        <AbsoluteFill style={{ background: `linear-gradient(180deg, transparent 20%, ${color.warm}2a)` }} />
      </AbsoluteFill>
      <Motes t={t} count={46} seed={9} tint={color.warm} speed={18} />
      <AbsoluteFill style={{ transform: `scale(${1 + bump * 0.008})` }}>
        <WordStack words={words} lit={false} />
        <AbsoluteFill style={stripes}>
          <WordStack words={words} lit />
        </AbsoluteFill>
      </AbsoluteFill>
      <Mono tint={color.warm} style={{ position: "absolute", left: 72, top: 330 }}>06:{String(Math.floor(local / BEAT)).padStart(2, "0")} AM / Sunrise</Mono>
    </AbsoluteFill>
  );
};
