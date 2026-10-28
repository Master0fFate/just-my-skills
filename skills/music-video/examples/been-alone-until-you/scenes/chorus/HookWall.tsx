import { AbsoluteFill } from "remotion";
import { useWords } from "../../components/Lyric";
import { color, font } from "../../config";
import { clamp, ease, progress, tween } from "../../lib/motion";
import { beatAt } from "../../lib/song";
import { pump, withAlpha } from "./fx";
import { ghostText, slamIn, wordHeat, YouBloom, youText, type BlockProps } from "./hookParts";
import { fitSize, textAdvance } from "./metrics";

const ROWS = 10;
const ROW_HEIGHT = 192;
const WALL_SIZE = 230;
const WALL_WDTH = 62;
const PANEL_WIDTH = 920;
const CYCLE = textAdvance("ALONE ", WALL_WDTH) * WALL_SIZE;
const WALL_TEXT = "ALONE ".repeat(4);

export const HookWall = ({ block, look }: BlockProps) => {
  const { t, words } = useWords(block.id);
  const beat = beatAt(t);
  const tick = beat.index + ease("expo.out")(clamp(beat.since / 0.3));
  const current = words.reduce((found, word) => (word.on ? word.index : found), -1);
  const shown = words[Math.max(0, current)];
  const text = shown.w.toUpperCase();
  const isYou = current === words.length - 1;
  const heat = pump(t);
  const panelHeight = isYou ? tween(shown.age, 0, 0.25, 540, 800, "expo.out") : 540;
  const edge = isYou ? look.palette.you : look.palette.fg;
  const wdth = 84 - 22 * heat;
  const size = fitSize(text, PANEL_WIDTH, wdth, 0.01);
  const sinceStart = t - block.start;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: ROWS }, (_, row) => {
        const direction = row % 2 ? 1 : -1;
        const travel = tick * (CYCLE / 4) * (1 + (row % 3) * 0.5);
        const shift = ((travel % CYCLE) + CYCLE) % CYCLE;
        const distance = Math.abs(row - (ROWS - 1) / 2);
        const stroke = look.theme.warm && row % 3 === 0 ? color.warm : look.palette.mute;
        return (
          <div
            key={row}
            style={{
              position: "absolute",
              left: 0,
              top: row * ROW_HEIGHT,
              width: 1080 + CYCLE,
              height: ROW_HEIGHT,
              whiteSpace: "nowrap",
              fontFamily: font.display,
              fontWeight: 900,
              fontSize: WALL_SIZE,
              lineHeight: `${ROW_HEIGHT}px`,
              fontVariationSettings: `'wdth' ${WALL_WDTH}`,
              color: withAlpha(stroke, 0.08 + 0.22 * heat),
              WebkitTextStroke: `2px ${stroke}`,
              opacity: progress(sinceStart, distance * 0.03, 0.15) * (0.95 - distance * 0.08),
              transform: `translateX(${direction > 0 ? shift - CYCLE : -shift}px) scaleY(${1 + heat * 0.08})`,
            }}
          >
            {WALL_TEXT}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1080,
          top: 960 - panelHeight / 2,
          height: panelHeight,
          background: look.palette.bg,
          borderTop: `4px solid ${edge}`,
          borderBottom: `4px solid ${edge}`,
          boxShadow: isYou ? `0 0 70px ${withAlpha(look.palette.you, 0.55)}` : undefined,
        }}
      />
      {isYou && <YouBloom look={look} age={shown.age} x={540} y={1010} radius={640} />}
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 960 - panelHeight / 2 + 22,
          fontFamily: font.mono,
          fontSize: 24,
          letterSpacing: "0.18em",
          color: look.palette.mute,
        }}
      >
        {`${Math.max(0, current) + 1}/${words.length}`}
      </div>
      {isYou && (
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 1080,
            top: 960 - panelHeight / 2 + 70,
            textAlign: "center",
            fontFamily: font.serif,
            fontStyle: "italic",
            fontSize: 140,
            lineHeight: 1,
            color: look.palette.fg,
            opacity: tween(shown.age, 0, 0.2, 0, 1, "none"),
          }}
        >
          {words[current - 1].w}
        </div>
      )}
      <div
        key={current}
        style={{
          position: "absolute",
          left: (1080 - PANEL_WIDTH) / 2,
          width: PANEL_WIDTH,
          top: 960 + (isYou ? 50 : 0) - size / 2,
          height: size,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1,
          fontVariationSettings: `'wdth' ${wdth}`,
          color: look.palette.fg,
          ...(current >= 0 ? { ...slamIn(shown.age, 50), ...(isYou ? youText(look, shown.age) : wordHeat(look, shown.age)) } : ghostText(look)),
        }}
      >
        {[...text].map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
