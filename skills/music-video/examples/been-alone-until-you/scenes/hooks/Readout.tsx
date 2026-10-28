import { color, font } from "../../config";

type ReadoutProps = { label: string; value: string; y?: number };

export const Readout = ({ label, value, y = 1668 }: ReadoutProps) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      top: y,
      display: "flex",
      justifyContent: "space-between",
      fontFamily: font.mono,
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: "0.18em",
      color: color.ash,
    }}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
