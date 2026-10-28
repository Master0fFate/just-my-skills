const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NARROW = [53, 49.8, 51.3, 50.9, 46.2, 40.2, 54.3, 51.3, 26.3, 45.3, 51, 43.2, 70.5, 51.8, 55.4, 48.5, 55.4, 50.9, 46.9, 47.5, 50.3, 49, 72.9, 50, 48.1, 47.5];
const WIDE = [95.4, 93, 93.9, 93.3, 86, 80.7, 101.2, 100.9, 39.5, 76.4, 98.8, 78.6, 117.8, 100.7, 100.8, 86.5, 100.8, 94.3, 88.2, 87.7, 98.9, 93.8, 123, 96.1, 96.6, 87.7];
const SPACE = [11, 29];

export const CAP_HEIGHT = 0.7;
export const BASELINE = 0.834;

export const advance = (char: string, wdth: number) => {
  const index = LETTERS.indexOf(char.toUpperCase());
  const narrow = index < 0 ? SPACE[0] : NARROW[index];
  const wide = index < 0 ? SPACE[1] : WIDE[index];
  return (narrow + ((wide - narrow) * (wdth - 62)) / 63) / 100;
};

export const textAdvance = (text: string, wdth: number, tracking = 0) =>
  [...text].reduce((sum, char) => sum + advance(char, wdth) + tracking, 0);

export const fitSize = (text: string, width: number, wdth: number, tracking = 0) => width / textAdvance(text, wdth, tracking);
