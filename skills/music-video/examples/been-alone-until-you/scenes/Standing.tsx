import { AbsoluteFill } from "remotion";
import { useWords, type WordState } from "../components/Lyric";
import { Plate } from "../components/Plate";
import { color, font } from "../config";
import { useScene } from "../lib/clock";
import { mix, noise, tween } from "../lib/motion";
import { beatAt, beats, pulse } from "../lib/song";
import { Mono } from "./verse2/kit";

const LYING_ANGLE = 74;

type RowSpec = { words: number[]; size: number; stretch: number; weight: number };

const ROWS: RowSpec[] = [
  { words: [0, 1, 2], size: 112, stretch: 80, weight: 800 },
  { words: [3], size: 198, stretch: 100, weight: 900 },
  { words: [4], size: 220, stretch: 62, weight: 900 },
  { words: [5], size: 286, stretch: 90, weight: 900 },
];

type StandingWordProps = { word: WordState; size: number; stretch: number; weight: number; lift: number };

const StandingWord = ({ word, size, stretch, weight, lift }: StandingWordProps) => {
  const angle = word.on ? tween(word.age, 0, 0.46, LYING_ANGLE, 0, "back.out(1.9)") : LYING_ANGLE;
  const risen = 1 - angle / LYING_ANGLE;
  const isUp = word.index === 5;
  const tint = isUp ? color.accentHi : color.paper;
  return (
    <div style={{ position: "relative", transformStyle: "preserve-3d", margin: `0 ${size * 0.11}px` }}>
      <div
        style={{
          position: "absolute",
          left: "-4%",
          right: "-4%",
          bottom: -size * 0.06,
          height: size * 0.16,
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85), transparent 70%)",
          opacity: 0.35 + risen * 0.65 - lift * 0.7,
          transform: `scale(${1 - lift * 0.35})`,
        }}
      />
      <div
        style={{
          fontFamily: font.display,
          fontSize: size,
          fontWeight: weight,
          fontVariationSettings: `'wdth' ${stretch}`,
          lineHeight: 0.86,
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          color: word.on ? tint : "transparent",
          WebkitTextStroke: word.on ? undefined : `3px ${color.paper}80`,
          transformOrigin: "50% 100%",
          transform: `translateY(${-lift * size * 0.3}px) rotateX(${angle}deg)`,
          textShadow: isUp ? `0 0 ${40 + lift * 40}px ${color.accent}, 0 0 120px ${color.accent}88` : "0 6px 30px rgba(0,0,0,0.6)",
        }}
      >
        {word.w}
      </div>
    </div>
  );
};

export const Standing = () => {
  const { t, progress: sceneProgress } = useScene();
  const { words } = useWords(18);
  const up = words[5];
  const hopStart = beats.find((beat) => beat >= up.start + 0.25) ?? up.start;
  const lift = t >= hopStart ? Math.sin(beatAt(t).phase * Math.PI) : 0;
  const impact = Math.max(...words.map((word) => (word.age > 0.3 ? Math.exp(-(word.age - 0.3) * 16) : 0)));
  const bump = pulse(t);

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <Plate name="counter" zoom={[1.04, 1.12]} origin="50% 62%" exposure={1.25} saturation={0.5} tintAmount={0.22} style={{ transform: `scale(${1 + bump * 0.02})`, transformOrigin: "50% 62%" }} />
      <AbsoluteFill
        style={{
          perspective: 1700,
          perspectiveOrigin: "50% 12%",
          transform: `translate(${noise(t * 30, 3) * impact * 8}px, ${impact * 14}px) scale(${mix(1, 1.04, sceneProgress) + bump * 0.012})`,
          transformOrigin: "50% 60%",
        }}
      >
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", gap: 18, flexDirection: "column", paddingBottom: 808 }}>
          {ROWS.map((row, index) => (
            <div key={index} style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", transformStyle: "preserve-3d", marginTop: row.words.includes(5) ? 56 : 0 }}>
              {row.words.map((wordIndex) => (
                <StandingWord key={wordIndex} word={words[wordIndex]} size={row.size} stretch={row.stretch} weight={row.weight} lift={wordIndex === 5 ? lift : 0} />
              ))}
            </div>
          ))}
        </AbsoluteFill>
      </AbsoluteFill>
      <Mono style={{ position: "absolute", left: 72, top: 1440 }}>Meal for one</Mono>
      <Mono tint={color.paper} style={{ position: "absolute", right: 72, top: 1440 }}>Seats 0</Mono>
    </AbsoluteFill>
  );
};
