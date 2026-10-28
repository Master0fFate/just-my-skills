import { AbsoluteFill } from "remotion";
import { useWords } from "../../components/Lyric";
import { color, font } from "../../config";
import { progress, tween } from "../../lib/motion";
import { pulse } from "../../lib/song";
import { pump, withAlpha } from "./fx";
import { ghostText, slamIn, wordHeat, YouBloom, youText, type BlockProps } from "./hookParts";
import { CAP_HEIGHT, fitSize } from "./metrics";

const SEAM = 1010;
const ZONE_TOP = 300;
const ZONE_HEIGHT = SEAM - ZONE_TOP;
const WIDTH = 920;
const GAP = 26;
const YOU_CENTER = 1400;

const Dot = ({ x, tint }: { x: number; tint: string }) => (
  <div
    style={{
      position: "absolute",
      left: x - 11,
      top: SEAM - 11,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: tint,
      boxShadow: `0 0 26px 8px ${withAlpha(tint, 0.7)}`,
    }}
  />
);

export const HookMirror = ({ block, look }: BlockProps) => {
  const { t, words } = useWords(block.id);
  const [been, alone, until, you] = words;
  const wdth = 84 - 22 * pump(t);
  const rows = [been, alone].map((word) => {
    const text = word.w.toUpperCase();
    return { word, text, size: fitSize(text, WIDTH, wdth, 0.01) };
  });
  const aloneCap = rows[1].size * CAP_HEIGHT;
  const beenCap = rows[0].size * CAP_HEIGHT;
  const bottomEdge = ZONE_HEIGHT - 40;
  const centers = [bottomEdge - aloneCap - GAP - beenCap / 2, bottomEdge - aloneCap / 2];
  const reflection = 1 - progress(you.age, 0, 0.15);
  const swing = Math.cos(t * 1.4) * 400 + pulse(t, 8) * 24;
  const renderRows = (mirrored: boolean) =>
    rows.map((row, index) =>
      mirrored && !row.word.on ? null : (
      <div
        key={index}
        style={{
          position: "absolute",
          left: (1080 - WIDTH) / 2,
          width: WIDTH,
          top: centers[index] - row.size / 2,
          height: row.size,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: row.size,
          lineHeight: 1,
          fontVariationSettings: `'wdth' ${wdth}`,
          color: look.palette.fg,
          ...(row.word.on ? { ...slamIn(row.word.age, mirrored ? -40 : 60), ...(mirrored ? {} : wordHeat(look, row.word.age)) } : ghostText(look)),
        }}
      >
        {[...row.text].map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
      ),
    );
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: ZONE_TOP, width: 1080, height: ZONE_HEIGHT }}>{renderRows(false)}</div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: ZONE_TOP,
          width: 1080,
          height: ZONE_HEIGHT,
          transform: `scaleY(-1) skewX(${Math.sin(t * 3) * 1.5}deg)`,
          transformOrigin: "50% 100%",
          opacity: reflection,
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 85%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 85%)",
        }}
      >
        {renderRows(true)}
      </div>
      <div style={{ position: "absolute", left: 0, top: SEAM - 1.5, width: 1080, height: 3, background: look.palette.fg, opacity: 0.85 }} />
      <Dot x={540 + swing} tint={look.theme.warm ? color.warm : look.palette.fg} />
      <Dot x={540 - swing} tint={color.accent} />
      <div
        style={{
          position: "absolute",
          left: 72,
          top: SEAM + 70,
          fontFamily: font.serif,
          fontStyle: "italic",
          fontSize: 190,
          lineHeight: 1,
          color: look.palette.fg,
          ...(until.on
            ? { opacity: tween(until.age, 0, 0.1, 0, 1, "none"), translate: `${tween(until.age, 0, 0.4, -120, 0, "expo.out")}px 0` }
            : { color: "transparent", WebkitTextStroke: `1.5px ${withAlpha(color.ash, 0.35)}` }),
        }}
      >
        {until.w}
      </div>
      <YouBloom look={look} age={you.age} x={540} y={YOU_CENTER} radius={620} />
      <div
        style={{
          position: "absolute",
          left: (1080 - WIDTH) / 2,
          width: WIDTH,
          top: YOU_CENTER - fitSize("YOU", WIDTH, wdth, 0.01) / 2,
          height: fitSize("YOU", WIDTH, wdth, 0.01),
          display: "flex",
          justifyContent: "space-between",
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: fitSize("YOU", WIDTH, wdth, 0.01),
          lineHeight: 1,
          fontVariationSettings: `'wdth' ${wdth}`,
          color: look.palette.fg,
          ...(you.on ? { ...slamIn(you.age, 90), ...youText(look, you.age) } : ghostText(look)),
        }}
      >
        {[...you.w.toUpperCase()].map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
