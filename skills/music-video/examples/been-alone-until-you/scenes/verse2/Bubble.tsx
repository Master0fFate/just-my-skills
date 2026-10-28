import type { CSSProperties, ReactNode } from "react";
import type { WordState } from "../../components/Lyric";
import { color, font } from "../../config";
import { tween } from "../../lib/motion";
import { pulse } from "../../lib/song";
import { typedLetters } from "./kit";

export type BubbleSide = "in" | "out";
export type BubbleTone = "you" | "me" | "paper" | "hi";

const tones: Record<BubbleTone, CSSProperties> = {
  you: { background: color.accent, color: color.paper, boxShadow: `0 0 90px ${color.accent}66` },
  me: { background: color.ink, color: color.paper, boxShadow: `inset 0 0 0 4px ${color.paper}` },
  paper: { background: color.paper, color: color.ink, boxShadow: `0 0 0 10px ${color.ink}` },
  hi: { background: color.accentHi, color: color.ink },
};

type BubbleProps = {
  side: BubbleSide;
  tone: BubbleTone;
  radius?: number;
  style?: CSSProperties;
  children?: ReactNode;
};

export const Bubble = ({ side, tone, radius = 72, style, children }: BubbleProps) => (
  <div
    style={{
      borderRadius: side === "in" ? `0 ${radius}px ${radius}px ${radius}px` : `${radius}px ${radius}px 0 ${radius}px`,
      ...tones[tone],
      ...style,
    }}
  >
    {children}
  </div>
);

type TypingDotsProps = { t: number; size: number; tint: string };

export const TypingDots = ({ t, size, tint }: TypingDotsProps) => (
  <div style={{ display: "flex", gap: size * 0.7, alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: tint,
          transform: `translateY(${-pulse(t - i * 0.08, 10) * size * 0.9}px)`,
        }}
      />
    ))}
  </div>
);

type TypedBubbleProps = {
  side: BubbleSide;
  tone: BubbleTone;
  radius?: number;
  words: WordState[];
  lines: number[][];
  fontSize: number;
  stretch: number;
  weight?: number;
  centered?: boolean;
  padding: [number, number, number];
  tintOf?: (word: WordState) => string | undefined;
  style?: CSSProperties;
};

export const TypedBubble = ({ side, tone, radius, words, lines, fontSize, stretch, weight = 800, centered = false, padding, tintOf, style }: TypedBubbleProps) => {
  const lineHeight = fontSize * 0.94;
  const height = lines.reduce((sum, line) => sum + tween(words[line[0]].age, 0, 0.26, 0, 1, "expo.out") * lineHeight, 0);
  return (
    <Bubble side={side} tone={tone} radius={radius} style={{ padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px`, ...style }}>
      <div
        style={{
          height,
          overflow: "hidden",
          fontFamily: font.display,
          fontSize,
          fontWeight: weight,
          fontVariationSettings: `'wdth' ${stretch}`,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}
      >
        {lines.map((line, row) => (
          <div key={row} style={{ height: lineHeight, display: "flex", justifyContent: centered ? "center" : "flex-start", columnGap: "0.22em", whiteSpace: "pre" }}>
            {line.map((index) => {
              const word = words[index];
              const shown = typedLetters(word);
              return (
                <span key={index} style={{ color: tintOf?.(word) }}>
                  {word.w.slice(0, shown)}
                  <span style={{ opacity: 0 }}>{word.w.slice(shown)}</span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </Bubble>
  );
};
