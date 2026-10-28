import { AbsoluteFill, Img, staticFile } from "remotion";
import { useWords } from "../components/Lyric";
import { color, font, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { clamp, ease } from "../lib/motion";
import { beatAt, pulse } from "../lib/song";
import { slamIn } from "./verse1/entrance";
import { padded } from "./verse1/format";
import { Mono } from "./verse1/Mono";

const WINDOW_X = 585;
const WINDOW_WIDTH = 262;
const CHILD_SCALE = WINDOW_WIDTH / WIDTH;
const WINDOW = { x: WINDOW_X, y: 540, width: WINDOW_WIDTH, height: CHILD_SCALE * HEIGHT };
const FIXED_POINT = { x: WINDOW.x / (1 - CHILD_SCALE), y: WINDOW.y / (1 - CHILD_SCALE) };
const DEPTH = 6;
const YEARS = 6;

const mullion = { position: "absolute", background: color.ink, opacity: 0.7 } as const;

const Room = ({ depth, fade }: { depth: number; fade: number }) => (
  <div style={{ position: "absolute", inset: 0 }}>
    <Img src={staticFile("plates/room.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    {depth > 0 && (
      <>
        <div
          style={{
            position: "absolute",
            left: WINDOW.x,
            top: WINDOW.y,
            width: WINDOW.width,
            height: WINDOW.height,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, width: WIDTH, height: HEIGHT, transformOrigin: "0 0", transform: `scale(${CHILD_SCALE})` }}>
            <Room depth={depth - 1} fade={1} />
          </div>
          <div style={{ ...mullion, left: WINDOW.width * 0.47, top: 0, width: 5, height: WINDOW.height, opacity: 0.7 * fade }} />
          <div style={{ ...mullion, left: 0, top: WINDOW.height * 0.33, width: WINDOW.width, height: 5, opacity: 0.7 * fade }} />
        </div>
        <div
          style={{
            position: "absolute",
            left: WINDOW.x - 3,
            top: WINDOW.y - 3,
            width: WINDOW.width + 6,
            height: WINDOW.height + 6,
            boxSizing: "border-box",
            border: `3px solid ${color.paper}`,
            opacity: fade,
          }}
        />
      </>
    )}
  </div>
);

export const Rooms = () => {
  const { t, from } = useScene();
  const { words } = useWords(3);
  const beat = beatAt(t);
  const pushes = beat.index - beatAt(from + 0.01).index;
  const dive = ease("expo.out")(clamp(beat.since / 0.5));
  const zoom = Math.pow(1 / CHILD_SCALE, dive);
  const roll = (pushes % 2 === 0 ? -1 : 1) * 1.4 * (1 - dive);
  const kick = pulse(t);
  const year = Math.min(YEARS, pushes + 1);
  const [count, unit, joiner, whisper, place] = words;

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ filter: "grayscale(1) brightness(1.9) contrast(1.15)" }}>
        <AbsoluteFill
          style={{
            transformOrigin: `${FIXED_POINT.x}px ${FIXED_POINT.y}px`,
            transform: `scale(${zoom}) rotate(${roll}deg)`,
          }}
        >
          <Room depth={DEPTH} fade={1 - dive} />
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: color.paper, opacity: kick * 0.16 }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${color.ink} 0%, transparent 24%, transparent 70%, ${color.ink} 100%)`, opacity: 0.85 }} />
      <Mono size={30} tint={color.paper} style={{ position: "absolute", left: 72, top: 300, transformOrigin: "0% 50%", transform: `scale(${1 + kick * 0.12})` }}>
        YEAR {padded(year, 2)}
      </Mono>
      <Mono size={30} style={{ position: "absolute", right: 72, top: 300 }}>
        ROOM {padded(pushes + 1, 2)}
      </Mono>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 330,
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 1020,
          lineHeight: 0.8,
          fontVariationSettings: "'wdth' 62",
          color: color.paper,
          transformOrigin: "30% 50%",
          ...(count.on ? slamIn(count.age, 1.35) : { opacity: 0.1, color: color.smoke }),
        }}
      >
        6
      </div>
      <div
        style={{
          position: "absolute",
          right: 72,
          top: 350,
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 170,
          lineHeight: 0.85,
          fontVariationSettings: "'wdth' 62",
          color: color.paper,
          textAlign: "right",
          ...(unit.on ? slamIn(unit.age) : { opacity: 0 }),
        }}
      >
        {unit.w.toUpperCase()}
      </div>
      <div
        style={{
          position: "absolute",
          right: 72,
          top: 480,
          fontFamily: font.serif,
          fontStyle: "italic",
          fontSize: 96,
          color: color.ash,
          ...(joiner.on ? slamIn(joiner.age, 1.3) : { opacity: 0 }),
        }}
      >
        {joiner.w}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 1190,
          fontFamily: font.serif,
          fontStyle: "italic",
          fontSize: 132,
          lineHeight: 1,
          color: color.ash,
          ...(whisper.on
            ? { opacity: ease("power2.out")(clamp(whisper.age / 0.5)), filter: `blur(${(1 - ease("power2.out")(clamp(whisper.age / 0.5))) * 10}px)` }
            : { opacity: 0 }),
        }}
      >
        {whisper.w}
      </div>
      <div
        style={{
          position: "absolute",
          left: 66,
          top: 1290,
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 360,
          lineHeight: 0.85,
          fontVariationSettings: "'wdth' 62",
          color: color.paper,
          whiteSpace: "nowrap",
          ...(place.on ? slamIn(place.age, 1.5) : { opacity: 0 }),
        }}
      >
        {place.w.toUpperCase()}
      </div>
    </AbsoluteFill>
  );
};
