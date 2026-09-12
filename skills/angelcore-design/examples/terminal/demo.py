#!/usr/bin/env python3
"""Small real terminal example. No network or filesystem mutation.

Default: a plain, pipe-safe snapshot. --interactive: a curses TUI on a supported
TTY. Interface marks and the display fallback are ASCII. --label retains the
original Python string; non-ASCII and control characters are shown as escapes.
"""
from __future__ import annotations

import argparse
import shutil
import sys
from typing import Sequence

FILES = ["index.html", "styles.css", "app.js", "notes.md", "tokens.json", ".gitignore"]
PREVIEWS = [
    ["<main class=\"ac\">", "  <h1>Field notes</h1>", "  <button>[open]</button>", "</main>"],
    [".ac {", "  --ac-bg: #090909;", "  --ac-text: #b8b8b8;", "  border-radius: 0;", "}"],
    ['const state = { view: "notes" };', "", "// Local sample source only."],
    ["# Working notes", "", "Keep the frame quiet.", "Keep the task clear."],
    ['{ "background": "#090909",', '  "radius": 0 }'],
    ["node_modules/", ".cache/", "dist/"],
]
VIEWS = ("files", "review", "empty", "error")


def display_ascii(value: str) -> str:
    """Explicit display fallback; do not mutate the original value."""
    out = []
    for char in value:
        code = ord(char)
        if 32 <= code <= 126:
            out.append(char)
        elif char == "\n":
            out.append("\\n")
        elif char == "\t":
            out.append("\\t")
        elif code <= 255:
            out.append(f"\\x{code:02x}")
        elif code <= 65535:
            out.append(f"\\u{code:04x}")
        else:
            out.append(f"\\U{code:08x}")
    return "".join(out)


def render(width: int = 80, height: int = 24, view: str = "files", selected: int = 0,
           label: str = "field-notes", interactive: bool = False) -> str:
    if width < 1 or height < 1:
        raise ValueError("Width and height must be positive.")
    if view not in VIEWS:
        raise ValueError("Unknown view.")
    selected = max(0, min(len(FILES) - 1, selected))
    if width < 32 or height < 10:
        lines = ["View too small.", "Resize or press q." if interactive else "Use at least 32 x 10 cells."]
        return "\n".join(line[:width] for line in lines[:height]) + "\n"
    lines = [f"Fate / {display_ascii(label)}", "[ready] Local sample data / ASCII display fallback", "-" * width]
    lines.append("  ".join(("> " if item == view else "  ") + item.title() for item in VIEWS))
    lines.append("")
    if view == "files":
        file_rows = [("> " if i == selected else "  ") + name for i, name in enumerate(FILES)]
        preview = [f"{FILES[selected]} / sample", ""] + PREVIEWS[selected]
        if width >= 110:
            lines.append("FILES".ljust(31) + " | PREVIEW")
            for i in range(max(len(file_rows), len(preview))):
                left = file_rows[i] if i < len(file_rows) else ""
                right = preview[i] if i < len(preview) else ""
                lines.append(left.ljust(31) + " | " + right)
        else:
            lines.append("FILES")
            lines.extend(file_rows)
            if height >= 22:
                lines.extend(["", "-" * width] + preview)
    elif view == "review":
        lines.extend(["REVIEW / sample diff", "", "  file: styles.css", "- border-radius: 12px;", "+ border-radius: 0;", "+ --ac-bg: #090909;", "", "[ok] Example only. No file was changed."])
    elif view == "empty":
        lines.extend(["FILES", "", "No matching sample files.", "Use Tab to change the view." if interactive else "Use --view files to show the sample list."])
    else:
        lines.extend(["[!] Error-state example", "", "This is a display fixture, not a real file error.", "The source remains unchanged.", "", "Use Tab to return to another view." if interactive else "Run with --view files to inspect sample content."])
    footer = "[j/k] select  [Tab] view  [q] quit" if interactive else "[sample] Plain snapshot; use --interactive for keyboard input."
    lines = lines[:height - 2]
    lines += [""] * (height - 2 - len(lines))
    lines += ["-" * width, footer]
    return "\n".join(line[:width] for line in lines) + "\n"


def run_interactive(label: str) -> int:
    if not (sys.stdin.isatty() and sys.stdout.isatty()):
        print("error: --interactive requires a real TTY. Use plain output when piping.", file=sys.stderr)
        return 2
    try:
        import curses
    except ImportError:
        print("error: curses is not available on this host. Plain output still works.", file=sys.stderr)
        return 2

    def app(screen):
        view_index = 0
        selected = 0
        old_cursor = None
        try:
            try:
                old_cursor = curses.curs_set(0)
            except curses.error:
                pass
            screen.keypad(True)
            while True:
                height, width = screen.getmaxyx()
                text = render(width, height, VIEWS[view_index], selected, label, True)
                screen.erase()
                for row, line in enumerate(text.splitlines()):
                    if row >= height:
                        break
                    # Do not write the bottom-right cell; some terminals return ERR.
                    limit = width - 1 if row == height - 1 else width
                    if limit > 0:
                        try:
                            screen.addnstr(row, 0, line, limit)
                        except curses.error:
                            pass
                screen.refresh()
                key = screen.getch()
                if key in (ord("q"), ord("Q"), 27):
                    break
                if key in (ord("j"), curses.KEY_DOWN):
                    selected = (selected + 1) % len(FILES)
                elif key in (ord("k"), curses.KEY_UP):
                    selected = (selected - 1) % len(FILES)
                elif key == 9:
                    view_index = (view_index + 1) % len(VIEWS)
                # KEY_RESIZE also reaches the next redraw.
        finally:
            if old_cursor is not None:
                try:
                    curses.curs_set(old_cursor)
                except curses.error:
                    pass
    try:
        curses.wrapper(app)
        return 0
    except KeyboardInterrupt:
        return 130
    except curses.error as exc:
        print(f"error: terminal initialization failed: {exc}", file=sys.stderr)
        return 2


def main(argv: Sequence[str] | None = None) -> int:
    size = shutil.get_terminal_size((80, 24))
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--interactive", action="store_true")
    parser.add_argument("--width", type=int, default=size.columns)
    parser.add_argument("--height", type=int, default=size.lines)
    parser.add_argument("--view", choices=VIEWS, default="files")
    parser.add_argument("--selected", type=int, default=0)
    parser.add_argument("--label", default="field-notes")
    args = parser.parse_args(argv)
    if args.interactive:
        return run_interactive(args.label)
    if not 1 <= args.width <= 300 or not 1 <= args.height <= 150:
        parser.error("Use width 1-300 and height 1-150.")
    sys.stdout.write(render(args.width, args.height, args.view, args.selected, args.label))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
