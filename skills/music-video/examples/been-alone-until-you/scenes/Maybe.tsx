import { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { color, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, progress, rand, tween } from "../lib/motion";
import { line, pulse } from "../lib/song";
import { FlapCell, flapState, STRIP, type FlapStep } from "./verse2/flap";
import { Mono, Motes } from "./verse2/kit";

const CELL_GAP = 8;
const WORD_GAP = 40;
const HERO_ROW = 1;
const MINE_LETTERS = ["M", "I", "N", "E"];

type RowSpec = { words: { text: string; index: number }[]; width: number; height: number };

const ROWS: RowSpec[] = [
  { words: [{ text: "YOU", index: 0 }, { text: "TURNED", index: 1 }, { text: "A", index: 2 }], width: 78, height: 118 },
  { words: [{ text: "MAYBE", index: 3 }], width: 170, height: 255 },
  { words: [{ text: "INTO", index: 4 }], width: 122, height: 183 },
  { words: [{ text: "SOMETHING", index: 5 }], width: 94, height: 141 },
];

type BoardCell = { letter: string; initial: string; program: FlapStep[] };

const scramble = (seed: number) => STRIP[1 + Math.floor(rand(seed) * 26)];

const buildBoard = (from: number, to: number) => {
  const words = line(23).words;
  const mineStart = words[6].start;
  const blankAt = to - 0.4;
  let counter = 0;
  return ROWS.map((row, rowIndex) =>
    row.words.map(({ text, index }) =>
      [...text].map((letter, k): BoardCell => {
        const seed = counter++;
        const program: FlapStep[] = [
          { at: from + 0.02 + seed * 0.009, to: " ", steps: 3, stepDuration: 0.045 },
          { at: words[index].start + k * 0.035, to: letter, steps: 7, stepDuration: 0.042 },
        ];
        if (rowIndex === HERO_ROW && k >= 1 && k <= 3) {
          program.push({ at: mineStart + (k - 1) * 0.07, to: MINE_LETTERS[k], steps: 9, stepDuration: 0.04 });
        }
        if (rowIndex !== HERO_ROW) {
          let at = mineStart + 0.06;
          let interval = 0.16;
          let round = 0;
          while (at < blankAt - 0.1) {
            program.push({ at: at + rand(seed * 17 + round) * 0.04, to: scramble(seed * 29 + round), steps: 4, stepDuration: Math.min(0.04, interval * 0.2) });
            at += interval;
            interval = Math.max(0.05, interval * 0.8);
            round++;
          }
          program.push({ at: blankAt + rand(seed + 5) * 0.12, to: " ", steps: 4, stepDuration: 0.03 });
        }
        return { letter, initial: scramble(seed + 100), program };
      }),
    ),
  );
};

export const Maybe = () => {
  const { t, from, to, local } = useScene();
  const board = useMemo(() => buildBoard(from, to), [from, to]);
  const mineStart = line(23).words[6].start;
  const bump = pulse(t);
  const warm = ease("power2.out")(progress(t, mineStart, 0.7));
  const dropAt = mineStart + 0.42;
  const drop = progress(t, dropAt, 0.55);
  const shift = tween(t, dropAt + 0.12, 0.45, 0, 1, "expo.out");
  const heroRow = ROWS[HERO_ROW];
  const horizon = mix(0.35, 0.8, progress(local, 0, to - from));

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 120% 55% at 50% 108%, ${color.warm}, transparent 70%)`,
          opacity: horizon * (0.5 + bump * 0.12),
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 30% at 50% 50%, ${color.warm}, transparent 70%)`,
          opacity: warm * (0.3 + bump * 0.15),
        }}
      />
      <Motes t={t} count={34} seed={4} tint={color.warm} speed={22} />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${-local * 8}px) scale(${1 + bump * 0.012})`,
        }}
      >
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          {board.map((rowWords, rowIndex) => {
            const row = ROWS[rowIndex];
            const isHero = rowIndex === HERO_ROW;
            return (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  gap: WORD_GAP,
                  transform: isHero ? `translateX(${shift * ((row.width + CELL_GAP) / 2)}px)` : undefined,
                }}
              >
                {rowWords.map((cells, wordIndex) => (
                  <div key={wordIndex} style={{ display: "flex", gap: CELL_GAP }}>
                    {cells.map((cell, cellIndex) => {
                      const state = flapState(cell.initial, cell.program, t);
                      const dropped = isHero && cellIndex === 4;
                      const lit = isHero && warm > 0;
                      return (
                        <FlapCell
                          key={cellIndex}
                          {...state}
                          width={row.width}
                          height={row.height}
                          tint={isHero ? (lit ? color.warm : color.ash) : color.paper}
                          style={
                            dropped && drop > 0
                              ? {
                                  transformOrigin: "0 0",
                                  transform: `translate(${drop * 80}px, ${ease("power2.in")(drop) * (HEIGHT * 0.7)}px) rotate(${drop * 34}deg)`,
                                }
                              : undefined
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 30 + ROWS[0].height + 30 + heroRow.height / 2,
              width: 1000,
              height: heroRow.height + 160,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(ellipse at center, ${color.warm}, transparent 68%)`,
              opacity: warm * (0.28 + bump * 0.1),
              zIndex: -1,
            }}
          />
        </div>
      </AbsoluteFill>
      <Mono tint={color.warm} style={{ position: "absolute", left: 72, top: 330 }}>Departures</Mono>
      <Mono tint={color.warm} style={{ position: "absolute", right: 72, top: 330 }}>Gate 06</Mono>
      <div style={{ position: "absolute", left: 72, top: 384, width: WIDTH - 144, height: 2, background: color.warm, opacity: 0.4 }} />
    </AbsoluteFill>
  );
};
