import { AbsoluteFill } from "remotion";
import { color, font, meta, SAFE, VERTICAL } from "../config";
import { useTime } from "../lib/clock";
import { envelope } from "../lib/motion";
import { barAt, DURATION, pulse } from "../lib/song";

const stamp = (t: number) => `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

export const Hud = () => {
  const t = useTime();
  const { beatInBar } = barAt(t);
  const hit = pulse(t, 10);
  const visible = envelope(t, 0.3, DURATION - 1.5, 0.8, 1.2);
  const edge = VERTICAL ? { top: 118, bottom: 150 } : { top: 48, bottom: 48 };
  const text = { fontFamily: font.mono, fontSize: VERTICAL ? 24 : 20, fontWeight: 500, letterSpacing: "0.18em", color: color.paper } as const;
  return (
    <AbsoluteFill style={{ opacity: visible * 0.72, pointerEvents: "none" }}>
      <div style={{ ...text, position: "absolute", top: edge.top, left: SAFE.side }}>{meta.artist.toUpperCase()}</div>
      <div style={{ ...text, position: "absolute", top: edge.top, right: SAFE.side, display: "flex", gap: 12, alignItems: "center" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: i === beatInBar ? color.accent : color.paper,
              opacity: i === beatInBar ? 0.55 + hit * 0.45 : 0.22,
              transform: `scale(${i === beatInBar ? 1 + hit * 0.5 : 1})`,
            }}
          />
        ))}
      </div>
      <div style={{ ...text, position: "absolute", bottom: edge.bottom, left: SAFE.side }}>{meta.title.toUpperCase()}</div>
      <div style={{ ...text, position: "absolute", bottom: edge.bottom, right: SAFE.side, opacity: 0.7 }}>{stamp(t)}</div>
    </AbsoluteFill>
  );
};
