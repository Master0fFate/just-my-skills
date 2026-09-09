# Optional Fibonacci direction

Use when the user asks for Fibonacci/golden-ratio design or when a calm proportional direction fits a new visual brief. Existing design-system tokens and explicit aesthetics take precedence. This is a style option, not a mandatory scale for all interfaces.

Use spacing steps 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233. Related items get smaller gaps than separate groups. Choose a dominant and supporting mass; `1.618fr 1fr` offers a golden split, while equal columns remain appropriate for genuinely equal content. Stack according to task priority on narrow screens.

Use a readable body size, roughly 55-89 characters for spacious prose, and a compact type hierarchy. A product tool can use a tighter scale than an editorial page. Real italics, tabular numerals for data, optical alignment, and deliberate weight selection matter more than exact ratios. Avoid arbitrary extra typefaces.

Color roles are field, structure, accent, muted text, and state/data. A mineral palette with one accent is one calm option; retain readable contrast and meaningful categorical colors. Use a warm paper/ink pairing, a restrained dark field, or an editorial blue-green accent when the brief supports it. Do not prescribe a palette from habit.

Prefer varied grouping over identical rounded cards everywhere. Consider near-golden media crops such as 3:2, 8:5, or 13:8 when they suit the actual image. Keep decorative ratios and spiral diagrams out of the product unless requested.

The [starter tokens](../assets/fibonacci-tokens.css) are optional and scoped to `.fibonacci-theme`. Select semantic aliases appropriate to the project instead of introducing a competing global token system. The scale factor controls spatial values only; type remains independently readable.

Check containment and responsive behavior using [layout-and-resilience.md](layout-and-resilience.md). Diagnose generic layouts by their weak hierarchy or missing product story, not by counting fashionable patterns. Fix the cause within scope. A familiar navigation pattern, common font, equal comparison columns, or user-requested gradient is not automatically a defect.
