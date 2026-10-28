import { AbsoluteFill } from "remotion";
import { useWords } from "../../components/Lyric";
import { font } from "../../config";
import { noise } from "../../lib/motion";
import { curve } from "../../lib/song";
import { pump } from "./fx";
import { ghostText, slamIn, wordHeat, YouBloom, youText, type BlockProps } from "./hookParts";
import { CAP_HEIGHT, fitSize } from "./metrics";

const WIDTH = 920;
const GAP = 30;

export const HookStack = ({ block, look }: BlockProps) => {
  const { t, words } = useWords(block.id);
  const rows = words.map((word, index) => {
    const text = word.w.toUpperCase();
    const wdth = 84 - 22 * pump(t - index * 0.05);
    return { word, text, wdth, size: fitSize(text, WIDTH, wdth, 0.01) };
  });
  const heights = rows.map((row) => row.size * CAP_HEIGHT);
  const total = heights.reduce((sum, height) => sum + height, 0) + GAP * (rows.length - 1);
  const centers = heights.map(
    (height, index) => 960 - total / 2 + heights.slice(0, index).reduce((sum, previous) => sum + previous + GAP, 0) + height / 2,
  );
  const last = rows.length - 1;
  return (
    <AbsoluteFill>
      {rows.map((row, index) => {
        const age = row.word.age;
        const isYou = index === last;
        const jitter = noise(t * 40, index) * curve("high", t) * 5;
        return (
          <div key={index}>
            {isYou && <YouBloom look={look} age={age} x={540} y={centers[index]} radius={640} />}
            <div
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
                fontVariationSettings: `'wdth' ${row.wdth}`,
                color: look.palette.fg,
                translate: `${jitter}px 0`,
                ...(row.word.on ? { ...slamIn(age), ...(isYou ? youText(look, age) : wordHeat(look, age)) } : ghostText(look)),
              }}
            >
              {[...row.text].map((char, k) => (
                <span key={k}>{char}</span>
              ))}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
