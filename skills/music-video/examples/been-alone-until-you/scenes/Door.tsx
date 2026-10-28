import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { useWords, type WordState } from "../components/Lyric";
import { Plate } from "../components/Plate";
import { color, font, HEIGHT, WIDTH } from "../config";
import { useScene } from "../lib/clock";
import { clamp, ease, mix, noise, progress, rand, tween } from "../lib/motion";
import { pulse } from "../lib/song";
import { Mono } from "./verse1/Mono";

const PLATE = "door";
const DOOR = { x: 575, y: 700 };
const DOOR_LIGHT = { x: 655, y: 770 };
const FLOOR = { width: 4000, height: 1700, bottom: 2100, angle: 66, depth: 1100, apex: -470 };
const FEATHER = 18;
const MOTES = 70;
const WIPE_TIME = 0.42;
const LINES = [
  { words: [0, 1], top: 40, size: 270, serif: false },
  { words: [2, 3], top: 370, size: 260, serif: false },
  { words: [4, 5], top: 700, size: 250, serif: false },
  { words: [6, 7, 8], top: 1040, size: 190, serif: true },
];

const cone = (half: number) =>
  `conic-gradient(from ${180 - half - FEATHER}deg at 50% ${FLOOR.apex}px, transparent 0deg, #000 ${FEATHER}deg, #000 ${FEATHER + 2 * half}deg, transparent ${2 * FEATHER + 2 * half}deg, transparent 360deg)`;

const rays = (shift: number) =>
  `repeating-conic-gradient(from ${180 + shift}deg at 50% ${FLOOR.apex}px, rgba(255,255,255,0.05) 0deg 0.9deg, transparent 0.9deg 3.1deg), repeating-conic-gradient(from ${180 - shift}deg at 50% ${FLOOR.apex}px, rgba(255,255,255,0.04) 0deg 1.6deg, transparent 1.6deg 5.3deg)`;

const wipe = (age: number): CSSProperties => {
  const edge = ease("power2.out")(clamp(age / WIPE_TIME)) * 120;
  const mask = `linear-gradient(90deg, #000 ${edge - 20}%, transparent ${edge}%)`;
  return { maskImage: mask, WebkitMaskImage: mask };
};

const FloorWord = ({ word, serif, fading }: { word: WordState; serif: boolean; fading: boolean }) => {
  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        fontFamily: serif ? font.serif : font.display,
        fontStyle: serif ? "italic" : "normal",
        fontWeight: serif ? 400 : 900,
        fontVariationSettings: serif ? undefined : "'wdth' 62",
        textTransform: serif ? "none" : "uppercase",
        color: color.paper,
        textShadow: `0 0 36px ${color.accent}, 0 0 90px ${color.accent}`,
        opacity: word.on ? 1 : 0,
        ...(word.on ? wipe(word.age) : {}),
      }}
    >
      {fading
        ? word.w.split("").map((letter, i) => (
            <span key={i} style={{ opacity: 1 - ease("power2.in")(progress(word.start + word.age, word.end - 0.2 + i * 0.1, 0.35)) }}>
              {letter}
            </span>
          ))
        : word.w}
    </span>
  );
};

export const Door = () => {
  const { t, local, to } = useScene();
  const { words } = useWords(7);
  const kick = pulse(t, 7);
  const open = ease("power3.out")(progress(local, 0, 1.5));
  const slit = mix(5, 1500, ease("power4.out")(progress(local, 0.04, 1.0)));
  const irisAt = to - 0.7;
  const iris = tween(t, irisAt, 0.7, 1700, 0, "power2.in");
  const closing = 1 - iris / 1700;
  const half = mix(3, 40, open);
  const floorLeft = DOOR.x - FLOOR.width / 2;
  const glow = (0.7 + kick * 0.3) * (0.35 + 0.65 * open);

  return (
    <AbsoluteFill style={{ background: color.ink, overflow: "hidden" }}>
      {[-1, 1].map((side) => (
        <div
          key={side}
          style={{
            position: "absolute",
            left: DOOR.x + side * slit - 2,
            top: 0,
            width: 4,
            height: HEIGHT,
            background: color.paper,
            boxShadow: `0 0 40px 14px ${color.accent}`,
            opacity: 1 - progress(slit, 500, 700),
          }}
        />
      ))}
      <AbsoluteFill style={{ clipPath: `circle(${iris}px at 540px 940px)` }}>
        <AbsoluteFill style={{ clipPath: `polygon(${DOOR.x - slit}px 0, ${DOOR.x + slit}px 0, ${DOOR.x + slit}px ${HEIGHT}px, ${DOOR.x - slit}px ${HEIGHT}px)` }}>
          <Plate name={PLATE} saturation={0.8} exposure={1.5} contrast={1.05} tint={color.accentHi} tintAmount={0.3} origin="60% 55%" />
          <AbsoluteFill
            style={{
              background: `radial-gradient(ellipse 30% 24% at ${DOOR_LIGHT.x}px ${DOOR_LIGHT.y}px, ${color.accentHi} 0%, rgba(102,102,255,0.55) 35%, transparent 100%)`,
              opacity: glow,
              mixBlendMode: "screen",
            }}
          />
          <div style={{ position: "absolute", inset: 0, perspective: FLOOR.depth, perspectiveOrigin: `${DOOR.x}px ${DOOR.y}px` }}>
            <div
              style={{
                position: "absolute",
                left: floorLeft,
                top: FLOOR.bottom - FLOOR.height,
                width: FLOOR.width,
                height: FLOOR.height,
                transformOrigin: "50% 100%",
                transform: `rotateX(${FLOOR.angle}deg)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg, rgba(166,166,255,0) 0%, rgba(166,166,255,0.8) 14%, rgba(102,102,255,0.5) 45%, rgba(102,102,255,0.16) 100%)`,
                  maskImage: cone(half),
                  WebkitMaskImage: cone(half),
                  mixBlendMode: "screen",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: rays(noise(t * 0.3, 5) * 4),
                  maskImage: cone(half),
                  WebkitMaskImage: cone(half),
                  mixBlendMode: "screen",
                  opacity: 0.8 + kick * 0.2,
                }}
              />
              <div style={{ position: "absolute", inset: 0, maskImage: cone(half), WebkitMaskImage: cone(half) }}>
                {LINES.map((line) => (
                  <div
                    key={line.top}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: line.top,
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.24em",
                      fontSize: line.size,
                      lineHeight: 1,
                    }}
                  >
                    {line.words.map((index) => (
                      <FloorWord key={index} word={words[index]} serif={line.serif} fading={index === words.length - 1} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
            {Array.from({ length: MOTES }, (_, i) => {
              const lane = rand(i * 3 + 1);
              const rise = (rand(i * 5 + 2) * 40 + 18) * t;
              const y = DOOR.y + 80 + ((rand(i * 7 + 3) * 1000 - rise + 20000) % 1000);
              const spread = mix(90, 560, (y - DOOR.y) / 1000) * open;
              const x = DOOR.x + (lane - 0.5) * 2 * spread + noise(t * 0.5 + i * 3, i) * 26;
              const twinkle = 0.25 + 0.75 * Math.abs(noise(t * 1.6 + i * 11, i + 40));
              return <circle key={i} cx={x} cy={y} r={1.4 + rand(i * 11 + 4) * 3.2} fill={color.accentHi} opacity={twinkle * open * 0.9} />;
            })}
          </svg>
        </AbsoluteFill>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 540 - 60,
          top: 940 - 60,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, #ffffff 0%, ${color.accentHi} 22%, rgba(102,102,255,0) 70%)`,
          opacity: closing ** 2,
          transform: `scale(${0.3 + closing * 0.7})`,
        }}
      />
      <Mono size={28} style={{ position: "absolute", left: 72, top: 300 }}>
        Hallway
      </Mono>
      <Mono size={28} tint={color.paper} style={{ position: "absolute", right: 72, top: 300 }}>
        Visitors {words[1].on ? 1 : 0}
      </Mono>
    </AbsoluteFill>
  );
};
