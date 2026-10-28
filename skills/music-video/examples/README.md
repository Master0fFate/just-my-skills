# Reference build: "Been Alone Until You" — prlxx

The video this skill was distilled from: 1080×1920, 60 fps, 3:43, 22 scenes, 126 BPM. Use it to see what the bar looks like in code and to borrow proven patterns.

- `been-alone-until-you/DIRECTION.md` — the full creative direction that five parallel scene workers built from. The best example of how specific a direction doc should be.
- `been-alone-until-you/scenes/` — every scene component plus helper folders (`world/`, `hooks/`, `chorus/`, `verse1/`, `verse2/`). `concept.md` §8 maps each archetype to its files.

How to use them:

- They import from `../lib/*`, `../components/*`, `../config` exactly like a project made from `assets/starter`, so a helper (e.g. `hooks/Tunnel.tsx`, `chorus/Flatline.tsx`, `world/Tower.tsx`) can be copied into a new project's `src/scenes/<folder>/` and adapted.
- They reference that song's lyric line ids and, in a few places, its words (callbacks, the split-flap target word, counters). Replace those with the new song's ids and words — never ship another song's lyrics.
- Colors were renamed to the starter's names (`color.accent`, `color.accentHi`, `color.accentDeep`); some scenes also import `SAFE`, `WIDTH`, `HEIGHT`, `FPS` from config, which the starter provides.
- They were written for 9:16. For other aspects, re-check layouts that use absolute pixel positions.
- Several scenes use photo plates (`room`, `ceiling`, `door`, `sink`, `counter`, `blinds`) that are not shipped; generate your own or remove the `Plate` layer.
