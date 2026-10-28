import { AbsoluteFill } from "remotion";
import { color } from "../../config";
import { progress, tween } from "../../lib/motion";
import { beatsBetween, line, pulse } from "../../lib/song";
import { Anchor, Display, Serif, violetGlow, youStroke } from "./Display";
import { Bloom, Rays, Shock, Strobe } from "./Light";
import { FULL_WIDTH, fitSize, WIDE } from "./type";

const ZOOM_PEAK = 3.2;
const ZOOM_CURVE = 1.9;
const LETTERS = ["A", "L", "O", "N", "E"];
const LETTER_SIZE = 380;
const LETTER_PITCH = 268;
const CAP_CENTER_SHIFT = 0.0105 * LETTER_SIZE;
const HOLE_WIDTH = 0.411 * LETTER_SIZE;
const LETTER_STAGGER = 0.1;
const OFF_SCREEN_ZOOM = 3;
const RIM_GONE_ZOOM = 16;

export const zoomAt = (t: number, start: number, end: number) =>
  Math.exp(ZOOM_PEAK * Math.pow(progress(t, start, end - start), ZOOM_CURVE)) * (1 + 0.035 * pulse(t));

type ZoomOProps = { t: number; end: number };

export const ZoomO = ({ t, end }: ZoomOProps) => {
  const [alone, until, you] = line(34).words;
  if (t < alone.start) return null;
  const zoom = zoomAt(t, alone.start, end);
  const holeWidth = HOLE_WIDTH * zoom;
  const glow = tween(t, alone.start, you.start - alone.start, 0.3, 1, "power2.in");
  const surge = Math.pow(progress(t, end - 0.5, 0.5), 2);
  const youAge = t - you.start;
  const untilAge = t - until.start;
  const youWidth = Math.min(FULL_WIDTH, holeWidth * 0.8);
  return (
    <>
      <AbsoluteFill style={{ transformOrigin: "540px 960px", transform: `scale(${zoom})` }}>
        <Bloom radius={140} strength={glow} />
        {zoom < RIM_GONE_ZOOM &&
          LETTERS.map((letter, k) => {
            const age = t - (alone.start + k * LETTER_STAGGER);
            if (age < 0 || (k !== 2 && zoom > OFF_SCREEN_ZOOM)) return null;
            return (
              <Anchor
                key={letter}
                y={960 + (k - 2) * LETTER_PITCH + CAP_CENTER_SHIFT}
                transform={`scale(${tween(age, 0, 0.32, 1.8, 1, "expo.out")})`}
                opacity={tween(age, 0, 0.05, 0, 1, "none")}
              >
                <Display text={letter} size={LETTER_SIZE} stretch={WIDE} />
              </Anchor>
            );
          })}
      </AbsoluteFill>
      <Rays angle={t * 10} strength={0.8 * progress(zoom, 4, 10)} />
      {[you.start, ...beatsBetween(you.start, end)].map((time) => (
        <Shock key={time} age={t - time} size={200} reach={12} duration={0.9} />
      ))}
      {untilAge >= 0 && youAge < 0.06 && (
        <Anchor opacity={tween(untilAge, 0, 0.12, 0, 1, "none")}>
          <Serif text="until" size={holeWidth * 0.42} />
        </Anchor>
      )}
      {youAge >= 0 && (
        <Anchor transform={`scale(${tween(youAge, 0, 0.3, 1.8, 1, "expo.out") * (1 + 0.2 * surge + 0.05 * pulse(t))})`}>
          <Display
            text="YOU"
            size={fitSize("YOU", youWidth, WIDE)}
            stretch={WIDE}
            style={{ WebkitTextStroke: youStroke, textShadow: violetGlow(1 + surge) }}
          />
        </Anchor>
      )}
      <Strobe amount={surge * 0.9} tint={color.paper} />
    </>
  );
};
