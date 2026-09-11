---
name: angelcore-design
description: >-
  Apply a general angelcore design language across images, identity, covers,
  print, fashion direction, motion, websites, applications, and terminal tools.
  The default for this brief is an ethereal, monochrome, gothic-leaning
  Angelcore interpretation with nostalgic image reproduction. Define light,
  material, crop, spacing, and image treatment. Do not infer a literal subject
  from the style name. Prefer ASCII for character-based images and interface
  marks. No default angels, wings, halos, religious mascots, or fixed layouts.
metadata:
  version: "4.0.0"
  scope: "general visual design; not a TUI-specific skill"
  character-default: "printable ASCII"
---

# angelcore Design

## The core rule

**Style is not subject. Angelcore does not mean "draw an angel."**

Apply the visual language to the content that the project needs. Do not
replace that content with an angel, a pair of wings, a halo, a cathedral,
or any other symbol derived from the style name.

This is a general design skill. It does not prescribe an app, a layout,
a software stack, or a recurring illustration. The coding TUI supplied beside
this skill is one test application. Its layout and test images are not part
of the style definition.

### Plain-language brief

> Familiar content feels slightly distant, delicate, and suspended in light.
> Pale detail meets deep shadow. A close crop or a missing edge leaves some
> of the image unresolved. Old digital reproduction breaks the image into
> deliberate marks. Space and type stay calm. The result has a restrained
> gothic edge, without becoming a horror scene or a religious illustration.

Use this explanation with the style name. Do not rely on a model knowing
an internet label or a specific version of that label.

The default here is the user's **monochrome, gothic-leaning Angelcore / angelcore
brief**. It is a project interpretation, not a definition of all angelcore,
Angelcore, goth, emo, or associated music. No lifestyle, religion, gender,
or preferred software follows from liking this style.

## 1. Priority order

Resolve conflicts in this order:

1. The actual task and the user's explicit exclusions.
2. Clear content, useful behavior, and access needs.
3. Light, contrast, material detail, and composition.
4. Reproduction treatment, such as ASCII or pixel dithering.
5. Optional ornament.

Never damage a higher priority to satisfy a lower one. No amount of
atmosphere makes unreadable code useful.

## 2. Separate the five decisions

| Decision | Question | Example |
| --- | --- | --- |
| Subject | What does the project need to show? | A supplied product photo; a music release; no image |
| Style | How should it feel? | Delicate, distant, quietly gothic, light against dark |
| Treatment | How is the content reproduced? | Grayscale preparation, lost edges, ordered ASCII dither |
| Medium | What are its real constraints? | Paper, pixels, fabric, motion, character cells |
| Structure | How does the audience use it? | Read a poster; inspect a change; choose a command |

A style request does not authorize changing the subject. A texture request
does not authorize adding an illustration. A terminal demonstration does
not turn the general skill into a terminal skill.

Before making anything, write this short working brief:

```text
Output and purpose:
Existing or supplied content:
Image role: needed / optional / none
Subject: chosen for this project, not inferred from the style name
Light: source, direction, brightest detail, and lost edge
Material or memory cue:
Reproduction: ASCII / 1-bit pixels / print / other
Structure: native to the requested medium
Explicit exclusions:
```

Use context already given. Do not ask the user to repeat the brief.

## 3. Subject policy: no built-in mascot

### Default exclusions

Do not add angels, cherubs, wings, halos, saint statues, holy eyes,
crucifixes, feathers, altar scenes, or religious lettering as shorthand
for Angelcore. Do not replace one repeated angel with a repeated moon,
flower, window, cross, or curtain.

A literal subject is allowed only when the current project explicitly
requests it, or when it is already in content that the user asks to retain.
An earlier general mention of crosses is not a command to insert a cross
in every later object.

These are exclusions for **automatic art direction**, not a ban on users'
subjects. Keep the requested subject when it is explicit.

### Select content in this order

Use the user's supplied image first. Next, use imagery that is relevant
to the project. Only then consider a material or light study as optional
atmosphere. Use no image when none earns its place.

A photograph of an ordinary object can carry this style through its light,
crop, and reproduction. It does not need a sacred subject. A title-only
composition can also carry the style without pretending to be an image.

### No repeated-stamp rule

Do not put the same decorative image on the home screen, file view, settings,
review panel, poster, and cover. Change the image role with the task.

For a series, retain treatment and type relationships. Vary crop, scale,
placement, and relevant subject. A purposeful identity mark can recur;
an unrelated illustration must not become one by accident.

## 4. The style grammar

### 4.1 Light: specific, not a glow effect

Choose where light enters and what it touches. A small bright edge can
carry more atmosphere than a large white object. Keep at least one readable
material detail near that edge. Let the far edge disappear into shadow
when the image permits it.

Prepare soft transitions in the source. Then reproduce them with mark
density. Do not put a CSS glow behind every panel or blur useful text.

Good decisions: an overexposed fold, a thin reflection, a washed-out
surface edge, or pale detail partly lost in shadow. These are alternatives,
not a mandatory subject list.

### 4.2 Delicacy: detail held by empty space

Use fine detail next to a plain support. A textured crop can sit beside
clear text. Closely spaced marks can dissolve into a larger unmarked area.
Use a few exact alignments to keep the result stable.

Do not confuse delicacy with faint text, tiny buttons, or a very thin font.
Reading contrast remains strong.

### 4.3 Distance: leave one thing unresolved

Choose one controlled form of uncertainty: an incomplete crop, a lost
edge, distant detail, or a slight mismatch between scale and context.
Do not stack every strange effect.

The uncertainty belongs in the image or composition. Labels, actions,
reading order, code, and status must be clear.

### 4.4 Gothic tension: contrast without costume

Keep a little weight beside the softness. Use a deep field, a narrow
bright accent, worn detail, a long vertical rhythm, or a restrained
historic type influence when the medium supports it.

Do not default to blackletter, spikes, chains, horror faces, red text,
or a cathedral. Gothic tension is a visual relationship here, not a
required set of objects.

### 4.5 Digital memory: one coherent reproduction limit

Choose a reproduction system that explains the marks. For this brief,
prefer ASCII coverage dithering for text surfaces and a true one-bit
raster for pixel surfaces.

Keep the texture still and tied to the source. Do not combine fake CRT
lines, random glyph rain, VHS errors, dust, and scan noise. Nostalgia is
not an excuse to use every filter at once.

## 5. Palette and tone

The default decorative image has one foreground ink and one background
ink: white and black. Intermediate tone comes from coverage and spacing.

Useful interface text may use a small neutral-gray hierarchy. Keep the
brightest art mark and the foreground ink separate from metadata colors.
Do not dim important content to make the art appear brighter.

Use `references/tokens.json` as starting values, not a proof of style.
Dark mode alone is not the result. A light-ground version is also valid:
reverse the ink roles while keeping the image relationships intact.

No color accent is needed for this brief. Do not introduce neon, pastel
pink, or gold without a new project requirement. State labels must also
work without color.

## 6. Image treatment

### The source decides the image

The conversion must follow real source values. It must not create a new
figure, insert a symbol, or fill the frame with decorative random text.

Use this sequence:

1. Establish the source, permission, task relevance, and crop.
2. Make a grayscale light map. Adjust shadow and highlight limits on purpose.
3. Choose the final display size. Keep two or three useful details at that size.
4. Resize with the target pixel or character shape in mind.
5. Apply the chosen quantization and dither method.
6. Inspect the actual output at normal size. Revise the crop before adding detail.

Do not call a dotted overlay "image dithering." Do not call a smooth gray
picture "two-tone." Do not call an ASCII coverage ramp a literal one-bit
pixel map. The rendering guide keeps these cases separate.

### ASCII is the default for text images

Use printable ASCII characters, with codes 32 through 126. A practical
starting ramp is:

```text
 .,:;ox%#@
```

The first character is a space. Use fewer levels when the image or font
needs less detail. Order marks by increasing visual density. The exact
coverage depends on the font, so inspect the output rather than treating
this order as a universal measurement.

Use neighboring glyph levels and an ordered threshold to represent the
source. Preserve dark gaps. Avoid making a solid field of `@` characters.
Do not distribute random symbols over a normal image.

For a stricter two-state test, use a space and `#`. The separate pixel
renderer must emit only binary values.

### No required Unicode art or special fonts

Do not require Braille patterns, block shades, box-drawing characters,
emoji, private-use icons, Powerline symbols, or a patched font. Do not
silently upgrade to Unicode because it has more detail.

In a text interface, use ordinary marks such as:

```text
> selected      [ok] complete      [!] error
/command        @file             + added
- removed       | prompt edge     ... working
```

These characters are syntax, not religious decoration. A plus sign is
not a replacement mascot.

Keep user text and file content separate from interface decoration. Do
not delete non-ASCII content to pass a visual audit. Preserve it internally.
Provide an explicit display fallback when the host cannot show it. The
bundled demo uses readable escape sequences in its fixed-cell output.

## 7. Composition without heavy boxes

Use space, alignment, scale, and a limited contrast hierarchy before
adding borders. Let the main task establish the reading path.

Avoid repeated closed panels. Avoid putting each image inside a small
card. Do not replace visible borders with almost-black rectangles and
call the layout open.

A border is valid when it explains a real boundary, selection, table,
input, or modal. Prefer one local cue over a frame around every region.

Do not make every output mostly empty. A poster can use a large pause;
a working tool needs room for its work. Reduce decorative art before
hiding essential content. The image should not become the largest object
on every screen by default.

### Image budget by role

For a cover, the image can be the subject. For a workspace entry screen,
it can establish tone. For an active task, it should be compact and useful,
or absent. For a review, error, settings, or dense file view, omit it unless
it directly explains the task.

These are role choices, not a required set of app screens.

## 8. Typography and language

Choose type for the medium. A real terminal needs fixed character cells.
A printed title, label, or cover can use a suitable serif, bitmap face,
or another restrained type choice. Do not force terminal fonts on every
medium. Do not bring large website headings into a terminal.

Keep functional text plain. Use weight, case, width, and spacing before
adding another font. Reserve expressive lettering for short titles.
Never use styled Unicode alphabets as fake fonts.

Use real task names: Files, Review, Build, Search, Settings. Do not rename
every control Relic, Choir, Invoke, or Shrine. Mood must not depend on
religious product names or invented rituals.

## 9. Motion and behavior

Stillness is the default. Do not animate image noise, flicker the text,
or require a long entrance sequence. Keep commands and state changes fast.

A cursor and a progress indicator can be enough. Important information
must remain understandable without motion. Respect reduced-motion settings
when the medium offers them. Do not add sound without a request.

A product needs real behavior, not decorative command text. Keep any local
prototype state, sample output, and missing backend clearly identified.

## 10. Transfer the style, not the layout

| Output | Keep native | Apply the style through |
| --- | --- | --- |
| Image or cover | Subject, crop, title hierarchy | Light, lost detail, image reproduction |
| Poster or print | Reading distance and print limits | Ink density, clear type, deliberate empty areas |
| Identity or packaging | Recognition and small-size use | Type roles, image rules, limited mark system |
| Fashion direction | Garment function and real material | Contrast, texture, layering, image direction |
| Website or GUI | Navigation and accessible controls | Quiet hierarchy, relevant imagery, sparse boundaries |
| CLI or TUI | Commands, cells, keyboard flow | ASCII images, clear text, a few local state marks |
| Motion | Time, continuity, legibility | Stable texture and measured changes in light |

The general skill remains useful when the entire demo folder is deleted.
Implementation notes for a terminal belong in the application, not in the
core identity of this skill.

## 11. Working method

**Read the content.** Identify what the project needs to communicate before
choosing an image. Keep the explicit exclusions in view.

**Choose a treatment.** Describe the source light, the contrast, and the
reproduction system in ordinary words. The name alone is not sufficient.

**Test the image or no-image option.** Do not commit to a decorative asset
before seeing its final-size result. Compare at least two relevant subjects
when the brief leaves the subject open. Do not build two versions of the
same mascot and call that exploration.

**Build the real object.** Respect its own structure. A TUI stays a TUI.
A cover stays a cover. Apply the style through the shared rules above.

**Subtract.** Remove unexplained symbols, duplicate art, weak labels,
unrelated texture, and unnecessary frames.

**Check transfer.** Replace the subject with another relevant one, or test
a no-image composition. The style relationships should survive. For a
reusable skill, also inspect a second medium when practical.

## 12. Release gates

Reject the work if any of the following is true:

- The style name caused an unrequested angel or other literal illustration.
- The same decorative asset appears in every solution or state.
- Removing the name, symbol, or mascot removes the whole visual identity.
- The only remaining style choice is black and white.
- Dither marks do not follow the source image.
- ASCII is only a fallback behind a Unicode-first design.
- Default text-interface output needs special glyphs or a patched font.
- A dense tool became a landing page, or every object became a terminal.
- Useful text, controls, content, or state became less clear for atmosphere.
- Test results or platform support are claimed without the corresponding test.

Use `references/quality-check.md` before delivery. Visual approval and
software tests are different checks. A passing test suite does not prove
that a person will like the result.

## 13. Handoff

Deliver the reusable skill separately from the requested example. Include
editable sources, a short change record, source credits, a normal-size
preview, and the actual limits of any prototype.

Do not ship a fixed hero image as part of the style's required assets.
Optional renderer test inputs belong beside the example and must be labeled
as such. Do not describe a synthetic light map as a photograph.

## Read as needed

- `references/art-direction.md`: subject choices, variations, and examples.
- `references/image-treatment.md`: ASCII, binary raster, sizing, and conversion.
- `references/quality-check.md`: source, visual, medium, and compatibility checks.
- `references/tokens.json`: neutral starting values.
- `tools/ascii_dither.py`: reusable source-driven renderer and converter.

## Compact instruction for another model

```text
Apply an ethereal monochrome angelcore / Angelcore treatment to the supplied
content. Keep the actual subject. Use pale detail, deep shadow, a deliberate
crop, delicate texture, restrained gothic tension, and nostalgic reproduction.
Do not infer an angel, wings, halo, cross, or any other literal illustration
from the style name. No recurring mascot. For character-based output, use
printable ASCII and source-driven dithering. Use ordinary ASCII interface
marks and no special font dependency. Keep text clear and the structure native
to the requested medium. Use imagery only where it has a role. A TUI is only
one possible application of this general style.
```
