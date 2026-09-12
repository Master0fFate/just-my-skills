#!/usr/bin/env python3
"""Render and exercise the bundled web examples in Chromium.

This is a targeted behavior/layout test, not full WCAG conformance or a visual
preference benchmark. Run from any directory. Screenshots and JSON are written
to evidence by default. The temporary local HTTP server is stopped on exit.
"""
from __future__ import annotations

import argparse
import base64
import re
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import platform
import shutil
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SIZES = [(2048, 835), (1440, 900), (768, 1024), (390, 844), (320, 800)]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "evidence")
    parser.add_argument("--offline", action="store_true", help="Inline trusted local assets; no HTTP navigation is used.")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    screenshots = args.output / "screenshots"; screenshots.mkdir(exist_ok=True)
    checks = []
    def check(name, passed, details=""):
        checks.append({"name": name, "passed": bool(passed), "details": details})
        print(("PASS " if passed else "FAIL ") + name)
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
    thread = threading.Thread(target=server.serve_forever, daemon=True); thread.start()
    base = f"http://127.0.0.1:{server.server_address[1]}/examples/web/"
    def load_page(page, file):
        if not args.offline:
            page.goto(base + file, wait_until="networkidle")
            return
        path = ROOT / "examples/web" / file
        html = path.read_text()
        def local_asset(relative):
            asset = (path.parent / relative).resolve()
            if not asset.is_relative_to(ROOT.resolve()):
                raise ValueError("Asset is outside the bundle.")
            return asset
        html = re.sub(r'<link\b[^>]*href="([^"]+)"[^>]*>',
                      lambda m: "<style>" + local_asset(m[1]).read_text() + "</style>", html)
        html = re.sub(r'<script\b[^>]*src="([^"]+)"[^>]*></script>',
                      lambda m: "<script>" + local_asset(m[1]).read_text() + "</script>", html)
        html = re.sub(r'src="(assets/[^"]+\.png)"',
                      lambda m: 'src="data:image/png;base64,' + base64.b64encode(local_asset(m[1]).read_bytes()).decode() + '"', html)
        page.goto("about:blank")
        page.set_content(html, wait_until="networkidle")
        page.wait_for_function("Array.from(document.images).every(i => i.complete && i.naturalWidth > 0)")
    try:
        with sync_playwright() as playwright:
            executable = shutil.which("chromium") or shutil.which("chromium-browser")
            browser = playwright.chromium.launch(executable_path=executable, headless=True, args=["--no-sandbox"])
            version = browser.version
            context = browser.new_context()
            for file, name in [("index.html", "workspace"), ("archive.html", "website"), ("components.html", "components")]:
                for width, height in SIZES:
                    page = context.new_page()
                    page.set_viewport_size({"width": width, "height": height})
                    errors = []; page.on("pageerror", lambda error: errors.append(str(error)))
                    load_page(page, file)
                    page.screenshot(path=str(screenshots / f"{name}-{width}.png"), full_page=True)
                    overflow = page.evaluate("({viewport: innerWidth, page: document.documentElement.scrollWidth})")
                    check(f"{name} {width}px: no page-wide overflow", overflow["page"] <= overflow["viewport"] + 1, overflow)
                    corners = page.locator("button, input:not([type=checkbox]), select, textarea, dialog").evaluate_all("els => els.filter(e => getComputedStyle(e).borderTopLeftRadius !== '0px').map(e => e.id || e.tagName)")
                    check(f"{name} {width}px: square controls", not corners, corners)
                    targets = page.locator("button, a.ac-action, summary, input:not([type=checkbox]), select, textarea, label.ac-checkbox").evaluate_all("els => els.filter(e => { const r=e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24); }).map(e => ({id:e.id,tag:e.tagName,text:e.textContent.slice(0,50)}))")
                    check(f"{name} {width}px: tested targets at least 24px", not targets, targets)
                    check(f"{name} {width}px: no script error", not errors, errors)
                    if name != "workspace":
                        check(f"{name} {width}px: image-free transfer", page.locator("img, canvas").count() == 0)
                    page.close()

            page = context.new_page(); page.set_viewport_size({"width": 1440, "height": 900})
            load_page(page, "index.html")
            page.locator("#project-search").fill("no-match")
            check("Workspace search empty state", page.locator("#project-empty").is_visible())
            page.locator("#project-clear").click()
            check("Workspace clear search restores records", page.locator("#project-list button").count() == 8)
            page.locator("#project-list button").nth(1).click()
            check("Workspace project selection changes state", page.locator("#project-title").inner_text() == "mono-kit")
            page.locator("#project-list button").nth(0).click()
            page.locator("#file-search").fill("styles")
            page.locator("#file-list button").click()
            check("File filtering and preview work", "border-radius: 0" in page.locator("#file-content").inner_text())
            page.locator("#note-form button[type=submit]").click()
            check("Empty note shows linked error", page.locator("#note-error").is_visible() and page.locator("#note-input").get_attribute("aria-invalid") == "true")
            page.locator("#note-input").fill("Check the selected file.\n<img src=x onerror=alert(1)>")
            page.locator("#note-form button[type=submit]").click()
            check("Local note is added as text", page.locator(".log-entry").count() == 1 and page.locator(".log-entry img").count() == 0)
            check("Active work removes ambient art", page.locator("#art-wrap").is_hidden())
            page.screenshot(path=str(screenshots / "workspace-active-1440.png"), full_page=True)
            page.locator("#clear-notes").click()
            check("Clearing notes restores idle state", page.locator("#work-empty").is_visible())
            page.locator("#open-settings").click()
            page.locator("#art-enabled").uncheck()
            page.locator("#settings-form button[type=submit]").click()
            check("Art setting works locally", page.locator("#art-wrap").is_hidden())
            page.screenshot(path=str(screenshots / "workspace-no-image-1440.png"), full_page=True)
            page.set_viewport_size({"width": 390, "height": 844})
            page.wait_for_function("document.getElementById('project-panel').hidden && document.getElementById('files-panel').hidden")
            check("Small workspace starts with secondary regions closed", page.locator("#project-panel").is_hidden() and page.locator("#files-panel").is_hidden())
            page.locator("#toggle-files").click()
            check("Small layout has a route to files", page.locator("#files-panel").is_visible())
            page.screenshot(path=str(screenshots / "workspace-files-390.png"), full_page=True)

            load_page(page, "archive.html")
            page.locator("#archive-type").select_option("image")
            check("Website type filter works", page.locator(".archive-entry").count() == 1)
            page.locator("summary").click()
            check("Website note disclosure works", page.locator("details").get_attribute("open") is not None)
            page.locator("#archive-search").fill("not-found")
            check("Website empty state works", page.locator("#archive-empty").is_visible())
            page.locator("#archive-clear").click()
            check("Website filters can be cleared", page.locator(".archive-entry").count() == 4)
            page.locator("#email").fill("bad-address")
            page.locator("#subscribe-form button").click()
            check("Website invalid email state", page.locator("#email").get_attribute("aria-invalid") == "true")
            page.locator("#email").fill("name@example.com")
            page.locator("#subscribe-form button").click()
            check("Website valid email reports local scope", "No subscription was created" in page.locator("#email-message").inner_text())

            page.set_viewport_size({"width": 1440, "height": 900})
            load_page(page, "components.html")
            page.locator("#apply-example").click()
            check("Action has a real local result", "Applied to this local example" in page.locator("#action-status").inner_text())
            page.locator("#apply-example").focus(); page.keyboard.press("Tab")
            check("Keyboard focus has a visible outline", page.locator("#open-dialog").evaluate("e => document.activeElement === e && getComputedStyle(e).outlineWidth === '2px'"))
            page.keyboard.press("Enter")
            check("Keyboard opens dialog", page.locator("#example-dialog").is_visible())
            contained = True
            for _ in range(8):
                page.keyboard.press("Tab")
                contained = contained and page.evaluate("!!document.activeElement.closest('#example-dialog')")
            check("Dialog keeps Tab focus inside", contained)
            page.screenshot(path=str(screenshots / "components-dialog-1440.png"), full_page=True)
            page.keyboard.press("Escape")
            check("Escape closes dialog and returns focus", page.locator("#example-dialog").is_hidden() and page.locator("#open-dialog").evaluate("e => document.activeElement === e"))
            page.locator("#project-name").fill("")
            page.locator("#control-form button[type=submit]").click()
            check("Component error preserves editable field", page.locator("#control-error").is_visible())
            page.locator("#project-name").fill("a-long-project-name-for-small-view-checks")
            page.locator("#density").select_option("comfortable")
            page.locator("#show-details").uncheck()
            page.locator("#control-form button[type=submit]").click()
            check("Density and detail controls work", page.locator("#record-detail").is_hidden() and page.locator("[data-record='0']").bounding_box()["height"] >= 44)
            page.locator("[data-record='1']").click()
            check("Record selection updates preview", "Design notes" in page.locator("#record-title").inner_text())
            page.set_viewport_size({"width": 390, "height": 844})
            page.locator("#project-name").fill("x" * 80)
            page.locator("#control-form button[type=submit]").click()
            long_width = page.evaluate("({viewport:innerWidth,page:document.documentElement.scrollWidth})")
            check("Unbroken 80-character label stays within small page", long_width["page"] <= long_width["viewport"] + 1, long_width)
            page.locator("#add-record").click()
            check("Empty-state action changes local state", page.locator("#added-record").is_visible() and page.locator("#add-record").is_disabled())

            for file, name in [("index.html", "workspace"), ("archive.html", "website"), ("components.html", "components")]:
                page.set_viewport_size({"width": 390, "height": 844})
                load_page(page, file)
                page.evaluate("document.documentElement.style.fontSize = '200%'")
                overflow = page.evaluate("({viewport:innerWidth,page:document.documentElement.scrollWidth})")
                check(f"{name}: 200 percent text at 390px has no page overflow", overflow["page"] <= overflow["viewport"] + 1, overflow)
                page.screenshot(path=str(screenshots / f"{name}-large-text-390.png"), full_page=True)
            load_page(page, "components.html")
            page.emulate_media(reduced_motion="reduce")
            animations = page.locator("*").evaluate_all("els => els.filter(e => getComputedStyle(e).animationName !== 'none').length")
            check("Reduced-motion example has no active CSS animation", animations == 0)
            page.emulate_media(forced_colors="active")
            check("Forced-color mode retains visible controls", page.locator("#open-dialog").is_visible())
            page.screenshot(path=str(screenshots / "components-forced-colors-390.png"), full_page=True)
            for path in ("index.html", "archive.html", "components.html", "../../SKILL.md", "../../references/components.md"):
                check(f"Local example link {'exists' if args.offline else 'resolves'}: {path}", (ROOT / "examples/web" / path).is_file() if args.offline else page.request.get(base + path).status == 200)
            page.close(); context.close(); browser.close()
        report = {"scope": "Chromium, local examples, listed states only. No screen-reader, touch-device, cross-browser, or full WCAG audit.",
                  "browser": version, "platform": platform.platform(), "sizes": SIZES,
                  "load_mode": "offline: trusted local HTML/CSS/JS/images inlined" if args.offline else "local HTTP",
                  "passed": all(item["passed"] for item in checks), "check_count": len(checks), "checks": checks}
        (args.output / "browser-report.json").write_text(json.dumps(report, indent=2) + "\n")
        return 0 if report["passed"] else 1
    finally:
        server.shutdown(); server.server_close()


if __name__ == "__main__":
    raise SystemExit(main())
