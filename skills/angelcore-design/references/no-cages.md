# No cages

This is a hard contract. It exists because models keep boxing every field,
button, chip, tab, and group in a mid-gray rectangle. On `#090909` that rectangle
reads as a white whiteboard. That look is forbidden.

## Forbidden

Do not ship any of these as the resting look of an in-page UI:

- A 4-sided border on every input, textarea, select, button, chip, badge, tab,
  group box, progress bar, or status label.
- `--ac-control` (`#737373`) used as a default field or button border. Against
  `--ac-bg` it is a white cage, not a quiet edge.
- `#909090`, `#b8b8b8`, or `#eeeeee` strokes around chrome.
- A second box around a region that already has a separator, heading, or label.
- Native 3D bevels, sunken frames, or Light/Midlight palette roles left white
  on Qt, Win32, AppKit, GTK, or similar. Those frames are whiteboards.
- Treating “inputs must meet 3:1 contrast” as “outline every widget in
  `--ac-control`.”

If a screenshot of the idle form looks like a stack of empty whiteboards, it
has already failed.

## Required resting chrome

| Object | Resting chrome | Focus / open |
| --- | --- | --- |
| In-page field with a visible label | No box, or one 1px `--ac-rule` hairline on a single side (usually bottom) | 2px focus outline with offset, or a 1px accent/strong hairline on that same side |
| Button, tool button, tab, chip, badge | No resting border. Text or icon on open ground | Hover: `--ac-selected` fill. Focus: 2px outline with offset, not a light box |
| Checkbox / radio mark | Small native or custom mark. `--ac-control` may color the mark itself | Shape or check, not a card around the row |
| One region split (nav / work, form / log) | One `--ac-rule` hairline between regions | Do not also box each child |
| Floating dialog, menu, tooltip, combobox popup | One 1px `--ac-rule` square outline. It left the page, so it may have a frame | Do not use `--ac-control` for that frame |
| Modal / isolated unlabeled field | One square outline is allowed for that one object | Still not a cage around every sibling |

Labels find controls. Alignment finds rows. Focus finds the active control.
A resting 4-sided stroke is not an accessibility strategy.

## Token roles for edges

| Token | Allowed on edges | Forbidden |
| --- | --- | --- |
| `--ac-rule` `#2b2b2b` | Hairlines, underlines, one region split | Useful text |
| `--ac-control` `#737373` | Checkbox/radio geometry, resize handles, other *small* necessary marks | Default 4-sided border on fields, buttons, cards, chips, tabs, group boxes |
| `--ac-strong` | Focus outline, rare primary fill | Resting cages |
| User hue accent, if explicitly required | Focus, primary action, progress, checked switch only | Boxing the whole form |

## Desktop toolkits

When the host is Qt, WinForms, WinUI, AppKit, GTK, or similar:

1. Do not trust the native theme. Windows Light/Midlight roles paint white
   bevels even after a dark stylesheet.
2. Set a flat style (Fusion or equivalent). Set Light, Midlight, Mid, Dark, and
   Shadow palette roles to `--ac-bg` or `--ac-rule`, never white or `#e0e0e0`.
3. Turn sunken frames off: `setFrame(False)`, `QFrame.NoFrame`, flat group boxes.
4. Then apply the stylesheet. Stylesheet color alone does not kill native cages.
5. Verify with a real window grab. Offscreen dummy fonts and unstyled native
   frames are not proof.

## How to check

At normal size, idle state, no focus ring:

1. Count 4-sided rectangles that are not the window, a true dialog, or a menu.
2. If that count is “every control,” fail.
3. Remove focus from the first field. If the form still looks outlined in
   light gray, fail.
4. Compare an input to the open ground. If the input is a pale board and the
   ground is black, fail.

Do not “fix” this by rounding the cages, greying them to `#737373`, or adding
glow. Delete the extra sides.
