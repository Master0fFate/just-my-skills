import { createContext, useContext, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";

const ClockContext = createContext(0);
const SceneContext = createContext({ from: 0, to: 0 });

export const Clock = ({ children }: { children: ReactNode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return <ClockContext.Provider value={frame / fps}>{children}</ClockContext.Provider>;
};

export const useTime = () => useContext(ClockContext);

export const Scene = ({ from, to, name, children }: { from: number; to: number; name: string; children: ReactNode }) => {
  const { fps } = useVideoConfig();
  const start = Math.round(from * fps);
  const end = Math.round(to * fps);
  return (
    <Sequence from={start} durationInFrames={end - start} name={name}>
      <SceneContext.Provider value={{ from: start / fps, to: end / fps }}>{children}</SceneContext.Provider>
    </Sequence>
  );
};

export const useScene = () => {
  const t = useTime();
  const { from, to } = useContext(SceneContext);
  const duration = to - from;
  const local = t - from;
  return { t, from, to, local, duration, progress: Math.min(1, Math.max(0, local / duration)) };
};

export const useTimeline = <T extends HTMLElement = HTMLDivElement>(build: (tl: gsap.core.Timeline) => void, time: number) => {
  const scope = useRef<T>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      timeline.current = gsap.timeline({ paused: true, defaults: { lazy: false } });
      build(timeline.current);
    }, scope);
    return () => context.revert();
  }, []);
  useLayoutEffect(() => {
    timeline.current?.seek(time, false);
  }, [time]);
  return scope;
};
