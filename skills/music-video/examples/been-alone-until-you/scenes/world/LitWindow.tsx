import type { ReactNode } from "react";
import { clamp, mix, progress } from "../../lib/motion";
import { Glow, WallGlow } from "./Glow";
import { LAYER, LIT_CENTER, PANE, type Vec3 } from "./layout";
import { roomInterior } from "./textures";

type LitWindowProps = {
  center?: Vec3;
  distance: number;
  level: number;
  room?: number;
  tint?: string;
  children?: ReactNode;
};

export const LitWindow = ({ center = LIT_CENTER, distance, level, room = level, tint = "#ffffff", children }: LitWindowProps) => {
  const spread = 1 + distance / 24;
  const bloom = mix(0.2, 1, progress(distance, 6, 40)) * level;
  const [x, y, z] = center;
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0, LAYER.room]}>
        <planeGeometry args={[PANE.width, PANE.height]} />
        <meshBasicMaterial map={roomInterior()} color={[clamp(room), clamp(room), clamp(room)]} fog={false} />
      </mesh>
      {children}
      <WallGlow position={[0, 0, LAYER.glow]} size={[2.8, 3.9]} color={tint} opacity={0.3 * level} />
      <WallGlow position={[0, 0, LAYER.glow]} size={[8, 11]} color={tint} opacity={0.13 * level} />
      <WallGlow position={[0, 0, LAYER.glow]} size={[30, 38]} color={tint} opacity={0.08 * level} />
      <Glow position={[0, 0, 0.5]} size={2.4 * spread} color={tint} opacity={0.6 * bloom} />
      <Glow position={[0, 0, 0.5]} size={7 * spread} color={tint} opacity={0.3 * bloom} />
      <Glow position={[0, 0, 0.5]} size={22 * spread} color={tint} opacity={0.14 * bloom} />
      <Glow position={[0, 0, 0.5]} size={[18 * spread, 1.1 * spread]} color={tint} opacity={0.16 * bloom} shape="streak" />
    </group>
  );
};
