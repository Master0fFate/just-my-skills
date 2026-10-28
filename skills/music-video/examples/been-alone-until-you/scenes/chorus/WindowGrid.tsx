import { AbsoluteFill } from "remotion";
import { color } from "../../config";
import { useTime } from "../../lib/clock";
import { rand } from "../../lib/motion";
import { barAt, BEAT, beatAt } from "../../lib/song";
import type { Look } from "./theme";

const COLUMNS = 9;
const ROWS = 16;
const CELL = 120;
const WINDOW_WIDTH = 62;
const WINDOW_HEIGHT = 82;
const HISTORY = 6;

const lights = (look: Look) =>
  look.variant === 2 ? [color.warm, color.warm, color.warm, color.paper, color.accent] : [color.accent, color.accent, color.warm, color.warm, color.paper];

const glow = (column: number, row: number, beatIndex: number, since: number, density: number) => {
  let level = 0;
  let born = 0;
  for (let lag = 0; lag < HISTORY; lag++) {
    const eventBeat = beatIndex - lag;
    const roll = rand(column * 131 + row * 977 + eventBeat * 7919);
    if (roll >= density) continue;
    const hold = (1 + rand(roll * 1000 + 5) * 4) * BEAT;
    const age = since + lag * BEAT;
    if (age > hold) continue;
    const value = Math.min(1, age / 0.04) * Math.pow(1 - age / hold, 0.6);
    if (value > level) {
      level = value;
      born = eventBeat;
    }
  }
  return { level, born };
};

export const WindowGrid = ({ look, density, opacity = 1 }: { look: Look; density: number; opacity?: number }) => {
  const t = useTime();
  const beat = beatAt(t);
  const downbeat = barAt(t).beatInBar === 0 ? 2.2 : 1;
  const palette = lights(look);
  const cells = Array.from({ length: COLUMNS * ROWS }, (_, index) => {
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    const { level, born } = glow(column, row, beat.index, beat.since, density * downbeat);
    return { column, row, level, tint: palette[Math.floor(rand(column * 53 + row * 31 + born * 17) * palette.length)] };
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {cells.map(({ column, row, level, tint }) => {
          const x = column * CELL + (CELL - WINDOW_WIDTH) / 2;
          const y = row * CELL + (CELL - WINDOW_HEIGHT) / 2;
          return (
            <g key={`${column}-${row}`}>
              <rect x={x} y={y} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} fill="none" stroke={look.palette.mute} strokeOpacity={0.22} strokeWidth={2} />
              {level > 0.01 && (
                <>
                  <rect x={x - 14} y={y - 14} width={WINDOW_WIDTH + 28} height={WINDOW_HEIGHT + 28} fill={tint} opacity={0.16 * level} />
                  <rect x={x} y={y} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} fill={tint} opacity={0.75 * level} />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
