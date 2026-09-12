# Visual system

## The five relationships that must survive

**Geometry:** closed corners are square; surfaces have no decorative depth.
**Hierarchy:** clear labels are brighter than ambient art, which is brighter than
its ground. Do not make meaningful content follow the ambient-art limit.
**Density:** functional regions are compact; the main work has room. Empty space
and dense rows must coexist. Do not spread every item across a large card.
**Boundary:** use one line to explain one separation. Do not frame everything.
**Texture:** all image marks come from one source map and one fixed reproduction
system. Do not add a second unrelated texture for "more style."

The identity must remain visible with the image removed. If it does not, fix
type, spacing, surface contrast, and control syntax before adding another image.

## Roles, not an unlimited grayscale palette

`tokens.json` is the machine-readable source. `../assets/angelcore.css` uses the
same values. The audit checks them together. Color roles:

| Token | Purpose | Prohibited use |
| --- | --- | --- |
| bg | Page and open work field | Do not replace it with a full-page gradient. |
| surface | Local support, fields, rail details | Do not turn every section into a card. |
| selected | A selected list row or local state | Do not use it as the only selection cue. |
| rule | Nonessential separators | Never the only visible boundary needed to find a control. |
| control | Input outline, necessary state geometry | Do not use it for low-priority ambient art. |
| muted | Readable metadata and secondary labels | Do not lower opacity on useful text. |
| text | Main text | Do not use image masks on it. |
| strong | Current item, focus, important value | Avoid large unneeded white areas. |
| art-ink | Ambient marks only | Never a readable label or state indicator. |

A faint separator may be acceptable when spacing and headings already explain
the regions. An input whose location depends on its outline uses `control`, not
`rule`. A decorative hairline and an interactive resize handle are different
objects. Give a handle a clear affordance and a usable hit area.

## Typography

Use the system mono stack in the bundle unless the project already has a suitable
licensed family. Do not ship or assume access to a proprietary font. Font files
are not included. Render at normal size before adjusting the scale.

Use sentence case for readable labels. Small uppercase section labels may use
slight tracking. Do not use wide tracking on body text. Use real italics or a
short serif brand word only when the host identity calls for it. Do not use
Unicode look-alike alphabets as fonts.

A terminal font and a website font do not have to be identical. Their density,
line rhythm, modest scale, and restrained hierarchy must agree.

## Layout routes

**Workspace:** navigation / main work / optional inspector is allowed. Keep the
main work flexible with `minmax(0, 1fr)`. Rails scroll independently only when
that helps use. Use normal document flow on smaller screens. Remove ambient art
from active dense work. Preserve a route to each hidden panel.

**Website:** use normal navigation, article sections, linked records, and forms.
Use lists, thin rules, and shared alignment instead of a grid of rounded cards.
Do not create a fake shell prompt around marketing copy. An entry illustration
is optional. Reading text stays comfortably larger than tool metadata.

**Component:** use only the pieces the component needs. A button does not need
its own title bar. A pricing option can be a ruled row. A modal may be a square
outlined surface because it has a real boundary and a focused task.

**CLI:** prioritize stable column order, meaningful labels, plain redirected
output, and useful exit status. Do not produce a full-screen frame for a command
that only needs three output lines.

**TUI:** use the host's cell grid and input model. Add a small viewport fallback.
Art is the first item removed when space is short. Test real input and cleanup
before describing the result as an interactive TUI.

## Replace these patterns

| Instead of | Use |
| --- | --- |
| Rounded action pill | Text button or square control with a visible focus outline |
| Large gray card grid | Ruled rows, headings, and shared column alignment |
| Green success / red error alone | `[ok] Saved` / `[!] Save failed` plus a specific next step |
| Smooth dim photo with dot layer | Quantize a real tone map, then map its binary marks to two inks |
| Random punctuation behind every page | One relevant image with a defined role, or no image |
| 9px labels to match the screenshot | Readable labels with compact spacing and a larger hit area |
| Permanent large background art | Idle-only art; remove it during dense active work |
| Fake command links | Real links, buttons, input, and clearly labeled local demo behavior |

## Responsive rules

At wide widths, preserve the chosen layout without forcing the observed reference
ratios. At middle widths, reduce rail widths or move the inspector below the
main content. At narrow widths, show a single reading column. Use an explicit
control to open secondary regions when they must be hidden.

Do not use `transform: scale()` on an app, set a tiny root font, or apply
`overflow-x: hidden` to conceal errors. Allow long names to wrap in descriptive
text. Ellipsis is allowed in a dense row only when users can reach the full name.
Keep numbers aligned with tabular figures. Tables and code may scroll locally.

Increased contrast or forced-color modes may remove decorative art and replace
inks with system colors. This is an access mode, not an unrequested theme change.
