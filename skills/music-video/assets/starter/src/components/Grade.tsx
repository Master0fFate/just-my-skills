import { useMemo } from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";

const TILE = 256;

const makeGrain = () => {
  const canvas = document.createElement("canvas");
  canvas.width = TILE;
  canvas.height = TILE;
  const context = canvas.getContext("2d")!;
  const image = context.createImageData(TILE, TILE);
  for (let i = 0; i < image.data.length; i += 4) {
    const v = Math.floor(random(i) * 255);
    image.data[i] = v;
    image.data[i + 1] = v;
    image.data[i + 2] = v;
    image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  return canvas.toDataURL();
};

export const Grade = ({ grain = 0.09, vignette = 0.55 }: { grain?: number; vignette?: number }) => {
  const frame = useCurrentFrame();
  const tile = useMemo(makeGrain, []);
  const step = Math.floor(frame / 2);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 75% 60% at 50% 50%, transparent 40%, rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `url(${tile})`,
          backgroundSize: `${TILE * 2}px ${TILE * 2}px`,
          backgroundPosition: `${Math.floor(random(`gx${step}`) * TILE * 2)}px ${Math.floor(random(`gy${step}`) * TILE * 2)}px`,
          mixBlendMode: "overlay",
          opacity: grain,
          imageRendering: "pixelated",
        }}
      />
    </AbsoluteFill>
  );
};
