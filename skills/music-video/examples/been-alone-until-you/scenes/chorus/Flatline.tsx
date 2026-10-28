import { AbsoluteFill } from "remotion";
import { useWords } from "../../components/Lyric";
import { color, font } from "../../config";
import { clamp, ease, progress } from "../../lib/motion";
import { curve, pulse } from "../../lib/song";
import { pump, withAlpha } from "./fx";
import type { BlockProps } from "./hookParts";
import { advance, BASELINE } from "./metrics";

const CENTER = 955;
const SPACING = 172;
const LAST_EXTRA = 40;
const TICK_STEP = 36;
const STEP_X = 8;
const SIZES = [190, 215, 230, 215, 230, 230, 290] as const;
const ALIGNS = [0, 1, 0, 0.5, 1, 0, 0.5] as const;
const MARGIN = 72;
const POINTS = Array.from({ length: 1080 / STEP_X + 1 }, (_, i) => i * STEP_X);
const TICKS = Array.from({ length: 1080 / TICK_STEP + 1 }, (_, i) => {
  const x = i * TICK_STEP;
  const reach = i % 5 === 0 ? 22 : 9;
  return `M${x},${CENTER - reach} L${x},${CENTER + reach}`;
}).join(" ");

const waveAt = (x: number, t: number, row: number, amp: number) => {
  const u = x / 1080;
  const tt = t - Math.abs(u - 0.5) * 0.4 - row * 0.035;
  const envelope = Math.pow(Math.sin(Math.PI * u), 1.4);
  const carrier =
    curve("low", tt) * Math.sin(u * 6.5 - t * 5.5) +
    0.55 * curve("mid", tt) * Math.sin(u * 15 + t * 8 + row) +
    0.14 * curve("high", tt) * Math.sin(u * 44 - t * 17);
  return amp * envelope * carrier;
};

export const Flatline = ({ block, look }: BlockProps) => {
  const { t, words } = useWords(block.id);
  const entries = words.map((word) => ease("expo.out")(progress(t, word.start - 0.04, 0.5)));
  const count = entries.reduce((sum, entry) => sum + entry, 0);
  const strength = look.variant === 3 ? 1.15 : 1;
  const thump = 1 + 0.3 * pulse(t, 7);
  const last = words.length - 1;
  const rows = words.map((word, i) => {
    const baseline =
      CENTER + (i - (count - 1) / 2) * SPACING * entries[i] + (i === last ? LAST_EXTRA * entries[i] : 0);
    const amp = 46 * entries[i] * (0.6 + 0.4 * (count / words.length)) * (i === last ? 1.4 : 1) * strength * thump;
    return { word, baseline, amp, entry: entries[i] };
  });
  const order = rows.map((_, i) => i).sort((a, b) => rows[a].baseline - rows[b].baseline);
  const bottom = SPACING * 0.6;
  const accent = (i: number) => (i === last && rows[i].entry > 0.02 ? look.palette.you : look.theme.warm && i % 2 === 1 ? color.warm : look.palette.fg);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 80% 45% at 50% 52%, ${withAlpha(look.palette.you, 0.05 + 0.3 * (count / words.length))}, transparent)`,
        }}
      />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          {rows.map((row, i) => (
            <linearGradient key={i} id={`flatline-fade-${i}`} gradientUnits="userSpaceOnUse" x1={0} x2={0} y1={row.baseline - row.amp * 1.3} y2={row.baseline + bottom}>
              <stop offset={0} stopColor={look.palette.bg} stopOpacity={0.96} />
              <stop offset={0.5} stopColor={look.palette.bg} stopOpacity={0.9} />
              <stop offset={1} stopColor={look.palette.bg} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <path d={TICKS} stroke={look.palette.mute} strokeWidth={2} opacity={0.5 * (1 - clamp(count * 1.5))} />
        {order.map((i) => {
          const row = rows[i];
          const points = POINTS.map((x) => `${x},${(row.baseline + waveAt(x, t, i, row.amp)).toFixed(1)}`);
          const line = `M${points.join(" L")}`;
          const fill = `${line} L1080,${row.baseline + bottom} L0,${row.baseline + bottom} Z`;
          const isLast = i === last;
          return (
            <g key={i}>
              <path d={fill} fill={`url(#flatline-fade-${i})`} />
              {isLast && row.entry > 0 && <path d={line} fill="none" stroke={look.palette.you} strokeWidth={26} strokeOpacity={0.14 * row.entry} strokeLinejoin="round" />}
              <path
                d={line}
                fill="none"
                stroke={accent(i)}
                strokeWidth={(isLast ? 8 : 4.5) * (look.variant === 3 ? 1.4 : 1)}
                strokeLinejoin="round"
                strokeOpacity={0.75 + 0.25 * row.entry}
              />
            </g>
          );
        })}
      </svg>
      {rows.map((row, i) => {
        const text = row.word.w.toUpperCase();
        const wdth = 62 + (i === last ? 34 : 18) * pump(t - i * 0.03);
        const natural = [...text].map((char) => advance(char, wdth) * SIZES[i]);
        const fit = Math.min(1, (1080 - MARGIN * 2) / natural.reduce((sum, width) => sum + width, 0));
        const size = SIZES[i] * fit;
        const widths = natural.map((width) => width * fit);
        const total = widths.reduce((sum, width) => sum + width, 0);
        const left = MARGIN + (1080 - MARGIN * 2 - total) * ALIGNS[i];
        let cursor = left;
        return [...text].map((char, j) => {
          const width = widths[j];
          const x = cursor + width / 2;
          cursor += width;
          const age = t - (row.word.start + j * 0.03);
          if (age < 0) return null;
          const before = waveAt(x - width / 2, t, i, row.amp);
          const after = waveAt(x + width / 2, t, i, row.amp);
          const y = row.baseline + (before + after) / 2;
          const tilt = clamp(((Math.atan2(after - before, width) * 180) / Math.PI) * 0.7, -22, 22);
          const pop = ease("expo.out")(progress(age, 0, 0.22));
          const isLast = i === last;
          return (
            <div
              key={`${i}-${j}`}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width,
                fontFamily: font.display,
                fontWeight: 900,
                fontSize: size,
                lineHeight: 1,
                textAlign: "center",
                fontVariationSettings: `'wdth' ${wdth}`,
                color: isLast ? look.palette.you : i === 3 ? look.palette.mute : look.palette.fg,
                textShadow: isLast ? `0 0 34px ${withAlpha(look.palette.you, 0.85)}` : undefined,
                opacity: Math.min(1, age / 0.05),
                transformOrigin: `${width / 2}px ${BASELINE * size}px`,
                transform: `translate(${x - width / 2}px, ${y - BASELINE * size - (1 - pop) * 46}px) rotate(${tilt}deg) scale(${1 + (1 - pop) * 0.5})`,
              }}
            >
              {char}
            </div>
          );
        });
      })}
      <div
        style={{
          position: "absolute",
          left: MARGIN,
          top: 210,
          fontFamily: font.mono,
          fontSize: 24,
          letterSpacing: "0.18em",
          color: look.palette.mute,
        }}
      >
        {`LEVEL ${(curve("rms", t) * entries[last]).toFixed(2)}`}
      </div>
      <div
        style={{
          position: "absolute",
          right: MARGIN,
          top: 210,
          fontFamily: font.mono,
          fontSize: 24,
          letterSpacing: "0.18em",
          color: entries[last] > 0.1 ? look.palette.you : look.palette.mute,
        }}
      >
        {entries[last] > 0.1 ? "MOVING" : "SILENCE"}
      </div>
    </AbsoluteFill>
  );
};
