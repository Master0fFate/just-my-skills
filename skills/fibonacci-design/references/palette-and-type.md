# Palette and Type

Recipes, not a costume trunk. Pick one type recipe and one color recipe per artifact. Commit.

## Type recipes

Always load real italics if the voice uses emphasis. Always have four weights or a pair that covers display + text.

### Editorial serif (default for long reading)

- Display / titles — a Renaissance or transitional serif with sharp italic (Source Serif, Newsreader, Fraunces in a calm optical size, or equivalent).
- Body — the same family at text optical size, or a related old-style.
- UI / labels — a humanist sans that does not shout, used small.

Why it fits — serifs carry measure and quiet authority. They fight the default "AI sans" silhouette.

### Humanist product

- One humanist sans across the artifact (something with a true italic, not a slanted roman).
- Titles in semibold, not black.
- Numerals lining for UI, oldstyle only in prose if the family has them.

Why it fits — products still need calm. Humanist structure beats geometric sterility.

### Dual-voice poster

- Display serif at T6 for one line only.
- Text sans for everything else.
- No third family.

Use only when the artifact is a single-view poster or opening.

### Banned defaults unless the user demanded the brand

Inter, Roboto, Arial, Open Sans, Poppins, Montserrat, system-ui as the display voice, Comic faces, fake handwriting, and "AI geometric" faces with identical circular o and no italic.

If you must use a common face because of environment limits, compensate with measure, weight restraint, and the scale. Do not also use the slop layout.

## Type behaviors

- Do not letterspace lowercase body.
- Small labels may track +0.04em to +0.08em.
- Display above 55px may track −0.02em to −0.04em.
- Hyphenate long-measure justified text only. Prefer ragged-right.
- Oldstyle numbers in prose. Tabular lining numbers in tables, prices, dashboards.
- One underline style for links. Do not invent hover letterspacing.

## Color recipes

Work in roles, not in hex souvenirs.

| Role      | Pixel share (feel) | Job                              |
|-----------|--------------------|----------------------------------|
| Field     | major (~0.618+)    | page background                  |
| Raised    | small              | one plane if something must lift |
| Structure | next               | text, rules, icons               |
| Accent    | remnant (~0.146)   | the one living color             |
| Mute      | supporting         | meta text, disabled, grids       |
| State     | tiny               | focus, error, success            |

### Mineral light (default light)

- Field — warm paper, not #FFFFFF chrome and not baby beige.
- Structure — near-black ink with a hint of the accent hue (not pure #000 unless printed).
- Mute — ink at lower presence, still readable for meta.
- Accent — one earth or mineral (oxide red, bottle green, lapis, iron). Never neon purple.
- Raised — field shifted one step darker or a hairline only.

### Mineral dark

- Field — dark warm or dark cool, not #0B1020 plus purple bloom.
- Structure — paper-colored ink, not pure white at full width.
- Accent — the same mineral as the light theme, lightened until it holds contrast.
- No glow behind the accent. The accent is a surface, not a lamp.

### Ink and one lake

- Field paper, structure ink, accent a single deep blue-green.
- Use when the content is editorial or archival.

### Data exception

Categorical colors are allowed for charts. They do not leak into buttons, heroes, and borders. The page chrome stays mineral.

## Contrast

- Body on field must remain readable in both themes.
- Mute text is still text. If it fails contrast, it is decoration pretending to be content — raise it or delete it.
- Accent on field must hold when used for text. If the accent is too soft for text, use it only as a plane or rule, and keep text in structure color.

## Color behaviors that keep the page tranquil

- One accent. A second hue is a state (error) or data, never a second personality.
- Gradients only along a 3–8% shift of the same hue, and only if they help a large plane recede. No rainbow, no purple-cyan.
- Hairlines use structure color at low presence, not accent.
- Selection and focus may use accent at low presence. They must not flood.

## Pairing type + color

Good default pairings

- Editorial serif + ink and one lake
- Humanist product + mineral light / mineral dark
- Dual-voice poster + mineral light with a single oxide accent

Bad pairings

- Geometric sans + aurora gradient
- Thin serif on dark glass
- Black display sans on pure white with a blue pill — that is the default internet, not this system
