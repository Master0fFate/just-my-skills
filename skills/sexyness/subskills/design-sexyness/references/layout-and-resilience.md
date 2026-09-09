# Layout and resilience

Use for responsive design, layout bugs, hardening, onboarding, or design-system extraction. Select cases that belong to the product's supported platforms and flows.

## Containment

Decide whether each relevant container is a fixed stage, a growing content stack, an adjacent rail, or a fixed/sticky fixture. Content growth is valid in a stack. A constrained stage needs deliberate wrapping or scrolling; clip decorative media, not essential controls or text.

Stress the layout with long unbroken strings, multi-line labels, wide tables, tall images, tiny content, larger type, and late-loading media. Use shrinkable flex/grid children (`min-width: 0`, and `min-height: 0` where needed), local scrolling for wide data, image dimensions/aspect ratios, and explicit overlay containment. Menus and dialogs must escape clipping ancestors through the platform's overlay mechanism or a portal.

Check six failure classes: nested growth, parent distortion, static drift, sibling displacement, wrap/resize failure, and unexplained movement. Hover, focus, loading, and selection must not unexpectedly change control geometry. Disclosure and validation may grow the document deliberately; do not freeze every container just to prevent movement.

Inspect phone and desktop, plus a relevant intermediate breakpoint. Plan sidebar collapse, table overflow, navigation, and content ordering. A smaller desktop screenshot is not a mobile design. Use screenshots and interactions; report unavailable rendering honestly.

## Real states

Cover default, hover/focus, active, selected, disabled, loading, empty, error, and success where applicable. Distinguish first-use emptiness, filtered zero results, and unavailable data. Give onboarding a path to the user's first useful outcome; allow skip/resume where appropriate and teach at the point of use.

Exercise network failure, timeouts, expired authentication, forbidden actions, validation failure, rate limits, and concurrent edits when they exist in the flow. Preserve entered data, keep recovery local, and avoid leaking raw server errors. Prevent duplicate submission and stale response overwrites. Client validation complements server enforcement.

For multilingual products, test expanded translations, RTL, CJK, emoji, localized numbers/dates/currencies, and plural rules. Use logical CSS properties and existing internationalization utilities; do not concatenate English grammar. Truncate only with a usable route to full content. Check the intended locale set rather than assuming one language is always longest.

For native apps, preserve platform navigation, safe-area and keyboard insets, system Back/dismiss gestures, native controls, and scalable type. Read the retained [iOS](../../../toolkits/impeccable/reference/ios.md) or [Android](../../../toolkits/impeccable/reference/android.md) reference only for the matching target. The bundle's scope and accessibility rules govern those references.

## Extracting a design system

Find the existing tokens and shared components first. Extract repeated patterns with shared meaning and real consumers; visual resemblance alone is insufficient. Separate primitive values from semantic roles. Define component states and supported variants, migrate affected call sites, verify visual and behavioral parity, then remove obsolete implementations created by the migration. Document usage in the existing project location. Do not build a speculative component framework.
