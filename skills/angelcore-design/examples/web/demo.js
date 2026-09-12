"use strict";
// Local examples only. User text is written with textContent, never as HTML.
const $ = (id) => document.getElementById(id);
const page = document.body.dataset.demo;
// Native dialogs handle modal state and Escape. Keep Tab cycling within each
// dialog as well, instead of allowing the last Tab stop to move to browser UI.
for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const items = [...dialog.querySelectorAll("button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex='0']")]
      .filter((item) => item.getClientRects().length && item.tabIndex >= 0);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || !items.includes(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
}
const button = (text, onClick, className = "") => {
  const node = document.createElement("button");
  node.type = "button";
  node.className = className;
  node.textContent = text;
  node.addEventListener("click", onClick);
  return node;
};

if (page === "workspace") {
  const projects = ["field-notes", "mono-kit", "archive-site", "audio-index", "local-tools", "image-study", "release-notes", "project-with-a-long-descriptive-name"];
  const files = {
    "index.html": '<main class="ac">\n  <h1>Field notes</h1>\n  <button type="button">[open]</button>\n</main>',
    "styles.css": '.ac {\n  --ac-bg: #090909;\n  --ac-text: #b8b8b8;\n  border-radius: 0;\n}',
    "app.js": '// Sample source only.\nconst state = { view: "notes" };\n\nfunction selectView(view) {\n  state.view = view;\n}',
    "notes.md": '# Working notes\n\nKeep the frame quiet.\nKeep the task clear.\nRemove art during dense work.',
    "tokens.json": '{\n  "background": "#090909",\n  "text": "#b8b8b8",\n  "cornerRadius": 0\n}',
    ".gitignore": 'node_modules/\n.cache/\ndist/'
  };
  let current = projects[0];
  let selectedFile = null;
  let showArt = true;
  const notes = new Map(projects.map((name) => [name, []]));
  const workspace = $("workspace");
  function renderProjects() {
    const query = $("project-search").value.trim().toLowerCase();
    $("project-list").replaceChildren();
    const filtered = projects.filter((name) => name.includes(query));
    for (const name of filtered) {
      const row = document.createElement("li");
      const control = button(`${name === current ? ">" : "/"} ${name}`, () => {
        current = name;
        $("project-title").textContent = name;
        renderProjects(); renderNotes();
      }, "ac-list-button");
      if (name === current) control.setAttribute("aria-current", "true");
      const text = document.createElement("span"); text.textContent = control.textContent;
      control.replaceChildren(text);
      row.append(control); $("project-list").append(row);
    }
    $("project-empty").hidden = filtered.length > 0;
  }
  function renderFiles() {
    const query = $("file-search").value.trim().toLowerCase();
    $("file-list").replaceChildren();
    const filtered = Object.keys(files).filter((name) => name.includes(query));
    for (const name of filtered) {
      const row = document.createElement("li");
      const control = button(`${name === selectedFile ? ">" : ":"} ${name}`, () => {
        selectedFile = name;
        $("file-title").textContent = `${name} / sample`;
        $("file-content").textContent = files[name];
        $("file-content").hidden = false; $("file-placeholder").hidden = true;
        renderFiles();
      }, "ac-list-button");
      if (name === selectedFile) control.setAttribute("aria-current", "true");
      row.append(control); $("file-list").append(row);
    }
    $("file-empty").hidden = filtered.length > 0;
  }
  function renderNotes() {
    const items = notes.get(current);
    $("local-log").replaceChildren();
    $("note-count").textContent = `${items.length} local note${items.length === 1 ? "" : "s"}`;
    $("work-empty").hidden = items.length > 0;
    $("local-log").hidden = items.length === 0;
    $("art-wrap").hidden = !showArt || items.length > 0;
    $("fixture-credit").hidden = !showArt || items.length > 0;
    for (const [index, text] of items.entries()) {
      const item = document.createElement("article"); item.className = "log-entry";
      const label = document.createElement("h2"); label.className = "ac-meta"; label.textContent = `NOTE / ${String(index + 1).padStart(2, "0")}`;
      const body = document.createElement("p"); body.textContent = text;
      item.append(label, body); $("local-log").append(item);
    }
  }
  function setPanel(kind, open, moveFocus = false) {
    const isProjects = kind === "projects";
    const panel = $(isProjects ? "project-panel" : "files-panel");
    panel.hidden = !open;
    workspace.dataset[isProjects ? "navOpen" : "filesOpen"] = String(open);
    $(`toggle-${kind}`).setAttribute("aria-expanded", String(open));
    if (open && moveFocus) $(isProjects ? "project-search" : "file-search").focus();
  }
  for (const kind of ["projects", "files"]) {
    $(`toggle-${kind}`).addEventListener("click", () => {
      const open = $(`toggle-${kind}`).getAttribute("aria-expanded") !== "true";
      setPanel(kind, open, open && matchMedia("(max-width: 900px)").matches);
    });
  }
  const small = matchMedia("(max-width: 900px)");
  const applySize = () => { setPanel("projects", !small.matches); setPanel("files", !small.matches); };
  small.addEventListener("change", applySize); applySize();
  $("project-search").addEventListener("input", renderProjects);
  $("file-search").addEventListener("input", renderFiles);
  $("project-clear").addEventListener("click", () => { $("project-search").value = ""; renderProjects(); $("project-search").focus(); });
  $("file-clear").addEventListener("click", () => { $("file-search").value = ""; renderFiles(); $("file-search").focus(); });
  $("note-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $("note-input").value.trim();
    $("note-error").hidden = !!text;
    if (!text) {
      $("note-input").setAttribute("aria-invalid", "true");
      $("note-error").textContent = "[!] Enter a note before adding it.";
      $("note-input").focus(); return;
    }
    $("note-input").removeAttribute("aria-invalid");
    notes.get(current).push(text); $("note-input").value = ""; renderNotes();
    $("note-status").textContent = "Local note added. It is not saved to a server.";
    $("note-input").focus();
  });
  $("clear-notes").addEventListener("click", () => {
    notes.set(current, []); renderNotes();
    $("note-status").textContent = "Notes cleared from this local example.";
  });
  $("open-settings").addEventListener("click", () => { $("art-enabled").checked = showArt; $("settings-dialog").showModal(); });
  $("cancel-settings").addEventListener("click", () => $("settings-dialog").close());
  $("settings-form").addEventListener("submit", () => { showArt = $("art-enabled").checked; renderNotes(); });
  renderProjects(); renderFiles(); renderNotes();
}

if (page === "archive") {
  const entries = [
    { title: "A frame without heavy boxes", type: "interface", text: "Use alignment and one clear separator before adding another panel.", detail: "Start with the reading path. Put related values on a common line. Use a full outline only when it explains a control or a distinct task." },
    { title: "The image is made of its marks", type: "image", text: "Crop first. Quantize once. Keep the finished texture still.", detail: "A real dither follows the source tone map. A separate dot layer does not. Use a low-contrast two-ink display for ambient art and stronger inks for meaningful image content." },
    { title: "State should read without color", type: "interface", text: "A useful label can explain more than a bright status dot.", detail: "Write the state and its scope. Say Local preview when nothing is saved remotely. Give errors a clear next step. Keep keyboard focus separate from selection." },
    { title: "Remove the image and check again", type: "process", text: "The system must survive without a large illustration.", detail: "Check the same object at a narrow width and during active work. Keep the corner rules, spacing, type scale, and thin boundaries. Remove art before reducing useful content." }
  ];
  function renderArchive() {
    const query = $("archive-search").value.trim().toLowerCase();
    const type = $("archive-type").value;
    const matches = entries.filter((item) => (type === "all" || item.type === type) && `${item.title} ${item.text}`.toLowerCase().includes(query));
    $("archive-list").replaceChildren();
    for (const item of matches) {
      const article = document.createElement("article"); article.className = "archive-entry";
      const number = document.createElement("span"); number.className = "ac-muted"; number.textContent = String(entries.indexOf(item) + 1).padStart(2, "0");
      const content = document.createElement("div");
      const title = document.createElement("h3"); title.textContent = item.title;
      const excerpt = document.createElement("p"); excerpt.className = "reading ac-muted"; excerpt.textContent = item.text;
      const details = document.createElement("details"); const summary = document.createElement("summary"); summary.textContent = "Read note";
      const text = document.createElement("p"); text.textContent = item.detail; details.append(summary, text);
      content.append(title, excerpt, details);
      const label = document.createElement("span"); label.className = "entry-type ac-meta"; label.textContent = `/ ${item.type}`;
      article.append(number, content, label); $("archive-list").append(article);
    }
    $("archive-empty").hidden = matches.length > 0;
    $("archive-count").textContent = `${matches.length} entr${matches.length === 1 ? "y" : "ies"} / local sample content`;
  }
  $("archive-search").addEventListener("input", renderArchive);
  $("archive-type").addEventListener("change", renderArchive);
  $("archive-clear").addEventListener("click", () => { $("archive-search").value = ""; $("archive-type").value = "all"; renderArchive(); });
  $("subscribe-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = $("email").checkValidity();
    $("email-message").textContent = valid ? "[ok] Address format accepted locally. No subscription was created." : "[!] Enter a valid email address. Nothing was sent.";
    if (valid) $("email").removeAttribute("aria-invalid");
    else { $("email").setAttribute("aria-invalid", "true"); $("email").focus(); }
  });
  renderArchive();
}

if (page === "components") {
  let selected = 0;
  const labels = ["Source files", "Design notes", "Test output"];
  const counts = [8, 12, 4];
  function renderRecord() {
    $("record-title").textContent = `${$("project-name").value.trim()} / ${labels[selected]}`;
    $("record-detail").textContent = `${counts[selected]} sample ${selected === 0 ? "files" : "records"} in the selected group.`;
    $("record-detail").hidden = !$("show-details").checked;
    for (const item of document.querySelectorAll("[data-record]")) {
      const index = Number(item.dataset.record);
      item.querySelector("span").textContent = `${index === selected ? ">" : " "} ${labels[index]}`;
      if (index === selected) item.setAttribute("aria-current", "true"); else item.removeAttribute("aria-current");
      item.style.minHeight = $("density").value === "comfortable" ? "44px" : "30px";
    }
  }
  for (const item of document.querySelectorAll("[data-record]")) item.addEventListener("click", () => { selected = Number(item.dataset.record); renderRecord(); });
  $("apply-example").addEventListener("click", () => { $("action-status").textContent = "[ok] Applied to this local example. No server was called."; });
  $("open-dialog").addEventListener("click", () => $("example-dialog").showModal());
  $("control-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = !!$("project-name").value.trim();
    $("control-error").hidden = valid;
    if (!valid) {
      $("control-error").textContent = "[!] Enter a project name.";
      $("project-name").setAttribute("aria-invalid", "true"); $("project-name").focus();
    } else {
      $("project-name").removeAttribute("aria-invalid"); renderRecord();
      $("action-status").textContent = "[ok] Local preview updated.";
    }
  });
  $("add-record").addEventListener("click", () => {
    $("added-record").hidden = false; $("added-record").textContent = "[ok] One record added to this local example.";
    $("add-record").disabled = true;
  });
}
