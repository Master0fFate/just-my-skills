import { AdditiveBlending, type Texture } from "three";
import type { Vec3 } from "./layout";
import { ringGlow, softGlow, streakGlow } from "./textures";

type Shape = "soft" | "streak" | "ring";

const shapeTexture = (shape: Shape): Texture => {
  if (shape === "streak") return streakGlow();
  if (shape === "ring") return ringGlow();
  return softGlow();
};

type GlowProps = {
  position: Vec3;
  size: number | [number, number];
  color?: string;
  opacity?: number;
  shape?: Shape;
  depthTest?: boolean;
};

const extent = (size: GlowProps["size"]): [number, number] => (typeof size === "number" ? [size, size] : size);

export const Glow = ({ position, size, color = "#ffffff", opacity = 1, shape = "soft", depthTest = false }: GlowProps) => {
  const [width, height] = extent(size);
  return (
    <sprite position={position} scale={[width, height, 1]} renderOrder={10}>
      <spriteMaterial
        map={shapeTexture(shape)}
        color={color}
        opacity={Math.min(1, opacity)}
        blending={AdditiveBlending}
        transparent
        depthWrite={false}
        depthTest={depthTest}
        fog={false}
      />
    </sprite>
  );
};

export const WallGlow = ({ position, size, color = "#ffffff", opacity = 1 }: Omit<GlowProps, "shape" | "depthTest">) => {
  const [width, height] = extent(size);
  return (
    <mesh position={position} scale={[width, height, 1]} renderOrder={5}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={softGlow()}
        color={color}
        opacity={Math.min(1, opacity)}
        blending={AdditiveBlending}
        transparent
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
};
