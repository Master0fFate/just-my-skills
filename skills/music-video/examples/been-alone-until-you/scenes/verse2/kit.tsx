import type { CSSProperties, ReactNode } from "react";
import { color, font, HEIGHT, WIDTH } from "../../config";
import type { WordState } from "../../components/Lyric";
import { clamp, noise, rand } from "../../lib/motion";

type MonoProps = { children: ReactNode; size?: number; tint?: string; style?: CSSProperties };

export const Mono = ({ children, size = 26, tint = color.ash, style }: MonoProps) => (
  <div
    style={{
      fontFamily: font.mono,
      fontSize: size,
      fontWeight: 500,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      color: tint,
      ...style,
    }}
  >
    {children}
  </div>
);

export const typedLetters = (word: WordState) =>
  word.on ? Math.ceil(word.w.length * clamp(word.age / Math.max(0.12, (word.end - word.start) * 0.55))) : 0;

type MotesProps = { t: number; count: number; seed: number; tint: string; speed?: number };

export const Motes = ({ t, count, seed, tint, speed = 26 }: MotesProps) => {
  const span = HEIGHT + 240;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const size = 3 + rand(i + seed * 31) * 7;
        const rise = speed * (0.5 + rand(i + seed * 57));
        const y = HEIGHT + 120 - ((t * rise + rand(i + seed * 83) * span) % span);
        const x = rand(i + seed * 101) * WIDTH + noise(t * 0.35 + i, seed) * 70;
        const twinkle = 0.35 + 0.65 * Math.abs(noise(t * 0.8 + i * 3.1, seed + 7));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: tint,
              opacity: twinkle,
              boxShadow: `0 0 ${size * 4}px ${tint}`,
            }}
          />
        );
      })}
    </>
  );
};
