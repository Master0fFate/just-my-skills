import type { CSSProperties } from "react";
import { color, font } from "../../config";
import { ease } from "../../lib/motion";

const grouped = (value: number) => String(Math.max(0, Math.round(value))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

type CounterProps = {
  value: number;
  previous?: number;
  change?: number;
  direction?: 1 | -1;
  size: number;
  tint?: string;
  weight?: number;
  style?: CSSProperties;
};

const Counter = ({ value, previous = value, change = 1, direction = 1, size, tint = color.paper, weight = 200, style }: CounterProps) => {
  const now = grouped(value);
  const before = grouped(previous).padStart(now.length, " ");
  const rolled = ease("expo.out")(change);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: font.mono,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1,
        color: tint,
        ...style,
      }}
    >
      {[...now].map((char, i) => {
        const old = before[i];
        const rolling = old !== char && change < 1;
        return (
          <span
            key={i}
            style={{ position: "relative", display: "inline-block", width: char === "," ? "0.34em" : "0.6em", height: "1em", overflow: "hidden", textAlign: "center" }}
          >
            {rolling ? (
              <>
                <span style={{ position: "absolute", inset: 0, opacity: 1 - rolled, transform: `translateY(${-direction * rolled * 100}%)` }}>{old}</span>
                <span style={{ position: "absolute", inset: 0, transform: `translateY(${direction * (1 - rolled) * 100}%)` }}>{char}</span>
              </>
            ) : (
              char
            )}
          </span>
        );
      })}
    </div>
  );
};

const Label = ({ children, tint = color.ash, style }: { children: string; tint?: string; style?: CSSProperties }) => (
  <div
    style={{
      fontFamily: font.mono,
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      textAlign: "center",
      color: tint,
      ...style,
    }}
  >
    {children}
  </div>
);

type CounterStackProps = {
  label: string;
  labelTint?: string;
  value: number;
  previous?: number;
  change?: number;
  direction?: 1 | -1;
  tint?: string;
  glow?: string;
  blur?: number;
  scale?: number;
  caption?: string;
  captionOpacity?: number;
};

export const CounterStack = ({
  label,
  labelTint,
  value,
  previous,
  change,
  direction,
  tint,
  glow,
  blur = 0,
  scale = 1,
  caption,
  captionOpacity = 1,
}: CounterStackProps) => (
  <>
    <Label tint={labelTint} style={{ position: "absolute", top: 1386, left: 0, right: 0 }}>
      {label}
    </Label>
    <Counter
      value={value}
      previous={previous}
      change={change}
      direction={direction}
      size={150}
      tint={tint}
      style={{
        position: "absolute",
        top: 1434,
        left: 0,
        right: 0,
        transform: scale === 1 ? undefined : `scale(${scale})`,
        filter: [glow ? `drop-shadow(0 0 14px ${glow})` : "", blur > 0 ? `blur(${blur}px)` : ""].join(" ").trim() || undefined,
      }}
    />
    {caption && (
      <Label tint={color.paper} style={{ position: "absolute", top: 1606, left: 0, right: 0, opacity: captionOpacity * 0.8 }}>
        {caption}
      </Label>
    )}
  </>
);
