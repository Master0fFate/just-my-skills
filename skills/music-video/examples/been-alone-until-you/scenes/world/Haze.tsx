import { progress } from "../../lib/motion";
import { Glow } from "./Glow";

const BANDS = [
  { y: 14, height: 26, opacity: 0.14 },
  { y: 44, height: 34, opacity: 0.07 },
  { y: 78, height: 40, opacity: 0.06 },
  { y: 118, height: 56, opacity: 0.05 },
  { y: 168, height: 70, opacity: 0.04 },
];

export const Haze = ({ distance }: { distance: number }) => {
  const gate = progress(distance, 30, 50);
  return (
    <>
      {BANDS.map((band) => (
        <Glow key={band.y} position={[20, band.y, 30]} size={[340, band.height]} color="#cfd3df" opacity={band.opacity * gate} />
      ))}
    </>
  );
};
