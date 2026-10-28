import { AbsoluteFill, Audio, staticFile } from "remotion";
import "./fonts";
import { Grade } from "./components/Grade";
import { Hud } from "./components/Hud";
import { Placeholder } from "./components/Placeholder";
import { AUDIO, color, HUD } from "./config";
import { Clock, Scene } from "./lib/clock";
import { DURATION } from "./lib/song";

export const Video = () => (
  <AbsoluteFill style={{ background: color.ink }}>
    <Audio src={staticFile(AUDIO)} />
    <Clock>
      <Scene name="Intro" from={0} to={DURATION}>
        <Placeholder title="Intro" />
      </Scene>
      <Grade />
      {HUD && <Hud />}
    </Clock>
  </AbsoluteFill>
);
