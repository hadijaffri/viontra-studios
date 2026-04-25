// Panel toggle — adds an X close button to each major panel and a reopen bar
// along the bottom so the user can restore what they closed. State persists
// in localStorage.

import { saveJSON, loadJSON } from "../core/storage.js";

const KEY = "viontra:panels:v1";
const PANELS = [
  { id: "tools",     label: "Tools",     icon: "🛠" },
  { id: "studio",    label: "Studio",    icon: "◎" },
  { id: "workspace", label: "Workspace", icon: "⌨" },
  { id: "chat",      label: "AI Agent",  icon: "✦" },
];

export function mountPanelToggle() {
  const state = loadJSON(KEY, {});

  // Reopen bar (bottom of the viewport).
  const bar = document.createElement("div");
  bar.id = "panel-reopen-bar";
  bar.style.cssText =
    "position:fixed;bottom:0;left:0;right:0;display:flex;gap:8px;padding:6px 10px;" +
    "background:#f1f5f9;border-top:1px solid #e2e8f0;z-index:100;justify-content:center;" +
    "font:13px system-ui;pointer-events:none";
  document.body.appendChild(bar);

  // Add a close X to each panel.
  for (const p of PANELS) {
    const host = document.getElementById(p.id);
    if (!host) continue;
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    const x = document.createElement("button");
    x.textContent = "×";
    x.title = `Close ${p.label}`;
    x.className = "panel-close";
    x.setAttribute("aria-label", `Close ${p.label} panel`);
    x.style.cssText =
      "position:absolute;top:6px;right:6px;width:22px;height:22px;border:none;" +
      "background:rgba(15,23,42,0.08);color:#334155;font:18px/1 system-ui;" +
      "border-radius:4px;cursor:pointer;z-index:50;padding:0;line-height:20px";
    x.addEventListener("mouseenter", () => (x.style.background = "rgba(15,23,42,0.18)"));
    x.addEventListener("mouseleave", () => (x.style.background = "rgba(15,23,42,0.08)"));
    x.addEventListener("click", () => togglePanel(p.id, false));
    host.appendChild(x);

    // Restore closed state on boot.
    if (state[p.id] === "closed") host.style.display = "none";
  }

  function togglePanel(id, open) {
    const host = document.getElementById(id);
    if (!host) return;
    if (open) {
      host.style.display = "";
      state[id] = "open";
    } else {
      host.style.display = "none";
      state[id] = "closed";
    }
    saveJSON(KEY, state);
    renderBar();
  }

  function renderBar() {
    bar.innerHTML = "";
    let any = false;
    for (const p of PANELS) {
      if (state[p.id] !== "closed") continue;
      any = true;
      const b = document.createElement("button");
      b.textContent = `${p.icon} Open ${p.label}`;
      b.style.cssText =
        "padding:6px 14px;border:1px solid #cbd5e1;background:#fff;border-radius:6px;" +
        "font:13px system-ui;cursor:pointer;pointer-events:auto";
      b.addEventListener("mouseenter", () => (b.style.background = "#eef2ff"));
      b.addEventListener("mouseleave", () => (b.style.background = "#fff"));
      b.addEventListener("click", () => togglePanel(p.id, true));
      bar.appendChild(b);
    }
    bar.style.display = any ? "flex" : "none";
  }

  renderBar();
}
