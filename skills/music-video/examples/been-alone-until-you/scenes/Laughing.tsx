import { AbsoluteFill } from "remotion";
import { useWords } from "../components/Lyric";
import { color, font, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, noise, progress, rand, tween } from "../lib/motion";
import { BEAT, beatsBetween, nearestBeat, pulse } from "../lib/song";
import { Bubble, TypedBubble, TypingDots, type BubbleTone } from "./verse2/Bubble";

const REPLY_CENTER = { x: WIDTH / 2, y: 930 } as const;
const REPLY_LINES = [[0, 1], [2, 3], [4], [5]];
const COLUMNS = 5;
const ROWS = 8;
const BURST_TOTALS = [2, 4, 8, 13, 20, 30, 42];
const LABELS = ["HA", "HA HA", "HAHA", "HA!", "HAHAHA", "HA HA!"];
const TONES: BubbleTone[] = ["you", "you", "you", "you", "hi", "hi", "me"];

type Spec = { x: number; y: number; size: number; rotation: number; label: string; tone: BubbleTone; burst: number };

const makeSpecs = (): Spec[] => {
  const cells = Array.from({ length: COLUMNS * ROWS }, (_, i) => {
    const x = ((i % COLUMNS) + 0.5 + (rand(i + 1) - 0.5) * 0.7) * (WIDTH / COLUMNS);
    const y = (Math.floor(i / COLUMNS) + 0.5 + (rand(i + 2) - 0.5) * 0.7) * (HEIGHT / ROWS);
    return { i, x, y, order: Math.hypot(x - REPLY_CENTER.x, (y - REPLY_CENTER.y) * 0.7) + rand(i + 3) * 380 };
  }).filter(({ x, y }) => Math.abs(x - REPLY_CENTER.x) > 280 || Math.abs(y - REPLY_CENTER.y) > 260);
  return cells
    .sort((a, b) => a.order - b.order)
    .slice(0, BURST_TOTALS[BURST_TOTALS.length - 1])
    .map(({ i, x, y }, rank) => ({
      x,
      y,
      size: 74 + rand(i + 4) * 70,
      rotation: (rand(i + 5) - 0.5) * 34,
      label: LABELS[Math.floor(rand(i + 6) * LABELS.length)],
      tone: TONES[Math.floor(rand(i + 7) * TONES.length)],
      burst: BURST_TOTALS.findIndex((total) => rank < total),
    }));
};

const specs = makeSpecs();

export const Laughing = () => {
  const { t, from, to } = useScene();
  const { words } = useWords(21);
  const bursts = beatsBetween(nearestBeat(from), to - BEAT * 2);
  const flyAt = to - BEAT;
  const bump = pulse(t);
  const popAt = words[0].start;
  const widen = tween(t, popAt, 0.34, 0, 1, "back.out(1.7)");
  const laugh = progress(t, popAt, 1.2);
  const ringAge = t - (bursts.filter((beat) => beat <= t).at(-1) ?? from);
  const shakeX = noise(t * 38, 1) * bump * 12;
  const shakeY = noise(t * 38, 2) * bump * 12;
  const replyFly = ease("power3.in")(progress(t, flyAt + 0.1, 0.38));

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 50%, ${color.accentDeep}, transparent 75%)`,
          opacity: tween(t, from, 3, 0.35, 1, "none"),
        }}
      />
      <AbsoluteFill style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}>
        <div
          style={{
            position: "absolute",
            left: REPLY_CENTER.x - 360,
            top: REPLY_CENTER.y - 360,
            width: 720,
            height: 720,
            borderRadius: "50%",
            border: `5px solid ${color.accentHi}`,
            opacity: (1 - progress(ringAge, 0, 0.4)) * 0.8,
            transform: `scale(${mix(0.5, 2.1, ease("expo.out")(progress(ringAge, 0, 0.4)))})`,
          }}
        />

        {specs.map((spec, index) => {
          const spawn = bursts[spec.burst];
          if (spawn === undefined || t < spawn) return null;
          const entrance = ease("expo.out")(progress(t, spawn, 0.42));
          const landed = progress(t, spawn + 0.2, 0.1);
          const fly = ease("power3.in")(progress(t, flyAt + (1 - spec.y / HEIGHT) * 0.1, 0.38));
          const x = mix(REPLY_CENTER.x, spec.x, entrance);
          const y = mix(REPLY_CENTER.y, spec.y, entrance) - fly * (HEIGHT + 500);
          const scale = tween(t, spawn, 0.42, 0.1, 1, "back.out(2.4)") * (1 + bump * 0.07 * landed);
          const rotation = mix(spec.rotation * 4, spec.rotation, entrance);
          return (
            <Bubble
              key={index}
              side={index % 2 === 0 ? "in" : "out"}
              tone={spec.tone}
              radius={spec.size * 0.62}
              style={{
                position: "absolute",
                left: x,
                top: y,
                padding: `${spec.size * 0.2}px ${spec.size * 0.46}px ${spec.size * 0.26}px`,
                fontFamily: font.display,
                fontSize: spec.size,
                fontWeight: 900,
                fontVariationSettings: "'wdth' 84",
                lineHeight: 1,
                whiteSpace: "nowrap",
                transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
              }}
            >
              {spec.label}
            </Bubble>
          );
        })}

        <div
          style={{
            position: "absolute",
            left: REPLY_CENTER.x,
            top: REPLY_CENTER.y,
            transform: `translate(-50%, calc(-50% - ${replyFly * (HEIGHT + 500)}px)) rotate(${noise(t * 26, 4) * 2.2 * Math.max(laugh, 0.25)}deg) scale(${1 + bump * 0.03})`,
          }}
        >
          {t < popAt ? (
            <Bubble side="out" tone="paper" radius={96} style={{ width: 500, height: 270, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TypingDots t={t} size={56} tint={color.ink} />
            </Bubble>
          ) : (
            <TypedBubble
              side="out"
              tone="paper"
              radius={96}
              words={words}
              lines={REPLY_LINES}
              fontSize={132}
              stretch={74}
              weight={900}
              centered
              padding={[70, 70, 82]}
              tintOf={(word) => (word.index === words.length - 1 ? color.accent : color.ink)}
              style={{ width: mix(500, 880, widen) }}
            />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
