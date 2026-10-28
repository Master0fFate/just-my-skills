import { AbsoluteFill } from "remotion";
import { color, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { noise, progress, tween } from "../lib/motion";
import { line, pulse } from "../lib/song";
import { Anchor, Display, Serif, violetGlow, youStroke, youTint } from "./hooks/Display";
import { Bloom, Strobe } from "./hooks/Light";
import { Readout } from "./hooks/Readout";
import { flash } from "./hooks/timing";
import { CAP_HEIGHT, fitSize, TALL, WIDE } from "./hooks/type";
import { zoomAt, ZoomO } from "./hooks/ZoomO";

const SERIF_RISE = 0.62;
const SERIF_THICKNESS = 0.7;
const SERIF_WIDTH = 1.9;

type Row = { text: string; width: number; stretch: number; from?: number; serif?: boolean };

const rowSize = (row: Row, stretch = row.stretch) => (row.serif ? row.width / SERIF_WIDTH : fitSize(row.text, row.width, stretch));

const rowHeight = (row: Row) => rowSize(row) * (row.serif ? SERIF_RISE : CAP_HEIGHT);

const rowThickness = (row: Row) => rowSize(row) * (row.serif ? SERIF_THICKNESS : CAP_HEIGHT);

const layout = (rows: Row[], gap: number, extent: number, measure: (row: Row) => number) => {
  const total = rows.reduce((sum, row) => sum + measure(row), 0) + gap * (rows.length - 1);
  let cursor = (extent - total) / 2;
  return rows.map((row) => {
    const center = cursor + measure(row) / 2;
    cursor += measure(row) + gap;
    return center;
  });
};

const calmRows: Row[] = [
  { text: "ALONE", width: 720, stretch: WIDE },
  { text: "until", width: 330, stretch: WIDE, serif: true },
  { text: "YOU", width: 720, stretch: WIDE },
];
const bigRows: Row[] = [
  { text: "ALONE", width: 936, stretch: WIDE },
  { text: "until", width: 640, stretch: WIDE, serif: true },
  { text: "YOU", width: 936, stretch: TALL, from: WIDE },
];
const columnRows: Row[] = [
  { text: "ALONE", width: 920, stretch: TALL },
  { text: "until", width: 700, stretch: TALL, serif: true },
  { text: "YOU", width: 900, stretch: TALL },
];
const calmCenters = layout(calmRows, 34, HEIGHT, rowHeight);
const bigCenters = layout(bigRows, 36, HEIGHT, rowHeight);
const columnCenters = layout(columnRows, 40, WIDTH, rowThickness);

const reps = [31, 32, 33, 34].map(line);
const youStarts = reps.map((rep) => rep.words[2].start);
const aloneStarts = reps.map((rep) => rep.words[0].start);
const strobeTimes = [youStarts[1], aloneStarts[2], youStarts[2], aloneStarts[3]];
const jolts = reps.flatMap((rep, i) => rep.words.map((word) => ({ time: word.start, power: [4, 10, 18, 24][i] })));

const WordRow = ({ row, age, stamp, glow }: { row: Row; age: number; stamp: boolean; glow: number }) => {
  const isYou = row.text === "YOU";
  const stretch = tween(age, 0, 0.2, row.from ?? row.stretch, row.stretch, "expo.out");
  return (
    <div style={{ transform: `scale(${tween(age, 0, 0.2, 1.5, 1, "expo.out")})`, opacity: tween(age, 0, 0.05, 0, 1, "none") }}>
      {row.serif ? (
        <Serif text={row.text} size={rowSize(row)} />
      ) : (
        <Display
          text={row.text}
          size={rowSize(row, stretch)}
          stretch={stretch}
          tint={stamp ? color.ink : isYou ? youTint(age) : color.paper}
          style={
            isYou && !stamp
              ? { WebkitTextStroke: youStroke, textShadow: violetGlow(glow * tween(age, 0, 0.6, 1.8, 1, "power3.out")) }
              : undefined
          }
        />
      )}
    </div>
  );
};

type StackProps = { t: number; index: number; rows: Row[]; centers: number[]; glow: number };

const Stack = ({ t, index, rows, centers, glow }: StackProps) => {
  const rep = reps[index];
  const collapse = tween(t, rep.end + 0.15, 0.16, 1, 0, "expo.in");
  if (t < rep.words[0].start || collapse <= 0.002) return null;
  const youAge = t - rep.words[2].start;
  return (
    <AbsoluteFill style={{ transform: `scaleY(${collapse})` }}>
      {youAge >= 0 && <Bloom y={centers[2]} radius={700} strength={glow * tween(youAge, 0, 0.6, 1.3, 0.6, "power2.out")} />}
      {rows.map((row, i) => {
        const age = t - rep.words[i].start;
        if (age < 0) return null;
        const stamp = i === 2 && index === 1 && age < 0.05;
        return (
          <Anchor key={row.text} y={centers[i]}>
            {stamp && <div style={{ position: "absolute", inset: "-14px -22px", background: color.paper }} />}
            <div style={{ position: "relative" }}>
              <WordRow row={row} age={age} stamp={stamp} glow={glow} />
            </div>
          </Anchor>
        );
      })}
    </AbsoluteFill>
  );
};

const Columns = ({ t }: { t: number }) => {
  const rep = reps[2];
  const collapse = tween(t, rep.end + 0.2, 0.18, 1, 0, "expo.in");
  if (t < rep.words[0].start || collapse <= 0.002) return null;
  const youAge = t - rep.words[2].start;
  return (
    <AbsoluteFill style={{ transform: `scaleX(${collapse})` }}>
      {youAge >= 0 && <Bloom x={columnCenters[2]} radius={720} strength={0.55 * tween(youAge, 0, 0.6, 1.3, 0.8, "power2.out")} />}
      {columnRows.map((row, i) => {
        const age = t - rep.words[i].start;
        if (age < 0) return null;
        const reveal = tween(age, 0, 0.14, 0, 100, "power2.out");
        const isYou = row.text === "YOU";
        return (
          <Anchor key={row.text} x={columnCenters[i]} transform="rotate(-90deg)" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>
            {row.serif ? (
              <Serif text={row.text} size={rowSize(row)} />
            ) : (
              <Display
                text={row.text}
                size={rowSize(row)}
                stretch={row.stretch}
                tint={isYou ? youTint(age) : color.paper}
                style={
                  isYou ? { WebkitTextStroke: youStroke, textShadow: violetGlow(tween(age, 0, 0.6, 1.8, 1, "power3.out")) } : undefined
                }
              />
            )}
          </Anchor>
        );
      })}
    </AbsoluteFill>
  );
};

const Axis = ({ t }: { t: number }) => {
  const grow = progress(t, reps[2].end + 0.1, 0.4);
  const fade = 1 - progress(t, reps[3].words[0].start, 0.3);
  if (grow <= 0 || fade <= 0) return null;
  return (
    <Anchor opacity={fade}>
      <div style={{ width: 3, height: 1350 * grow, background: color.paper }} />
    </Anchor>
  );
};

export const Bridge = () => {
  const { t, from, to } = useScene();
  const repIndex = Math.max(0, reps.filter((rep) => rep.start <= t).length - 1);
  const inLongRep = t >= aloneStarts[3];
  const jolt = Math.max(...jolts.map(({ time, power }) => (t >= time ? power * Math.exp(-(t - time) * 16) : 0)));
  const shake = jolt + (zoomAt(t, aloneStarts[3], to) - 1) * 0.7;
  const camera = `translate(${noise(t * 24, 7) * shake}px, ${noise(t * 24, 8) * shake}px) scale(${1 + (t - from) * 0.002 + (inLongRep ? 0 : pulse(t) * 0.02)})`;
  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: camera }}>
        <Stack t={t} index={0} rows={calmRows} centers={calmCenters} glow={0.6} />
        <Stack t={t} index={1} rows={bigRows} centers={bigCenters} glow={1} />
        <Columns t={t} />
        <Axis t={t} />
        <ZoomO t={t} end={to} />
      </AbsoluteFill>
      <Readout label="REPEAT" value={`${String(repIndex + 1).padStart(2, "0")}/04`} />
      <Strobe amount={flash(t, strobeTimes, 2) * 0.9} />
    </AbsoluteFill>
  );
};
