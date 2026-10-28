import { AbsoluteFill } from "remotion";
import { color, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, noise, progress, tween } from "../lib/motion";
import { BEAT, beats, line, pulse } from "../lib/song";
import { Anchor, Display, Serif, violetGlow, youStroke, youTint } from "./hooks/Display";
import { Bloom, Shock, Strobe } from "./hooks/Light";
import { flash, impact } from "./hooks/timing";
import { CAP_HEIGHT, FULL_WIDTH, fitSize, TALL, WIDE } from "./hooks/type";

const ALONE_LETTERS = ["A", "L", "O", "N", "E"];
const LETTER_HOMES = [
  [250, 470],
  [800, 700],
  [290, 960],
  [800, 1230],
  [270, 1470],
] as const;
const LETTER_SIZE = 380;
const LETTER_STAGGER = 0.055;
const YOU_LETTERS = ["Y", "O", "U"];
const YOU_DRIFT = [
  [-1, -0.7],
  [0.15, 1],
  [1, -0.25],
] as const;

const TOWER_WORDS = ["BEEN", "ALONE", "UNTIL", "YOU"];
const TOWER_WIDTH = 870;
const TOWER_GAP = 16;
const towerSizes = TOWER_WORDS.map((word) => fitSize(word, TOWER_WIDTH, TALL));
const towerCaps = towerSizes.map((size) => size * CAP_HEIGHT);
const towerTop = (HEIGHT - towerCaps.reduce((sum, cap) => sum + cap, 0) - TOWER_GAP * (TOWER_WORDS.length - 1)) / 2;
const towerCenters = towerCaps.map((cap, i) => towerTop + towerCaps.slice(0, i).reduce((sum, c) => sum + c + TOWER_GAP, 0) + cap / 2);

const first = line(1);
const second = line(2);
const firstStarts = first.words.map((word) => word.start);
const secondStarts = second.words.map((word) => word.start);
const allStarts = [...firstStarts, ...secondStarts];

const Beacon = ({ width, height, opacity = 1 }: { width: number; height: number; opacity?: number }) => (
  <Anchor opacity={opacity}>
    <div style={{ width, height, background: color.paper }} />
  </Anchor>
);

const Window = ({ t, from }: { t: number; from: number }) => {
  const [been] = first.words;
  if (t >= been.start) return null;
  const closing = ease("expo.out")(progress(t, from, been.start - from));
  return <Beacon width={mix(WIDTH * 1.2, 14, closing)} height={mix(HEIGHT * 1.2, 14, closing)} />;
};

const LoneDot = ({ t, to }: { t: number; to: number }) => {
  const appears = first.end + 0.35;
  const [startsAt] = second.words;
  const closing = to - BEAT;
  const inBreath = t >= appears && t < startsAt.start;
  const afterTower = t >= closing + 0.3;
  if (!inBreath && !afterTower) return null;
  const size = 14 + 12 * impact(t, beats, 9);
  const opacity = inBreath ? progress(t, appears, 0.4) : 1;
  return <Beacon width={size} height={size} opacity={opacity} />;
};

const BeenOne = ({ t }: { t: number }) => {
  const [been, alone] = first.words;
  const age = t - been.start;
  const gone = progress(t, alone.start, 0.1);
  if (age < 0 || gone >= 1) return null;
  const stretch = tween(age, 0, 0.2, TALL, WIDE, "expo.out");
  const scale = tween(age, 0, 0.26, 1.9, 1, "expo.out") * (1 + gone * 1.4);
  return (
    <Anchor transform={`scale(${scale})`} opacity={1 - gone}>
      <Display text="BEEN" size={fitSize("BEEN", FULL_WIDTH, stretch)} stretch={stretch} />
    </Anchor>
  );
};

const AloneLetters = ({ t }: { t: number }) => {
  const [, alone, , you] = first.words;
  const blast = tween(t, you.start, 0.3, 0, 1, "expo.out");
  const fade = 1 - progress(t, first.end + 0.1, 0.9);
  return (
    <>
      {ALONE_LETTERS.map((letter, k) => {
        const age = t - (alone.start + k * LETTER_STAGGER);
        if (age < 0 || fade <= 0) return null;
        const [homeX, homeY] = LETTER_HOMES[k];
        const spread = 1 + (t - alone.start) * 0.05 + blast * 0.9;
        const scale = tween(age, 0, 0.24, 2.6, 1, "expo.out");
        const turn = tween(age, 0, 0.3, k % 2 ? 8 : -8, 0, "expo.out");
        return (
          <Anchor
            key={letter + k}
            x={540 + (homeX - 540) * spread}
            y={960 + (homeY - 960) * spread}
            transform={`scale(${scale}) rotate(${turn}deg)`}
            opacity={mix(1, 0.14, blast) * fade}
          >
            <Display text={letter} size={LETTER_SIZE} stretch={TALL} />
          </Anchor>
        );
      })}
    </>
  );
};

const UntilOne = ({ t }: { t: number }) => {
  const [, , until, you] = first.words;
  const age = t - until.start;
  const gone = progress(t, you.start, 0.08);
  if (age < 0 || gone >= 1) return null;
  return (
    <Anchor
      x={600}
      transform={`translateY(${tween(age, 0, 0.35, 50, 0, "expo.out")}px)`}
      opacity={tween(age, 0, 0.2, 0, 1, "none") * (1 - gone)}
      style={{ filter: `blur(${tween(age, 0, 0.35, 14, 0, "power3.out")}px)` }}
    >
      <Serif text="until" size={210} />
    </Anchor>
  );
};

const YouOne = ({ t }: { t: number }) => {
  const [, , , you] = first.words;
  const age = t - you.start;
  if (age < 0) return null;
  const size = fitSize("YOU", FULL_WIDTH, TALL);
  const drift = ease("power2.inOut")(progress(t, first.end + 0.1, 1.3));
  const fade = 1 - progress(t, first.end + 0.3, 1);
  if (fade <= 0) return null;
  const glow = tween(age, 0, 0.6, 1.8, 1, "power3.out");
  const scale = tween(age, 0, 0.28, 2.1, 1, "expo.out");
  return (
    <>
      <Bloom strength={0.55 * (1 - drift) * tween(age, 0, 0.5, 1.4, 0.6, "power2.out")} radius={800} />
      <Shock age={age} size={220} reach={10} />
      <Anchor transform={`scale(${scale})`} opacity={fade}>
        <div style={{ display: "flex" }}>
          {YOU_LETTERS.map((letter, i) => (
            <Display
              key={letter + i}
              text={letter}
              size={size}
              stretch={TALL}
              tint={youTint(age)}
              style={{
                WebkitTextStroke: youStroke,
                textShadow: violetGlow(glow * (1 - drift)),
                transform: `translate(${YOU_DRIFT[i][0] * drift * 520}px, ${YOU_DRIFT[i][1] * drift * 520}px) scale(${1 - drift * 0.85})`,
              }}
            />
          ))}
        </div>
      </Anchor>
    </>
  );
};

const TowerRow = ({ t, index }: { t: number; index: number }) => {
  const word = TOWER_WORDS[index];
  const start = secondStarts[index];
  const age = t - start;
  if (age < 0) return null;
  const isYou = index === TOWER_WORDS.length - 1;
  const stretch = tween(age, 0, 0.18, WIDE, TALL, "expo.out");
  const stamp = flash(t, [start], 3);
  const settle = 1 + 0.1 * impact(t, [start], 14) + 0.012 * pulse(t);
  const glow = tween(age, 0, 0.7, 2, 1, "power3.out");
  return (
    <>
      {stamp > 0 && (
        <Anchor y={towerCenters[index]}>
          <div style={{ width: TOWER_WIDTH + 36, height: towerCaps[index] + 24, background: color.paper }} />
        </Anchor>
      )}
      <Anchor y={towerCenters[index]} transform={`scaleY(${settle})`}>
        <Display
          text={word}
          size={fitSize(word, TOWER_WIDTH, stretch)}
          stretch={stretch}
          tint={stamp > 0 ? color.ink : isYou ? youTint(age) : color.paper}
          style={isYou && stamp === 0 ? { WebkitTextStroke: youStroke, textShadow: violetGlow(glow) } : undefined}
        />
      </Anchor>
    </>
  );
};

const Tower = ({ t, to }: { t: number; to: number }) => {
  const closing = to - BEAT;
  const youStart = secondStarts[3];
  const squeezeY = tween(t, closing, 0.24, 1, 0.004, "expo.in");
  const squeezeX = tween(t, closing + 0.2, 0.2, 1, 0.012, "expo.in");
  const lit = tween(t - youStart, 0, 0.5, 1.2, 0.75, "power2.out");
  if (squeezeX <= 0.0125) return null;
  return (
    <AbsoluteFill style={{ transform: `scale(${squeezeX}, ${squeezeY})` }}>
      {t >= youStart && <Bloom y={towerCenters[3]} radius={760} strength={0.5 * lit} />}
      {t >= youStart && <Shock age={t - youStart} y={towerCenters[3]} size={240} reach={12} />}
      {TOWER_WORDS.map((word, i) => (
        <TowerRow key={word} t={t} index={i} />
      ))}
    </AbsoluteFill>
  );
};

export const Hook = () => {
  const { t, from, to } = useScene();
  const jolt = impact(t, allStarts, 16);
  const camera = `translate(${noise(t * 22, 3) * 14 * jolt}px, ${noise(t * 22, 4) * 14 * jolt}px) scale(${1 + (t - from) * 0.004 + pulse(t) * 0.012})`;
  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: camera }}>
        <Window t={t} from={from} />
        <BeenOne t={t} />
        <AloneLetters t={t} />
        <UntilOne t={t} />
        <YouOne t={t} />
        <LoneDot t={t} to={to} />
        <Tower t={t} to={to} />
      </AbsoluteFill>
      <Strobe amount={flash(t, [firstStarts[3], secondStarts[3]], 2) * 0.9} />
    </AbsoluteFill>
  );
};
