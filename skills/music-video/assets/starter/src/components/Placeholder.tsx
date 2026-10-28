import { AbsoluteFill } from "remotion";
import { color, font, SAFE } from "../config";
import { useScene } from "../lib/clock";
import { line } from "../lib/song";
import { Lyric } from "./Lyric";

export const Placeholder = ({ title, ids = [] }: { title: string; ids?: number[] }) => {
  const { t } = useScene();
  const current = ids.find((id) => t < line(id).end + 0.6) ?? ids[ids.length - 1];
  return (
    <AbsoluteFill style={{ background: color.night, justifyContent: "center", alignItems: "center", padding: SAFE.side }}>
      <div style={{ position: "absolute", top: SAFE.top + 15, fontFamily: font.mono, fontSize: 28, color: color.ash, letterSpacing: "0.2em" }}>{title}</div>
      {current !== undefined && <Lyric id={current} size={110} ghost={0.12} />}
    </AbsoluteFill>
  );
};
