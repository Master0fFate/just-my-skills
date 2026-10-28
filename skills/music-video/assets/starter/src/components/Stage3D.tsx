import type { ComponentProps } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";

type Lens = { fov?: number; near?: number; far?: number; position?: [number, number, number] };

type StageProps = Omit<ComponentProps<typeof ThreeCanvas>, "width" | "height" | "camera"> & { camera?: Lens };

export const Stage3D = ({ children, camera, gl, style, ...rest }: StageProps) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      dpr={1}
      camera={{ fov: 40, near: 0.1, far: 800, position: [0, 0, 12], ...camera }}
      gl={{ antialias: true, preserveDrawingBuffer: true, ...gl }}
      style={{ position: "absolute", inset: 0, ...style }}
      {...rest}
    >
      {children}
    </ThreeCanvas>
  );
};
