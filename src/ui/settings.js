// Settings panel — layout (horizontal vs vertical split), which half is
// browser vs design, search API key + provider, tutorial replay.

import { bus } from "../core/bus.js";
import { saveJSON, loadJSON } from "../core/storage.js";
import { mountTutorial } from "./tutorial.js";

const DEFAULTS = {
  layout: "vertical",          // "vertical" (top/bottom) or "horizontal" (left/right)
  browserPosition: "first",    // "first" (top or left) or "second" (bottom or right)
  searchProvider: "duckduckgo",
  apiKey: "",
};

export function getSettings() { return { ...DEFAULTS, ...loadJSON("settings", {}) }; }
export function setSettings(patch) {
  const next = { ...getSettings(), ...patch };
  saveJSON("settings", next);
  bus.emit("settings.changed", next);
  return next;
}

export function mountSettings(host) {
  host.innerHTML = `
    <button id="open-settings" class="icon-btn" title="Settings">⚙</button>
    <div class="settings-modal" hidden>
      <div class="settings-card" role="dialog" aria-modal="true">
        <header>
          <h3>Settings</h3>
          <button class="icon-btn" id="close-settings">✕</button>
        </header>
        <div class="settings-body">
          <section>
            <label>Studio layout</label>
            <div class="seg" data-field="layout">
              <button data-val="vertical">Top / Bottom</button>
              <button data-val="horizontal">Left / Right</button>
            </div>
          </section>
          <section>
            <label>Browser position</label>
            <div class="seg" data-field="browserPosition">
              <button data-val="first">Top / Left</button>
              <button data-val="second">Bottom / Right</button>
            </div>
          </section>
          <section>
            <label for="set-provider">Search provider</label>
            <select id="set-provider">
              <option value="duckduckgo">DuckDuckGo (no key)</option>
              <option value="brave">Brave Search</option>
              <option value="serpapi">SerpAPI</option>
            </select>
          </section>
          <section>
            <label for="set-key">Search API key</label>
            <input id="set-key" type="password" placeholder="Paste key — stored locally only" />
          </section>
          <section>
            <button id="replay-tutorial" class="btn-ghost">Replay tutorial</button>
          </section>
        </div>
      </div>
    </div>
  `;

  const modal = host.querySelector(".settings-modal");
  const open  = () => { modal.hidden = false; render(); };
  const close = () => { modal.hidden = true; };

  host.querySelector("#open-settings").addEventListener("click", open);
  host.querySelector("#close-settings").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });

  host.querySelectorAll(".seg").forEach(seg => {
    seg.addEventListener("click", e => {
      const btn = e.target.closest("button[data-val]");
      if (!btn) return;
      setSettings({ [seg.dataset.field]: btn.dataset.val });
      render();
    });
  });

  host.querySelector("#set-provider").addEventListener("change", e => {
    setSettings({ searchProvider: e.target.value });
  });
  host.querySelector("#set-key").addEventListener("change", e => {
    setSettings({ apiKey: e.target.value.trim() });
  });
  host.querySelector("#replay-tutorial").addEventListener("click", () => {
    close();
    mountTutorial({ force: true });
  });

  function render() {
    const s = getSettings();
    host.querySelectorAll(".seg").forEach(seg => {
      const val = s[seg.dataset.field];
      seg.querySelectorAll("button").forEach(b => {
        b.classList.toggle("active", b.dataset.val === val);
      });
    });
    host.querySelector("#set-provider").value = s.searchProvider;
    host.querySelector("#set-key").value      = s.apiKey;
  }
}
