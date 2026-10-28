import { Composition } from "remotion";
import { FPS, HEIGHT, WIDTH } from "./config";
import { DURATION } from "./lib/song";
import { Video } from "./Video";

export const Root = () => (
  <Composition id="Video" component={Video} durationInFrames={Math.max(1, Math.ceil(DURATION * FPS))} fps={FPS} width={WIDTH} height={HEIGHT} />
);
