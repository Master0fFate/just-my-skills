import { AbsoluteFill } from "remotion";
import { useWords } from "../components/Lyric";
import { color } from "../config";
import { useScene } from "../lib/clock";
import { tween } from "../lib/motion";
import { beats, pulse } from "../lib/song";
import { Bubble, TypedBubble, TypingDots } from "./verse2/Bubble";
import { Mono } from "./verse2/kit";

const SPINE_X = 76;
const MESSAGE_LINES = [[0, 1], [2, 3, 4], [5]];
const MESSAGE = { left: 130, top: 520, width: 820 } as const;
const REPLY = { right: 72, top: 1240, width: 330, height: 170 } as const;

export const Chat = () => {
  const { t, local } = useScene();
  const { words } = useWords(20);
  const firstWord = words[0];
  const lastWord = words[words.length - 1];
  const replyAt = beats.find((beat) => beat >= lastWord.start) ?? lastWord.start;
  const bump = pulse(t);
  const messageScale = tween(t, firstWord.start, 0.34, 0.45, 1, "back.out(1.9)");
  const replyScale = tween(t, replyAt, 0.32, 0.4, 1, "back.out(2)");
  const typing = t < firstWord.start;

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 85% 38% at 28% 36%, ${color.accentDeep}99, transparent 72%)` }} />
      <AbsoluteFill style={{ transform: `translateY(${-local * 16}px) scale(${1 + bump * 0.012})` }}>
        <div style={{ position: "absolute", left: SPINE_X, top: 300, width: 3, height: 1300, background: `linear-gradient(180deg, transparent, ${color.smoke} 10%, ${color.smoke} 90%, transparent)` }} />
        <Mono style={{ position: "absolute", left: MESSAGE.left, top: 316 }}>Thread with you</Mono>
        <Mono tint={color.accentHi} style={{ position: "absolute", right: 72, top: 316, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: color.accent, boxShadow: `0 0 ${12 + bump * 18}px ${color.accent}` }} />
          Online
        </Mono>

        <div style={{ position: "absolute", left: SPINE_X - 11, top: MESSAGE.top + 36, width: 25, height: 25, borderRadius: 13, background: color.accent, boxShadow: `0 0 28px ${color.accent}` }} />

        {typing ? (
          <Bubble
            side="in"
            tone="you"
            style={{
              position: "absolute",
              left: MESSAGE.left,
              top: MESSAGE.top,
              width: 380,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${1 + bump * 0.05})`,
              transformOrigin: "0 0",
            }}
          >
            <TypingDots t={t} size={52} tint={color.paper} />
          </Bubble>
        ) : (
          <TypedBubble
            side="in"
            tone="you"
            words={words}
            lines={MESSAGE_LINES}
            fontSize={140}
            stretch={78}
            padding={[48, 56, 62]}
            style={{
              position: "absolute",
              left: MESSAGE.left,
              top: MESSAGE.top,
              width: MESSAGE.width,
              transform: `scale(${messageScale * (1 + bump * 0.012)})`,
              transformOrigin: "0 0",
              boxShadow: `0 0 ${80 + bump * 80}px ${color.accent}77`,
            }}
          />
        )}

        <Mono style={{ position: "absolute", left: MESSAGE.left, top: MESSAGE.top + 566, opacity: tween(t, lastWord.start, 0.3, 0, 1, "none") }}>
          You / 09:41 / Seen
        </Mono>

        {t >= replyAt && (
          <>
            <div style={{ position: "absolute", left: SPINE_X - 11, top: REPLY.top + 70, width: 25, height: 25, borderRadius: 13, background: color.paper }} />
            <Bubble
              side="out"
              tone="me"
              style={{
                position: "absolute",
                right: REPLY.right,
                top: REPLY.top,
                width: REPLY.width,
                height: REPLY.height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${replyScale * (1 + bump * 0.05)})`,
                transformOrigin: "100% 100%",
              }}
            >
              <TypingDots t={t} size={40} tint={color.paper} />
            </Bubble>
          </>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
