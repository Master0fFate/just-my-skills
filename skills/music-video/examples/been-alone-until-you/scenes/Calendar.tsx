import { AbsoluteFill } from "remotion";
import { useWords } from "../components/Lyric";
import { color, font } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, progress } from "../lib/motion";
import { beats, pulse } from "../lib/song";
import { slamIn } from "./verse1/entrance";
import { grouped } from "./verse1/format";
import { Mono } from "./verse1/Mono";
import { scribble } from "./verse1/scribble";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const ROW_WORDS = [[0], [1], [2], [3], [4, 5], [6], [7]];
const FIRST_DAY = 2184;
const TOP = 372;
const ROW = 180;
const STRIKE_TIME = 0.16;
const FALL_DELAY = 0.1;
const FALL_STAGGER = 0.02;
const FALL_GRAVITY = 17000;

const strikeTimes = (starts: number[]) => {
  let previous = -Infinity;
  return ROW_WORDS.map((indices) => {
    const ready = starts[indices[indices.length - 1]] + 0.02;
    const next = beats.find((beat) => beat >= ready && beat > previous + 0.1) ?? ready;
    previous = next;
    return next;
  });
};

export const Calendar = () => {
  const { t } = useScene();
  const { words } = useWords(6);
  const kick = pulse(t);
  const strikes = strikeTimes(words.map((word) => word.start));
  const struck = strikes.filter((time) => t >= time).length;
  const fallStart = strikes[strikes.length - 1] + FALL_DELAY;

  const fall = (index: number) => {
    const age = Math.max(0, t - fallStart - (DAYS.length - index) * FALL_STAGGER);
    return { y: 0.5 * FALL_GRAVITY * age * age, rotate: (index % 2 === 0 ? 1 : -1) * age * 22 };
  };

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${1 + kick * 0.012})` }}>
        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            top: 296,
            display: "flex",
            justifyContent: "space-between",
            transform: `translateY(${fall(-1).y}px)`,
          }}
        >
          <Mono size={28} tint={color.paper}>
            Week 313
          </Mono>
          <Mono size={28}>Struck {struck} / 7</Mono>
        </div>
        {DAYS.map((day, row) => {
          const rowWords = ROW_WORDS[row].map((index) => words[index]);
          const grow = ease("power3.out")(progress(t, strikes[row], STRIKE_TIME));
          const { y, rotate } = fall(row);
          const top = TOP + row * ROW;
          return (
            <div
              key={day}
              style={{
                position: "absolute",
                left: 0,
                top,
                width: 1080,
                height: ROW,
                transform: `translateY(${y}px) rotate(${rotate}deg)`,
                transformOrigin: row % 2 === 0 ? "0% 100%" : "100% 100%",
                opacity: 1 - progress(y, 500, 600),
              }}
            >
              <div style={{ position: "absolute", left: 72, right: 72, top: 0, height: 2, background: color.smoke }} />
              <div style={{ opacity: mix(1, 0.3, grow) }}>
                <div
                  style={{
                    position: "absolute",
                    left: 72,
                    top: 34,
                    fontFamily: font.display,
                    fontWeight: 900,
                    fontSize: 84,
                    lineHeight: 0.9,
                    fontVariationSettings: "'wdth' 62",
                    color: color.paper,
                    opacity: 0.8,
                  }}
                >
                  {day}
                </div>
                <Mono size={20} style={{ position: "absolute", left: 74, top: 126 }}>
                  Day {grouped(FIRST_DAY + row)}
                </Mono>
                <div
                  style={{
                    position: "absolute",
                    left: 336,
                    top: 14,
                    display: "flex",
                    gap: "0.22em",
                    fontFamily: font.display,
                    fontWeight: 900,
                    fontSize: 152,
                    lineHeight: 1,
                    fontVariationSettings: "'wdth' 62",
                    color: color.paper,
                    whiteSpace: "nowrap",
                  }}
                >
                  {rowWords.map((word) => (
                    <span key={word.index} style={{ display: "inline-block", ...(word.on ? slamIn(word.age, 1.4) : { opacity: 0.1 }) }}>
                      {word.w.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              <svg width={1080} height={ROW} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
                {scribble(row * 13 + 5, 58, 1022, ROW / 2 + 6, 26).map((d, stroke) => {
                  const drawn = ease("power2.out")(progress(t, strikes[row] + stroke * 0.07, STRIKE_TIME / 2));
                  return (
                    <path
                      key={stroke}
                      d={d}
                      pathLength={1}
                      fill="none"
                      stroke={color.paper}
                      strokeWidth={stroke === 0 ? 11 : 7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="1 1"
                      strokeDashoffset={1 - drawn}
                      opacity={drawn > 0 ? 1 : 0}
                    />
                  );
                })}
              </svg>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
