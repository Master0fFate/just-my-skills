import type { CSSProperties, ReactNode } from "react";
import { color, font } from "../../config";

type MonoProps = { children: ReactNode; size?: number; tint?: string; style?: CSSProperties };

export const Mono = ({ children, size = 28, tint = color.ash, style }: MonoProps) => (
  <div
    style={{
      fontFamily: font.mono,
      fontSize: size,
      fontWeight: 500,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      color: tint,
      ...style,
    }}
  >
    {children}
  </div>
);
