import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { continueRender, delayRender } from "remotion";

const faces = [
  "900 100px 'Archivo Variable'",
  "400 100px 'Archivo Variable'",
  "400 100px 'Instrument Serif'",
  "italic 400 100px 'Instrument Serif'",
  "500 100px 'JetBrains Mono Variable'",
];

const handle = delayRender("Loading fonts");
Promise.all(faces.map((face) => document.fonts.load(face))).then(() => continueRender(handle));
