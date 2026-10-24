# The look

This is the designer's read of Angel Core 2026, also called dark angelcore:
a high-contrast, gothic, surreal turn on classic angelcore. Classic angelcore is
soft cream, blush pastel, gold, and diffuse glow. This version keeps the
celestial intent and inverts the light. Highlights are pushed past their
natural limit, shadows go absolute, and midtones are compressed out. It reads
as black and white, but it is not a flat grayscale conversion: the white still
glows, the black still has grain, and one small color may survive.

The read below comes from the four covers in `look/`. That folder is
local only and git-ignored; a public clone has this text and not the images.
The covers are the user's
visual references for the current meaning of angelcore: a white apparition in a
black void, not pastel clouds and cherubs. The covers are private calibration
material. Never use them as product assets, and never copy their subjects.

## One sentence

**Hard frame, soft light.** The interface is a hard-edged black instrument. The
image is a blown-out white apparition that dissolves into the same black. The
two never trade properties: no bloom on a button, no cage on a photo.

## The ten properties

| # | Property | What the covers do | Rule for new work |
| --- | --- | --- | --- |
| 1 | Void | The ground is black, not dark gray. 43 to 80 percent of each cover sits at or under value 24. Edges, corners, and half of every frame are empty. | `--ac-bg` is `#050505`. Keep large empty black. Do not fill it with cards. |
| 2 | Whitewash | The subject is not lit, it is blown. Skin, fabric, wings, and hair clip to white. 3 to 11 percent of each cover is at or above value 230. Only 7 to 19 percent is midtone. | Crush the tone curve: black point about 28, white point about 110, no midtones to speak of. Check the signature numbers in the conversion report. |
| 3 | Halation | White bleeds into the black with a soft halo. Butterflies and bokeh are motion-blurred or out of focus. | Halation and blur are baked into the asset, never applied to interface chrome. A CSS blur layer is allowed only on a duplicate art image. |
| 4 | Texture in the dark | Film grain, dust, long thin vertical scratches, a faint horizontal scanline comb. The grain lives in the shadows. Clipped white stays clean. | Seeded grain, 3 to 12 scratches, dust. Record the seed. Never a uniform noise wallpaper over a normal photo. |
| 5 | Dither as a transition | Halftone dots appear in the halo band between white and black, not across the whole frame. | Default `--dither band`: ordered marks only inside the transition band, switching between the band edges so gradients stay smooth. Outside the band the tone is kept. `full` is for strict binary and terminal assets. |
| 6 | Ornament | Thin white line art: four-point sparkles of different sizes, a gothic cross, cybersigil thorns, filigree scrolls, chains of dots. Sparse, asymmetric, and at least one piece is cut off by the edge. | At most five ornaments per view. One cropped by the edge. One-pixel strokes. Never under a control, over interface text, or in a focus path. |
| 7 | Voice | Titles are thin serif, wide-tracked, small against the canvas, uppercase or all-lowercase. A tiny tracked tracklist under the title. A micro "all rights reserved" line at the foot. One title carries a ghost echo, a second copy offset and faint. A single word may run vertically. | Serif is the voice, mono is the instrument. One display title and one voice list per view. Interface text, labels, and controls stay mono. Display copy is short, cold, and declarative. No exclamation marks, no cute. |
| 8 | Composition | Black mass on one side, subject on the other, cropped at the edge, never centered. The title crosses into the image. Everything loses its edge into the void. Two covers carry a cold cast: blue in the void, cyan in the white. | Put the subject at an edge. Let the copy overlap the light with a ground-colored fade behind it. Tint is opt-in, `cold` only, applied to the whole view. |
| 9 | Carving | Light sculpts the form. The Captivation face is blown on one side and gone on the other. Forms are cut by light, not modeled by it. | Use a hard key light from one side, `--key` in the tool when the source is flat. A face half white, half void is the target, not even exposure. |
| 10 | Relic | The covers stay monochrome, but the paradigm allows one small color that punches through: green eyes, a crimson mark, a faint gold rim. | At most one hue per view, under 5 percent of the art, kept with `--relic`. Art and one ornament only. Chrome never takes it. |

## Iconography

The celestial vocabulary stays, under strain: wings, often torn; halos,
often broken; falling feathers; gothic arches; thorns and cybersigils;
chains. Fallen rather than pure. Use it only where the art has a role and no
subject was supplied, one motif per piece. Functional UI never grows wings.

## Per-cover notes

**01 Butterflies.** The brightest cover. Three blown white butterflies, motion-
blurred, over black. Tribal chrome shapes top-left, a cross and filigree top-
right, scattered sparkles in four sizes, a ghosted page of book text at about
8 percent white as texture, a halftone comb across the whole frame, and a small
mark in the corner. Lesson: the ornaments are many but thin, and they sit in the
black, not on the subject.

**02 Captivation.** Darkest cover. Half the frame is black with two hairline
scratches. The face enters from the right, blown on one side, hair strands white
on black. The title is tracked serif caps at about 40 percent of the width, with
a four-line tracklist and a micro metadata line under it. Lesson: the type block
is small, left-aligned, and the title overlaps the hair.

**03 Jane.** Cold cast throughout. A figure from behind, skin and dress clipped
to blue-white. Bokeh lights, scratches, dust. Two cybersigil line drawings, one
cropped by the left edge, and a vertical ornamental word on the right. Lesson:
the tint applies to everything, and the vertical word is an ornament, not a label.

**04 Poison tearz.** Lowercase tracked serif title with a ghost echo. Hair hides
the face. Skin is clipped, the rest is grain and a faint scanline comb. Slight
cold cast. Lesson: one title, one effect, and the whole frame is one tone family.

## Measured signature

Values from the supplied files. The whitewash tool prints the same three numbers
for every conversion so a result can be compared to the look.

| Cover | At or under 24 | At or above 230 | Midtone 60 to 180 | Blue minus red |
| --- | ---: | ---: | ---: | ---: |
| 01 | 43.3% | 11.3% | 15.5% | 0 |
| 02 | 79.9% | 5.3% | 7.1% | 0 |
| 03 | 56.0% | 4.1% | 19.2% | +2 |
| 04 | 66.7% | 3.4% | 12.6% | +6 |

Target for a hero asset: void share at least 40 percent, white share 3 to 12
percent, midtone share under 20 percent. Ambient assets use the same shape with
`--peak 0.3`, so their white share is zero by design.

## What this look is not

- Not pastel, lace, cherubs, or soft clouds. That is the old meaning.
- Not a flat grayscale filter. Midtones are gone, white glows, black has grain.
- Not evenly lit. If both sides of a face are the same gray, carve it.
- Not a palette. One relic, or none.
- Not a dark dashboard with a glow. The chrome has no glow.
- Not a photo with a dot overlay. The dots come from the tone map.
- Not a sticker sheet. Five ornaments is the ceiling, not the target.
- Not a mascot. A butterfly in a reference is not a butterfly in every project.
