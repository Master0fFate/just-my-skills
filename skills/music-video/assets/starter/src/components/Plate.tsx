import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { color } from "../config";
import { useScene } from "../lib/clock";
import { mix } from "../lib/motion";

type PlateProps = {
  name: string;
  zoom?: [number, number];
  pan?: [number, number];
  exposure?: number;
  saturation?: number;
  contrast?: number;
  tint?: string;
  tintAmount?: number;
  origin?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export const Plate = ({
  name,
  zoom = [1.06, 1.16],
  pan = [0, 0],
  exposure = 1,
  saturation = 0.35,
  contrast = 1.12,
  tint = color.accent,
  tintAmount = 0.18,
  origin = "50% 50%",
  style,
  children,
}: PlateProps) => {
  const { progress } = useScene();
  const scale = mix(zoom[0], zoom[1], progress);
  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      <Img
        src={staticFile(`plates/${name}.png`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: origin,
          transform: `translate(${mix(0, pan[0], progress)}px, ${mix(0, pan[1], progress)}px) scale(${scale})`,
          filter: `saturate(${saturation}) contrast(${contrast}) brightness(${exposure})`,
        }}
      />
      <AbsoluteFill style={{ background: tint, mixBlendMode: "soft-light", opacity: tintAmount }} />
      {children}
    </AbsoluteFill>
  );
};
