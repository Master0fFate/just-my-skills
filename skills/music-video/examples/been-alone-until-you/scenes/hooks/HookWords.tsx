import { progress, tween } from "../../lib/motion";
import { line } from "../../lib/song";
import { Anchor, Display, Serif, violetGlow, youStroke } from "./Display";
import { FULL_WIDTH, fitSize, TALL, WIDE } from "./type";

type HookWordProps = { word: string; age: number; exit: number; index: number };

const HookWord = ({ word, age, exit, index }: HookWordProps) => {
  if (age < 0 || exit >= 1) return null;
  const isYou = word === "YOU";
  const fromNear = index % 2 === 1;
  const scale = tween(age, 0, 0.26, fromNear ? 2.2 : 0.18, 1, "expo.out") * (1 + exit * 0.5);
  const opacity = tween(age, 0, 0.04, 0, 1, "none") * (1 - exit);
  if (word === "UNTIL") {
    return (
      <Anchor
        transform={`translateY(${tween(age, 0, 0.3, 90, 0, "expo.out")}px) scale(${1 + exit * 0.5})`}
        opacity={opacity}
        style={{ filter: `blur(${tween(age, 0, 0.3, 16, 0, "power3.out")}px)` }}
      >
        <Serif text="until" size={420} />
      </Anchor>
    );
  }
  const stretch = tween(age, 0, 0.2, WIDE, TALL, "expo.out");
  return (
    <Anchor transform={`scale(${scale}) rotate(${tween(age, 0, 0.3, fromNear ? 5 : -5, 0, "expo.out")}deg)`} opacity={opacity}>
      <Display
        text={word}
        size={fitSize(word, FULL_WIDTH, stretch)}
        stretch={stretch}
        style={isYou ? { WebkitTextStroke: youStroke, textShadow: violetGlow(tween(age, 0, 0.6, 1.8, 1, "power3.out")) } : undefined}
      />
    </Anchor>
  );
};

type LineWordsProps = { id: number; t: number; hold?: number; omit?: number };

export const LineWords = ({ id, t, hold = 0.35, omit }: LineWordsProps) => {
  const entry = line(id);
  return (
    <>
      {entry.words.map((word, index) => {
        if (index === omit) return null;
        const next = entry.words[index + 1];
        const exit = next ? progress(t, next.start, 0.08) : progress(t, entry.end + hold, 0.15);
        return <HookWord key={index} word={word.w.toUpperCase()} age={t - word.start} exit={exit} index={index} />;
      })}
    </>
  );
};
