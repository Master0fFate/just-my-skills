import { AbsoluteFill } from "remotion";
import { useWords } from "../components/Lyric";
import { Plate } from "../components/Plate";
import { color, font, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { ease, mix, progress, tween } from "../lib/motion";
import { beatsBetween, pulse } from "../lib/song";
import { buildCracks, pathOf, roughen, smoothPath } from "./verse1/cracks";
import { grouped } from "./verse1/format";
import { Mono } from "./verse1/Mono";

const ROSE = { x: 541, y: 911 };
const BULB = { x: 535, y: 1086 };
const CRACK_TOTAL = 1284;
const FONT_SIZE = 96;
const TEXT_START = 175;
const CRACKS = buildCracks(ROSE, [-2.75, -2.0, -1.2, -0.45, 0.35, 1.0, 1.85, 2.6], 7);

const TEXT_LINES = [
  {
    id: "crack-line-a",
    words: [0, 1],
    anchors: [
      { x: -60, y: 455 },
      { x: 280, y: 410 },
      { x: 600, y: 470 },
      { x: 900, y: 425 },
      { x: 1140, y: 470 },
    ],
  },
  {
    id: "crack-line-b",
    words: [2, 3],
    anchors: [
      { x: -60, y: 690 },
      { x: 300, y: 735 },
      { x: 620, y: 675 },
      { x: 900, y: 725 },
      { x: 1140, y: 680 },
    ],
  },
  {
    id: "crack-line-c",
    words: [4, 5, 6],
    anchors: [
      { x: -60, y: 1290 },
      { x: 300, y: 1335 },
      { x: 620, y: 1275 },
      { x: 900, y: 1330 },
      { x: 1140, y: 1285 },
    ],
  },
].map((entry, i) => ({
  ...entry,
  smooth: smoothPath(entry.anchors),
  rough: pathOf(roughen(31 + i * 7, entry.anchors, 26, 5)),
}));

const schedule = (starts: number[]) => {
  const times: { start: number; end: number }[] = [];
  let mains = 0;
  CRACKS.forEach((crack) => {
    if (crack.parent < 0) {
      const start = starts[Math.min(mains++, starts.length - 1)];
      times.push({ start, end: start + 0.7 });
    } else {
      const parent = times[crack.parent];
      const start = mix(parent.start, parent.end, crack.at);
      times.push({ start, end: start + 0.36 });
    }
  });
  return times;
};

const crackPaths = CRACKS.map((crack) => pathOf(crack.points));

const Fissure = ({ d, width, grow }: { d: string; width: number; grow: number }) => (
  <g opacity={grow > 0 ? 1 : 0} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} pathLength={1} stroke={color.paper} strokeOpacity={0.45} strokeWidth={width} strokeDasharray="1 1" strokeDashoffset={1 - grow} transform="translate(2.5 3)" />
    <path d={d} pathLength={1} stroke={color.ink} strokeWidth={width} strokeDasharray="1 1" strokeDashoffset={1 - grow} />
  </g>
);

export const Ceiling = () => {
  const { t, from, to, local, duration, progress: sceneProgress } = useScene();
  const kick = pulse(t);
  const times = schedule([from - 0.3, ...beatsBetween(from + 0.1, to)]);
  const counter = Math.floor(CRACK_TOTAL * ease("power2.out")(progress(local, 0, duration * 0.96)));
  const zoom = mix(1, 1.1, ease("power1.inOut")(sceneProgress)) * (1 + kick * 0.022);

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ transformOrigin: `${BULB.x}px ${BULB.y}px`, transform: `scale(${zoom})` }}>
        <Plate name="ceiling" zoom={[1, 1]} saturation={0} exposure={0.8} contrast={1.2} tintAmount={0} />
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at ${BULB.x}px ${BULB.y}px, ${color.paper} 0%, rgba(242,241,238,0.5) 10%, transparent 30%)`,
            opacity: 0.15 + kick * 0.6,
            mixBlendMode: "screen",
          }}
        />
        <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
          <defs>
            {TEXT_LINES.map((entry) => (
              <path key={entry.id} id={entry.id} d={entry.smooth} />
            ))}
          </defs>
          {CRACKS.map((crack, i) => (
            <Fissure key={i} d={crackPaths[i]} width={crack.width} grow={ease("power2.out")(progress(t, times[i].start, times[i].end - times[i].start))} />
          ))}
          <TextCracks />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${color.ink} 0%, transparent 22%, transparent 74%, ${color.ink} 100%)`, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 72, bottom: 290 }}>
        <Mono size={26} tint={color.ash}>
          Cracks counted
        </Mono>
        <div
          style={{
            fontFamily: font.display,
            fontWeight: 900,
            fontSize: 150,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            fontVariationSettings: "'wdth' 62",
            color: color.paper,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {grouped(counter)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TextCracks = () => {
  const ceiling = useWords(4);
  return (
    <>
      {TEXT_LINES.map((entry) => {
        const words = entry.words.map((index) => ceiling.words[index]);
        const first = words[0];
        const last = words[words.length - 1];
        const grow = ease("none")(progress(ceiling.t, first.start - 0.12, last.end - first.start + 0.24));
        return (
          <g key={entry.id}>
            <Fissure d={entry.rough} width={5} grow={grow} />
            <text
              style={{
                fontFamily: font.display,
                fontWeight: 900,
                fontSize: FONT_SIZE,
                fontVariationSettings: "'wdth' 62",
                letterSpacing: "0.005em",
                wordSpacing: "0.2em",
                fill: color.ink,
                textTransform: "uppercase",
              }}
            >
              <textPath href={`#${entry.id}`} startOffset={TEXT_START}>
                {words.map((word) => (
                  <tspan
                    key={word.index}
                    fillOpacity={word.on ? tween(word.age, 0, 0.08, 0, 1, "none") : 0.07}
                    fontSize={word.on ? tween(word.age, 0, 0.22, FONT_SIZE * 1.3, FONT_SIZE, "expo.out") : FONT_SIZE}
                  >
                    {word.w}{" "}
                  </tspan>
                ))}
              </textPath>
            </text>
          </g>
        );
      })}
    </>
  );
};
