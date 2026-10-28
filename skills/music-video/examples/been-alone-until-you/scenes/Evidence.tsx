import { AbsoluteFill } from "remotion";
import { useWords, type WordState } from "../components/Lyric";
import { Plate } from "../components/Plate";
import { color, font, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, noise, progress, tween } from "../lib/motion";
import { beatsBetween, nearestBeat, pulse } from "../lib/song";
import { Mono } from "./verse2/kit";

const ZOOM: [number, number] = [1.06, 1.18];
const ORIGIN = { x: 0.5, y: 0.55 } as const;

const MARKERS = [
  { x: 529, y: 1045, radius: 318 },
  { x: 634, y: 1010, radius: 92 },
  { x: 454, y: 1127, radius: 72 },
  { x: 410, y: 1022, radius: 56 },
  { x: 687, y: 754, radius: 78 },
  { x: 920, y: 958, radius: 62 },
  { x: 384, y: 795, radius: 60 },
];

const CASE_LINE = "CASE #2190 — STATUS: NOTHING";

type MarkerProps = { index: number; x: number; y: number; radius: number; age: number; t: number };

const Marker = ({ index, x, y, radius, age, t }: MarkerProps) => {
  const pop = tween(age, 0, 0.36, 1.9, 1, "back.out(2.2)");
  const ring = progress(age, 0, 0.5);
  const drop = tween(age, 0.06, 0.4, -70, 0, "bounce.out");
  const tagOffset = radius * 0.72;
  const tagLeft = x > WIDTH * 0.72 ? -tagOffset - 66 : tagOffset - 10;
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: age >= 0 ? 1 : 0 }}>
      <div
        style={{
          position: "absolute",
          left: -radius,
          top: -radius,
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          border: `4px solid ${color.accentHi}`,
          opacity: (1 - ring) * 0.9,
          transform: `scale(${mix(0.8, 1.5, ease("expo.out")(ring))})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -radius,
          top: -radius,
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          border: `5px dashed ${color.paper}`,
          transform: `scale(${pop}) rotate(${t * 18 + index * 40}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: tagLeft,
          top: -tagOffset - 82,
          width: 76,
          height: 92,
          background: color.paper,
          clipPath: "polygon(24% 0, 76% 0, 100% 100%, 0 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 12,
          fontFamily: font.mono,
          fontSize: 42,
          fontWeight: 800,
          color: color.ink,
          transform: `translateY(${drop}px)`,
        }}
      >
        {index + 1}
      </div>
    </div>
  );
};

type TapeProps = { words: WordState[]; angle: number; centerY: number; startAge: number };

const Tape = ({ words, angle, centerY, startAge }: TapeProps) => {
  const swing = tween(startAge, 0, 0.5, 1, 0, "back.out(1.5)");
  const enter = ease("expo.out")(progress(startAge, 0, 0.35));
  return (
    <div
      style={{
        position: "absolute",
        left: WIDTH / 2 - 900,
        top: centerY - 85,
        width: 1800,
        height: 170,
        background: color.accent,
        boxShadow: `0 0 60px ${color.accent}88`,
        borderTop: `14px solid ${color.accentDeep}`,
        borderBottom: `14px solid ${color.accentDeep}`,
        clipPath: "polygon(0 8%, 1.2% 0, 100% 0, 98.8% 100%, 0 92%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 44,
        transform: `translateX(${(1 - enter) * (angle < 0 ? -1400 : 1400)}px) rotate(${angle + swing * (angle < 0 ? -34 : 34)}deg)`,
      }}
    >
      {words.map((word) => (
        <span
          key={word.index}
          style={{
            fontFamily: font.display,
            fontWeight: 900,
            fontSize: 140,
            fontVariationSettings: "'wdth' 72",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: color.paper,
            opacity: word.on ? 1 : 0,
            transform: `scale(${word.on ? tween(word.age, 0, 0.24, 1.5, 1, "expo.out") : 1})`,
          }}
        >
          {word.w.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

export const Evidence = () => {
  const { t, from, to, local, progress: sceneProgress } = useScene();
  const { words } = useWords(19);
  const markerBeats = beatsBetween(nearestBeat(from), to).slice(0, MARKERS.length);
  const bump = pulse(t);
  const finalHit = Math.exp(-Math.max(0, t - (to - 0.476)) * 9) * (t >= to - 0.476 ? 1 : 0);
  const typed = Math.min(CASE_LINE.length, Math.floor(local / 0.03));
  const tapeOneStart = words[5].start;
  const tapeTwoStart = words[6].start;

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <Plate name="sink" zoom={ZOOM} origin={`${ORIGIN.x * 100}% ${ORIGIN.y * 100}%`} exposure={1.1} saturation={0.5} tintAmount={0.3} style={{ transform: `scale(${1 + bump * 0.018})` }} />
      <AbsoluteFill style={{ background: color.paper, opacity: bump * 0.1 }} />
      <AbsoluteFill style={{ transform: `translate(${noise(t * 30, 5) * finalHit * 14}px, ${noise(t * 30, 6) * finalHit * 14}px) scale(${mix(1, 1.04, sceneProgress)})` }}>
        <AbsoluteFill style={{ transformOrigin: `${ORIGIN.x * 100}% ${ORIGIN.y * 100}%`, transform: `scale(${mix(ZOOM[0], ZOOM[1], sceneProgress)})` }}>
          {markerBeats.map((beat, index) => (
            <Marker key={index} index={index} {...MARKERS[index]} age={t - beat} t={t} />
          ))}
        </AbsoluteFill>
        <div style={{ position: "absolute", left: 72, right: 72, top: 392, display: "flex", flexWrap: "wrap", columnGap: 30, rowGap: 0 }}>
          {words.slice(0, 4).map((word) => (
            <span
              key={word.index}
              style={{
                fontFamily: font.display,
                fontWeight: 900,
                fontSize: word.index === 3 ? 250 : 160,
                fontVariationSettings: "'wdth' 70",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: color.paper,
                textShadow: "0 4px 40px rgba(0,0,0,0.7)",
                opacity: word.on ? 1 : 0.1,
                transform: word.on ? `scale(${tween(word.age, 0, 0.28, 1.35, 1, "expo.out")})` : undefined,
                transformOrigin: "0 100%",
              }}
            >
              {word.w}
            </span>
          ))}
        </div>
        <span
          style={{
            position: "absolute",
            right: 90,
            top: 1318,
            fontFamily: font.serif,
            fontStyle: "italic",
            fontSize: 150,
            lineHeight: 1,
            color: color.paper,
            opacity: words[4].on ? 1 : 0,
            transform: `translateY(${tween(words[4].age, 0, 0.4, 30, 0, "expo.out")}px)`,
          }}
        >
          {words[4].w}
        </span>
        {t >= tapeOneStart && <Tape words={[words[5]]} angle={-11} centerY={1300} startAge={t - tapeOneStart} />}
        {t >= tapeTwoStart && <Tape words={[words[6], words[7]]} angle={7} centerY={1520} startAge={t - tapeTwoStart} />}
      </AbsoluteFill>
      <Mono tint={color.paper} size={28} style={{ position: "absolute", left: 72, top: 330 }}>
        {CASE_LINE.slice(0, typed)}
      </Mono>
    </AbsoluteFill>
  );
};
