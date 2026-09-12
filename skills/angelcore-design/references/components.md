# Component contracts

Use these contracts in the host framework. The bundled HTML is a portable
reference implementation, not a requirement to use plain JavaScript in all apps.

## Actions

An action has a real button or link, a useful name, a hit area, and a visible
focus state. Brackets are display syntax. They do not replace HTML semantics.
Default: clear text on open ground. Hover: strong text and a local surface change.
Focus: square 2px outline, separate from selected state. Disabled: native disabled
state plus plain wording when the reason matters. Busy: preserve width, prevent
duplicate submission, and say what is happening. No spinner is required.

Use a white fill only for a rare dominant action or for a strong selected state.
Do not fill every control. Use words such as Open, Apply, Search, and Close.

## Navigation and lists

Use `nav`, a list, and links for page navigation. Mark the current link with
`aria-current="page"` and a visible `>`. For a list of local records, use actual
buttons or an established list pattern. Align counts to one edge. Keep the
current row distinct from a hovered row. Use a single local fill and marker.

A file disclosure uses a real disclosure button with `aria-expanded`, or native
`details` and `summary`. Do not assign `role="tree"` unless you implement the
whole tree keyboard model. A simple nested list is better than an incomplete tree.

## Tabs

Use tabs only when the object really has tab panels. Implement the active panel,
`aria-selected`, focus order, arrow keys, Home, and End. Otherwise use ordinary
buttons or page navigation. Appearance alone is not a reason to add ARIA roles.

## Search and fields

Keep a visible label, a square input, and an optional help line. A placeholder
is an example, not the only label. Use the `control` boundary token when the
field's border is needed to find it. Keep text contrast after a value is entered.
Clear buttons need a name. Search must filter real data or state its exact scope.

For errors, retain the input value, use a direct message, set `aria-invalid`, and
connect the message with `aria-describedby`. Do not announce every keystroke.
Provide an error summary when a long form needs one. Use native input types when
appropriate. Do not change a password field into plain text for this style.

## Select, checkbox, and disclosure

Prefer native controls unless the task needs more. Keep their labels clickable.
Use neutral accent color where supported. A checked control must differ by shape
or mark, not just shade. For custom appearance, preserve native input semantics,
keyboard use, forced-color support, and focus. Do not use a tiny clickable `x`
as the entire target. A disclosure title is an action, not a decorative heading.

## Data and review

Use a semantic table for tabular data. Keep a clear header, aligned numbers,
compact rows, and thin separators. Use a local scroll region when the table
needs two dimensions. Do not shrink the whole page to fit many columns.
Diff output uses `+` and `-` plus text or columns. Color may be absent entirely.
Meaningful charts must have readable axes, labels, and a text/table equivalent;
they do not use the ambient image token.

## Composer

Use a visible label, a real textarea or input, a stable action row, and a status
message. One top rule and one lower rule can define the region. A composer is not
a floating pill. Preserve multiline input. For chat, Enter-to-send must not
break IME composition or remove a way to insert a newline. Do not create a fake
AI reply; a local preview must say it is local and does not call a model.

## Dialog and command menu

A dialog may have a full square outline because it defines an actual boundary.
Use a native dialog or a complete accessible dialog pattern. Keep a visible name,
initial focus, Escape behavior, focus containment, and focus return. The backdrop
is a flat neutral layer, not blurred glass. Avoid closing data-entry dialogs on
an accidental backdrop click.

A command menu needs search, a result list, selection, keyboard use, Escape, and
an actual result after execution. Do not open an inert panel of command names.

## Status and empty states

| State | Visible pattern | Needed behavior |
| --- | --- | --- |
| Ready | `[ready]` or a simple state label | Avoid redundant live announcements. |
| Loading | `... Loading files` | Disable duplicate work, preserve stable layout, allow cancellation when supported. |
| Success | `[ok] Settings applied` | Report the scope: local, saved, or remote only when true. |
| Error | `[!] Could not open file` | Explain the problem and offer a real next step. |
| Empty | `No matching files` | Give a clear action such as Clear search. |
| Offline | `[offline] Local data only` | Do not suggest that remote changes were saved. |
| Disabled | A disabled control and clear reason | Do not make it keyboard-operable by accident. |

Errors, settings, and dense file states normally have no ambient art. Do not make
an empty state into a large illustrated card. A short useful sentence is enough.

## Minimum state test

For each interactive component, identify which states apply and test those
states. Do not render a decorative row containing the words "hover" and "focus"
and call that interaction testing. Test pointer, keyboard, long content, and
small width. The examples cover a selected subset, not every possible widget.
