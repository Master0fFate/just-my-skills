import { AbsoluteFill } from "remotion";
import { color, HEIGHT, WIDTH } from "../../config";
import { clamp } from "../../lib/motion";
import { Display, mixColor } from "./Display";
import { TALL, WIDE } from "./type";

const RING_COUNT = 16;
const SPACING = 520;
const RANGE = RING_COUNT * SPACING;
const PERSPECTIVE = 800;
const RADIUS = 700;
const STRETCH_Y = 1.55;

const smooth = (from: number, to: number, x: number) => {
  const p = clamp((x - from) / (to - from));
  return p * p * (3 - 2 * p);
};

type TunnelProps = {
  text: string;
  travel: number;
  spin: number;
  roll: number;
  tint: number;
  open: number;
  opacity?: number;
};

const Ring = ({
  text,
  index,
  depth,
  spin,
  tint,
  open,
}: Omit<TunnelProps, "travel" | "roll" | "opacity"> & { index: number; depth: number }) => {
  const alpha = smooth(120, 700, depth) * (1 - smooth(RANGE * 0.45, RANGE * 0.97, depth));
  if (alpha < 0.01) return null;
  const tall = index % 2 === 0;
  const count = 4;
  const size = tall ? 400 : 235;
  const nearness = 1 - depth / RANGE;
  const base = mixColor(color.ash, color.paper, Math.pow(nearness, 0.5));
  const tone = mixColor(base, color.accentHi, tint * 0.9);
  const hollow = index % 3 === 1;
  const radius = RADIUS * (1 + open);
  const angle = index * 47 + (index % 2 ? 1 : -1) * spin;
  return (
    <div
      style={{
        position: "absolute",
        left: WIDTH / 2,
        top: HEIGHT / 2,
        width: 0,
        height: 0,
        opacity: alpha,
        transform: `translateZ(${-depth}px) scale(1, ${STRETCH_Y}) rotate(${angle}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -radius * 0.78,
          top: -radius * 0.78,
          width: radius * 1.56,
          height: radius * 1.56,
          borderRadius: "50%",
          border: `${2 + nearness * 4}px solid ${tone}`,
          opacity: 0.35,
        }}
      />
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `rotate(${(i * 360) / count}deg) translateY(${-radius}px) translate(-50%, -50%)`,
          }}
        >
          <Display
            text={text}
            size={size}
            stretch={tall ? TALL : WIDE}
            tint={hollow ? "transparent" : tone}
            style={hollow ? { WebkitTextStroke: `${3 + nearness * 3}px ${tone}` } : undefined}
          />
        </div>
      ))}
    </div>
  );
};

export const Tunnel = ({ text, travel, spin, roll, tint, open, opacity = 1 }: TunnelProps) => {
  const rings = Array.from({ length: RING_COUNT }, (_, index) => ({
    index,
    depth: (((index * SPACING - travel) % RANGE) + RANGE) % RANGE,
  })).sort((a, b) => b.depth - a.depth);
  return (
    <AbsoluteFill style={{ perspective: PERSPECTIVE, perspectiveOrigin: "50% 50%", transform: `rotate(${roll}deg)`, opacity }}>
      {rings.map(({ index, depth }) => (
        <Ring key={index} text={text} index={index} depth={depth} spin={spin} tint={tint} open={open} />
      ))}
    </AbsoluteFill>
  );
};
