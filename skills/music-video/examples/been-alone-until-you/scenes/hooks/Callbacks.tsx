import type { CSSProperties } from "react";
import { color } from "../../config";
import { progress, tween } from "../../lib/motion";
import { Anchor, Display, violetGlow, youStroke } from "./Display";
import { emWidth, fitSize, TALL, WIDE } from "./type";

export type CallbackKind = "years" | "nobody" | "cracks" | "maybe" | "mine";
export type Orientation = "flat" | "vertical" | "bleed";

const ORIENTATION: Record<Orientation, { width: number; transform: string }> = {
  flat: { width: 936, transform: "" },
  vertical: { width: 1300, transform: "rotate(-90deg)" },
  bleed: { width: 1160, transform: "" },
};

const CRACK_TOP = "polygon(0 0, 100% 0, 100% 46%, 85% 54%, 70% 44%, 55% 56%, 40% 45%, 25% 55%, 10% 46%, 0 52%)";
const CRACK_BOTTOM = "polygon(0 52%, 10% 46%, 25% 55%, 40% 45%, 55% 56%, 70% 44%, 85% 54%, 100% 46%, 100% 100%, 0 100%)";
const MAYBE = ["M", "A", "Y", "B", "E"];
const MINE = ["M", "I", "N", "E", ""];

type CallbackProps = { kind: CallbackKind; age: number; orientation: Orientation };

const Years = ({ width, age }: { width: number; age: number }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
    <Display
      text="6"
      size={fitSize("6", width * 0.62, WIDE)}
      stretch={WIDE}
      style={{ transform: `scale(${tween(age, 0, 0.12, 1.3, 1, "expo.out")})` }}
    />
    <Display text="YEARS" size={fitSize("YEARS", width * 0.92, TALL)} stretch={TALL} />
  </div>
);

const Nobody = ({ width, age }: { width: number; age: number }) => (
  <>
    {[0, 1, 2].map((ring) => {
      const ringAge = age - ring * 0.045;
      if (ringAge < 0) return null;
      return (
        <div
          key={ring}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 300,
            height: 300,
            marginLeft: -150,
            marginTop: -150,
            borderRadius: "50%",
            border: `6px solid ${color.accentHi}`,
            opacity: tween(ringAge, 0, 0.3, 0.9, 0, "power2.in"),
            transform: `scale(${tween(ringAge, 0, 0.3, 0.3, 5, "expo.out")})`,
          }}
        />
      );
    })}
    <div style={{ position: "relative" }}>
      <Display
        text="NOBODY"
        size={fitSize("NOBODY", width, TALL)}
        stretch={TALL}
        style={{ transform: `scale(${tween(age, 0, 0.1, 1.2, 1, "expo.out")})` }}
      />
    </div>
  </>
);

const Cracks = ({ width, age }: { width: number; age: number }) => {
  const size = fitSize("CRACKS", width, TALL);
  const gap = tween(age, 0, 0.12, 0, 16, "expo.out");
  const half = (clip: string, direction: number): CSSProperties => ({
    position: direction > 0 ? "absolute" : "relative",
    inset: direction > 0 ? 0 : undefined,
    clipPath: clip,
    transform: `translate(${direction * gap * 0.5}px, ${direction * gap}px) rotate(${direction * gap * 0.03}deg)`,
  });
  return (
    <div style={{ position: "relative" }}>
      <div style={half(CRACK_TOP, -1)}>
        <Display text="CRACKS" size={size} stretch={TALL} />
      </div>
      <div style={half(CRACK_BOTTOM, 1)}>
        <Display text="CRACKS" size={size} stretch={TALL} />
      </div>
    </div>
  );
};

const Flip = ({ width, age, flipping }: { width: number; age: number; flipping: boolean }) => {
  const size = fitSize("MAYBE", width, TALL);
  return (
    <div style={{ display: "flex" }}>
      {MAYBE.map((letter, i) => {
        const turn = flipping ? progress(age, i * 0.03, 0.1) : 0;
        const changed = flipping && turn >= 0.5;
        const lit = changed && i > 0;
        return (
          <div
            key={i}
            style={{
              width: emWidth(letter, TALL) * size,
              display: "flex",
              justifyContent: "center",
              transform: `scaleY(${Math.max(0.02, Math.abs(1 - turn * 2))})`,
            }}
          >
            <Display
              text={changed ? MINE[i] : letter}
              size={size}
              stretch={TALL}
              tint={lit ? color.accentHi : color.paper}
              style={lit ? { WebkitTextStroke: youStroke, textShadow: violetGlow(0.6) } : undefined}
            />
          </div>
        );
      })}
    </div>
  );
};

export const Callback = ({ kind, age, orientation }: CallbackProps) => {
  const { width, transform } = ORIENTATION[orientation];
  const content =
    kind === "years" ? (
      <Years width={width} age={age} />
    ) : kind === "nobody" ? (
      <Nobody width={width} age={age} />
    ) : kind === "cracks" ? (
      <Cracks width={width} age={age} />
    ) : (
      <Flip width={width} age={age} flipping={kind === "mine"} />
    );
  return <Anchor transform={transform}>{content}</Anchor>;
};
