import type { CSSProperties } from "react";
import { color, font } from "../config";
import { useTime } from "../lib/clock";
import { ease, progress, tween } from "../lib/motion";
import { line, type Word } from "../lib/song";

export type WordState = Word & { index: number; age: number; on: boolean; active: boolean; p: number };

export const useWords = (id: number) => {
  const t = useTime();
  const entry = line(id);
  const words: WordState[] = entry.words.map((word, index) => ({
    ...word,
    index,
    age: t - word.start,
    on: t >= word.start,
    active: t >= word.start && t < word.end,
    p: progress(t, word.start, word.end - word.start),
  }));
  return { t, line: entry, words };
};

type Mode = "pop" | "rise" | "slam" | "blur" | "type";

type LyricProps = {
  id: number;
  mode?: Mode;
  size?: number;
  family?: keyof typeof font;
  weight?: number;
  stretch?: number;
  tint?: string;
  ghost?: number;
  upper?: boolean;
  italic?: boolean;
  align?: CSSProperties["textAlign"];
  stack?: boolean;
  lead?: number;
  hold?: number;
  exit?: number;
  style?: CSSProperties;
  wordStyle?: (word: WordState) => CSSProperties;
};

const enter = (mode: Mode, age: number): CSSProperties => {
  switch (mode) {
    case "pop":
      return {
        opacity: tween(age, 0, 0.08, 0, 1, "none"),
        transform: `scale(${tween(age, 0, 0.32, 1.45, 1, "back.out(2.2)")})`,
        filter: `blur(${tween(age, 0, 0.2, 10, 0, "power2.out")}px)`,
      };
    case "slam":
      return {
        opacity: tween(age, 0, 0.04, 0, 1, "none"),
        transform: `scale(${tween(age, 0, 0.22, 2.6, 1, "expo.out")}) rotate(${tween(age, 0, 0.3, -6, 0, "expo.out")}deg)`,
      };
    case "blur":
      return {
        opacity: tween(age, 0, 0.35, 0, 1, "power2.out"),
        filter: `blur(${tween(age, 0, 0.45, 18, 0, "power3.out")}px)`,
        letterSpacing: `${tween(age, 0, 0.6, 0.25, 0, "expo.out")}em`,
      };
    case "rise":
    case "type":
      return {};
  }
};

export const Lyric = ({
  id,
  mode = "pop",
  size = 120,
  family = "display",
  weight = 800,
  stretch = 100,
  tint = color.paper,
  ghost = 0,
  upper = true,
  italic = false,
  align = "center",
  stack = false,
  lead = 0,
  hold = 0.25,
  exit = 0.3,
  style,
  wordStyle,
}: LyricProps) => {
  const { t, line: entry, words } = useWords(id);
  const out = progress(t, entry.end + hold, exit);
  const exitEase = ease("power2.in")(out);
  return (
    <div
      style={{
        fontFamily: font[family],
        fontSize: size,
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        fontVariationSettings: family === "display" ? `'wdth' ${stretch}` : undefined,
        color: tint,
        textAlign: align,
        lineHeight: 0.92,
        textTransform: upper ? "uppercase" : "none",
        display: "flex",
        flexDirection: stack ? "column" : "row",
        flexWrap: "wrap",
        justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
        alignItems: stack ? (align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center") : "baseline",
        columnGap: "0.24em",
        rowGap: "0.04em",
        opacity: 1 - exitEase,
        filter: out > 0 ? `blur(${exitEase * 14}px)` : undefined,
        ...style,
      }}
    >
      {words.map((word) => {
        const age = word.age + lead;
        const visible = age >= 0;
        const custom = wordStyle?.(word);
        if (mode === "rise") {
          return (
            <span key={word.index} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${visible ? tween(age, 0, 0.42, 105, 0, "expo.out") : 105}%)`,
                  opacity: visible ? 1 : ghost,
                  ...custom,
                }}
              >
                {word.w}
              </span>
            </span>
          );
        }
        if (mode === "type") {
          const shown = visible ? Math.ceil(word.w.length * Math.min(1, age / Math.max(0.08, (word.end - word.start) * 0.6))) : 0;
          return (
            <span key={word.index} style={{ display: "inline-block", whiteSpace: "pre", ...custom }}>
              <span>{word.w.slice(0, shown)}</span>
              <span style={{ opacity: ghost }}>{word.w.slice(shown)}</span>
            </span>
          );
        }
        return (
          <span
            key={word.index}
            style={{
              display: "inline-block",
              willChange: "transform",
              ...(visible ? enter(mode, age) : { opacity: ghost }),
              ...custom,
            }}
          >
            {word.w}
          </span>
        );
      })}
    </div>
  );
};
