// Workspace — code editor, live preview, and console tabs.

import { bus } from "../core/bus.js";
import { Sandbox } from "../engine/sandbox.js";

const STARTER = `// Welcome to Viontra. Edit & Run, or ask the chat to build something.
const h = document.createElement("h2");
h.textContent = "Hello, Viontra";
h.style.fontFamily = "system-ui";
$root.appendChild(h);
`;

export function mountWorkspace(host) {
  host.innerHTML = `
    <div class="ws-tabs">
      <button class="ws-tab active" data-tab="editor">Editor</button>
      <button class="ws-tab" data-tab="preview">Preview</button>
      <button class="ws-tab" data-tab="console">Console</button>
    </div>
    <div class="ws-body">
      <textarea id="editor" spellcheck="false" class="active"></textarea>
      <div id="preview-host"></div>
      <pre id="console"></pre>
    </div>
    <div class="ws-toolbar">
      <button id="btn-run">Run ▶</button>
      <button id="btn-clear">Clear Console</button>
      <button id="btn-reset">Reset Sandbox</button>
    </div>
  `;

  const tabs    = [...host.querySelectorAll(".ws-tab")];
  const panes   = {
    editor:  host.querySelector("#editor"),
    preview: host.querySelector("#preview-host"),
    console: host.querySelector("#console"),
  };
  panes.editor.value = STARTER;

  function activate(tabId) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
    Object.entries(panes).forEach(([k, el]) => el.classList.toggle("active", k === tabId));
  }
  tabs.forEach(t => t.addEventListener("click", () => activate(t.dataset.tab)));

  const sandbox = new Sandbox(panes.preview);
  const cons    = panes.console;
  const logLine = (level, text) => {
    const line = document.createElement("div");
    line.className = `log-${level === "error" ? "err" : level === "warn" ? "warn" : "info"}`;
    line.textContent = `[${level}] ${text}`;
    cons.appendChild(line);
    cons.scrollTop = cons.scrollHeight;
  };

  sandbox.on(m => {
    if (m.kind === "log")  logLine(m.data.level, m.data.text);
    if (m.kind === "done") logLine(m.data.ok ? "info" : "error", m.data.ok ? "run complete" : "run failed");
  });

  host.querySelector("#btn-run").addEventListener("click", async () => {
    cons.innerHTML = "";
    activate("preview");
    bus.emit("status", "running");
    await sandbox.run(panes.editor.value);
    bus.emit("status", "idle");
  });
  host.querySelector("#btn-clear").addEventListener("click", () => { cons.innerHTML = ""; });
  host.querySelector("#btn-reset").addEventListener("click", () => sandbox.reset());

  // External modules can push code into the editor.
  bus.on("editor.load", ({ code }) => {
    panes.editor.value = code;
    activate("editor");
  });
}
