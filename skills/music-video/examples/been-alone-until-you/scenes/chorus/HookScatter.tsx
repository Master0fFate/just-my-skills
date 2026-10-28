import { AbsoluteFill } from "remotion";
import { useWords } from "../../components/Lyric";
import { color, font } from "../../config";
import { progress, tween } from "../../lib/motion";
import { pulse } from "../../lib/song";
import { pump, withAlpha } from "./fx";
import { ghostText, slamIn, wordHeat, YouBloom, youText, type BlockProps } from "./hookParts";

const LETTER_SIZE = 360;
const LETTER_XS = [240, 840, 340, 780, 560] as const;
const FIRST_Y = 590;
const STEP = 160;
const RAIL_LEFT = 72;
const RAIL_RIGHT = 1008;
const YOU_CENTER = 1490;

export const HookScatter = ({ block, look }: BlockProps) => {
  const { t, words } = useWords(block.id);
  const [been, alone, until, you] = words;
  const letters = [...alone.w.toUpperCase()];
  const span = Math.max(0.2, (alone.end - alone.start) * 0.8);
  const wdth = 62 + 16 * pump(t);
  const jolt = pulse(t, 7);
  const letterAge = (i: number) => t - (alone.start + (i / letters.length) * span);
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {letters.map((_, i) => {
          const age = letterAge(i);
          const reveal = age < 0 ? 0 : progress(age, 0, 0.4);
          return (
            <line
              key={i}
              x1={RAIL_LEFT}
              x2={RAIL_LEFT + (RAIL_RIGHT - RAIL_LEFT) * (0.06 + 0.94 * reveal)}
              y1={FIRST_Y + i * STEP}
              y2={FIRST_Y + i * STEP}
              stroke={age < 0 ? look.palette.mute : look.palette.fg}
              strokeOpacity={age < 0 ? 0.25 : 0.5}
              strokeWidth={2}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 300,
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 170,
          lineHeight: 1,
          fontVariationSettings: `'wdth' ${wdth}`,
          color: look.palette.fg,
          ...(been.on ? { ...slamIn(been.age, 40), ...wordHeat(look, been.age) } : ghostText(look)),
        }}
      >
        {been.w.toUpperCase()}
      </div>
      {letters.map((char, i) => {
        const age = letterAge(i);
        const side = i % 2 === 0 ? -1 : 1;
        const x = LETTER_XS[i] + Math.sin(t * 0.9 + i * 1.7) * 26 + side * jolt * 16 + tween(age, 0, 0.4, side * 520, 0, "expo.out");
        return (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                left: RAIL_LEFT,
                top: FIRST_Y + i * STEP - 54,
                fontFamily: font.mono,
                fontSize: 22,
                letterSpacing: "0.18em",
                color: look.palette.mute,
                opacity: age < 0 ? 0 : 0.9,
              }}
            >
              {`0${i + 1}/0${letters.length}`}
            </div>
            <div
              style={{
                position: "absolute",
                left: x,
                top: FIRST_Y + i * STEP,
                fontFamily: font.display,
                fontWeight: 900,
                fontSize: LETTER_SIZE,
                lineHeight: 1,
                fontVariationSettings: `'wdth' ${wdth}`,
                color: look.palette.fg,
                transform: "translate(-50%, -50%)",
                ...(age >= 0 ? { opacity: tween(age, 0, 0.06, 0, 1, "none"), ...wordHeat(look, age) } : ghostText(look)),
              }}
            >
              {char}
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 1400,
          fontFamily: font.serif,
          fontStyle: "italic",
          fontSize: 200,
          lineHeight: 1,
          color: look.palette.fg,
          transform: "translateY(-50%)",
          ...(until.on
            ? { opacity: tween(until.age, 0, 0.1, 0, 1, "none"), translate: `${tween(until.age, 0, 0.4, -120, 0, "expo.out")}px 0` }
            : { color: "transparent", WebkitTextStroke: `1.5px ${withAlpha(color.ash, 0.35)}` }),
        }}
      >
        {until.w}
      </div>
      <YouBloom look={look} age={you.age} x={700} y={YOU_CENTER} radius={560} />
      <div
        style={{
          position: "absolute",
          right: 72,
          top: YOU_CENTER,
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 400,
          lineHeight: 1,
          fontVariationSettings: `'wdth' ${wdth}`,
          transform: "translateY(-50%)",
          color: look.palette.fg,
          ...(you.on ? { ...slamIn(you.age, 80), ...youText(look, you.age) } : ghostText(look)),
        }}
      >
        {you.w.toUpperCase()}
      </div>
    </AbsoluteFill>
  );
};
