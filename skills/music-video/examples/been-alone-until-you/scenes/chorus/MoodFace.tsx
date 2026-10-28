import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { useWords, type WordState } from "../../components/Lyric";
import { color, font } from "../../config";
import { ease, mix, noise, progress, tween } from "../../lib/motion";
import { BEAT, beatAt, nearestBeat, pulse } from "../../lib/song";
import { withAlpha } from "./fx";
import type { BlockProps } from "./hookParts";
import { ghostText } from "./hookParts";
import { fitSize } from "./metrics";

const EYE_Y = 520;
const EYE_XS = [340, 740] as const;
const EYE_RADIUS = 64;
const MOUTH_Y = 710;
const MOUTH_LEFT = 290;
const MOUTH_RIGHT = 790;
const MOUTH_POINTS = 48;
const ROW_Y = { small: 930, stranger: 1085, own: 1240, mood: 1450 } as const;

const wordIn = (word: WordState): CSSProperties => ({
  opacity: tween(word.age, 0, 0.06, 0, 1, "none"),
  transform: `translateY(${tween(word.age, 0, 0.3, 50, 0, "expo.out")}px) scaleY(${tween(word.age, 0, 0.22, 1.25, 1, "expo.out")})`,
});

export const MoodFace = ({ block, look }: BlockProps) => {
  const { t, words } = useWords(block.id);
  const { palette } = look;
  const stranger = words[3];
  const own = words[6];
  const good = words[7];
  const mood = words[8];
  const smile = ease("back.out(1.7)")(progress(t, good.start, 0.45));
  const flip = ease("back.out(1.4)")(progress(t, nearestBeat(own.start), 0.5));
  const tremble = progress(t, stranger.start, 0.3) * (1 - progress(t, own.start, 0.5));
  const finale = ease("power3.in")(progress(t, block.end - BEAT * 4, BEAT * 4));
  const beat = beatAt(t);
  const hit = pulse(t, 8);
  const blink = beat.index % 8 === 5 && beat.since < 0.12 ? 1 - 0.92 * Math.sin((beat.since / 0.12) * Math.PI) : 1;
  const glance = tween(t, stranger.start, 0.3, 0, 26, "power3.out") * (1 - progress(t, own.start, 0.4));
  const meColor = palette.inverted ? color.ink : look.theme.warm ? color.warm : palette.fg;
  const eyes = [meColor, palette.you];
  const level = Math.round(mix(3, 100, smile * progress(t, good.start, 0.9)));
  const mouth = Array.from({ length: MOUTH_POINTS + 1 }, (_, k) => {
    const u = k / MOUTH_POINTS;
    const x = mix(MOUTH_LEFT, MOUTH_RIGHT, u);
    const y = MOUTH_Y + 135 * smile * 4 * u * (1 - u) + tremble * noise(u * 8 + t * 5, 3) * 9 - hit * smile * 6 * Math.sin(u * Math.PI);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const mouthPath = `M${mouth.join(" L")}`;
  const strangerSize = fitSize("STRANGER", 880, 62, 0.01);
  const scale = 1 + 0.03 * progress(t, block.start, block.end - block.start) + 0.04 * finale;

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 40%" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          {eyes.map((tint, i) => (
            <radialGradient key={i} id={`mood-glow-${i}`}>
              <stop offset={0} stopColor={tint} stopOpacity={0.6} />
              <stop offset={1} stopColor={tint} stopOpacity={0} />
            </radialGradient>
          ))}
        </defs>
        {EYE_XS.map((x, i) => {
          const radius = EYE_RADIUS * (1 + 0.14 * hit + 0.3 * smile + 0.9 * finale * finale);
          const cx = x + glance + noise(t * 0.7, i + 1) * 12;
          const cy = EYE_Y + noise(t * 0.6, i + 5) * 8 + smile * -14;
          return (
            <g key={i} transform={`translate(${cx} ${cy}) scale(1 ${blink})`}>
              <circle
                r={radius * (3.4 + 5 * finale)}
                fill={`url(#mood-glow-${i})`}
                opacity={0.55 + 0.25 * smile + 0.2 * hit}
                style={{ mixBlendMode: palette.inverted ? "normal" : "plus-lighter" }}
              />
              <circle r={radius} fill={eyes[i]} />
            </g>
          );
        })}
        <path d={mouthPath} fill="none" stroke={palette.you} strokeWidth={70} strokeLinecap="round" strokeLinejoin="round" opacity={0.14 * smile} />
        <path d={mouthPath} fill="none" stroke={palette.fg} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" opacity={1 - smile} />
        <path d={mouthPath} fill="none" stroke={palette.you} strokeWidth={22 + 6 * hit} strokeLinecap="round" strokeLinejoin="round" opacity={smile} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 330,
          fontFamily: font.mono,
          fontSize: 24,
          letterSpacing: "0.18em",
          color: palette.mute,
        }}
      >
        {`MOOD ${String(level).padStart(3, "0")}%`}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1080,
          top: ROW_Y.small,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 36,
          transform: "translateY(-50%)",
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 150,
          lineHeight: 1,
          fontVariationSettings: "'wdth' 62",
          color: palette.fg,
        }}
      >
        {words.slice(0, 3).map((word) => (
          <span key={word.index} style={word.on ? wordIn(word) : ghostText(look)}>
            {word.w.toUpperCase()}
          </span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          width: 880,
          top: ROW_Y.stranger,
          display: "flex",
          justifyContent: "space-between",
          transform: `translateY(-50%) perspective(1400px) rotateY(${180 * (1 - flip)}deg)`,
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: strangerSize,
          lineHeight: 1,
          fontVariationSettings: "'wdth' 62",
          color: palette.fg,
          ...(stranger.on ? { opacity: tween(stranger.age, 0, 0.06, 0, 1, "none") } : ghostText(look)),
        }}
      >
        {[...stranger.w.toUpperCase()].map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1080,
          top: ROW_Y.own,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 36,
          transform: "translateY(-50%)",
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 150,
          lineHeight: 1,
          fontVariationSettings: "'wdth' 62",
          color: palette.fg,
        }}
      >
        {words.slice(4, 7).map((word) => (
          <span key={word.index} style={word.on ? wordIn(word) : ghostText(look)}>
            {word.w.toUpperCase()}
          </span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1080,
          top: ROW_Y.mood,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 40,
          transform: "translateY(-50%)",
          fontFamily: font.serif,
          fontStyle: "italic",
          fontSize: 210,
          lineHeight: 1,
          color: palette.fg,
        }}
      >
        <span style={good.on ? wordIn(good) : { ...ghostText(look), WebkitTextStroke: `1.5px ${palette.mute}` }}>{good.w}</span>
        <span
          style={
            mood.on
              ? { ...wordIn(mood), color: palette.you, textShadow: `0 0 ${34 + 30 * pulse(t, 7)}px ${withAlpha(palette.you, 0.85)}` }
              : { ...ghostText(look), WebkitTextStroke: `1.5px ${palette.mute}` }
          }
        >
          {mood.w}
        </span>
      </div>
    </AbsoluteFill>
  );
};
