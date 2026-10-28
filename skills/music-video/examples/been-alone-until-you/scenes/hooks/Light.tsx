import { AbsoluteFill } from "remotion";
import { color } from "../../config";
import { tween } from "../../lib/motion";

type BloomProps = { x?: number; y?: number; radius?: number; strength?: number };

export const Bloom = ({ x = 540, y = 960, radius = 900, strength = 1 }: BloomProps) => (
  <div
    style={{
      position: "absolute",
      left: x - radius,
      top: y - radius,
      width: radius * 2,
      height: radius * 2,
      opacity: strength,
      background: `radial-gradient(closest-side, ${color.accentHi} 0%, ${color.accent} 30%, ${color.accentDeep} 66%, rgba(35,35,138,0) 100%)`,
    }}
  />
);

export const Strobe = ({ amount, tint = color.paper }: { amount: number; tint?: string }) =>
  amount > 0 ? <AbsoluteFill style={{ background: tint, opacity: amount }} /> : null;

type ShockProps = { age: number; x?: number; y?: number; size?: number; duration?: number; reach?: number };

export const Shock = ({ age, x = 540, y = 960, size = 160, duration = 0.6, reach = 9 }: ShockProps) => {
  if (age < 0 || age > duration) return null;
  const scale = tween(age, 0, duration, 0.2, reach, "expo.out");
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${Math.max(2, 14 / scale)}px solid ${color.accentHi}`,
        opacity: tween(age, 0, duration, 0.9, 0, "power2.in"),
        transform: `scale(${scale})`,
      }}
    />
  );
};

export const Shade = ({
  strength = 0.8,
  width = 1400,
  height = 900,
  y = 960,
}: {
  strength?: number;
  width?: number;
  height?: number;
  y?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: 540 - width / 2,
      top: y - height / 2,
      width,
      height,
      background: `radial-gradient(closest-side, rgba(7,7,11,${strength}) 0%, rgba(7,7,11,${strength * 0.8}) 45%, rgba(7,7,11,0) 100%)`,
    }}
  />
);

export const Rays = ({ angle, strength }: { angle: number; strength: number }) => (
  <AbsoluteFill
    style={{
      opacity: strength,
      background: `repeating-conic-gradient(from ${angle}deg at 50% 50%, rgba(166,166,255,0.55) 0deg 3deg, rgba(166,166,255,0) 3deg 14deg)`,
      WebkitMaskImage: "radial-gradient(circle 1100px at 50% 50%, #000 0%, transparent 100%)",
      mixBlendMode: "screen",
    }}
  />
);
