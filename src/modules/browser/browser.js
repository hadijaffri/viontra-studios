// In-studio web browser / search panel.
// Query bar at the top, result list + detail pane below. Search uses whichever
// provider is selected in Settings (with API key from Settings when needed).

import { bus } from "../../core/bus.js";
import { getSettings } from "../../ui/settings.js";
import { duckduckgo } from "./providers/duckduckgo.js";
import { serpapi }    from "./providers/serpapi.js";

const PROVIDERS = { duckduckgo, serpapi };

export function mountBrowser(host) {
  host.innerHTML = `
    <header class="br-head">
      <div class="br-brand">Web</div>
      <form class="br-form">
        <input class="br-input" type="search" placeholder="Ask the web…" autocomplete="off" />
        <button class="br-go">Search</button>
      </form>
      <div class="br-status"></div>
    </header>
    <div class="br-body">
      <ul class="br-results"></ul>
      <div class="br-detail">
        <div class="br-empty">Results appear here. Pick one to view the snippet.</div>
      </div>
    </div>
  `;

  const $ = sel => host.querySelector(sel);
  const input  = $(".br-input");
  const form   = $(".br-form");
  const list   = $(".br-results");
  const detail = $(".br-detail");
  const status = $(".br-status");
  let ctrl = null;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) search(q);
  });

  async function search(query) {
    const s = getSettings();
    const provider = PROVIDERS[s.searchProvider] || duckduckgo;
    status.textContent = `searching via ${provider.label}…`;
    list.innerHTML = ""; detail.innerHTML = "";
    ctrl?.abort(); ctrl = new AbortController();

    try {
      const results = await provider.search(query, { apiKey: s.apiKey, signal: ctrl.signal });
      status.textContent = `${results.length} result${results.length === 1 ? "" : "s"}`;
      if (!results.length) {
        detail.innerHTML = `<div class="br-empty">No results.</div>`;
        return;
      }
      for (const r of results) {
        const li = document.createElement("li");
        li.className = "br-item";
        li.innerHTML = `
          <div class="br-title"></div>
          <div class="br-url"></div>
          <div class="br-snippet"></div>
        `;
        li.querySelector(".br-title").textContent   = r.title || r.url || "(untitled)";
        li.querySelector(".br-url").textContent     = r.url || "";
        li.querySelector(".br-snippet").textContent = r.snippet || "";
        li.addEventListener("click", () => showDetail(r));
        list.appendChild(li);
      }
      showDetail(results[0]);
    } catch (err) {
      status.textContent = `error: ${err.message}`;
      detail.innerHTML = `<div class="br-empty">${escape(err.message)}</div>`;
    }
  }

  function showDetail(r) {
    bus.emit("browser.result", r);
    detail.innerHTML = `
      <h3></h3>
      <a class="br-link" target="_blank" rel="noopener"></a>
      <p class="br-detail-snippet"></p>
      <iframe class="br-frame" sandbox="allow-scripts allow-same-origin"></iframe>
    `;
    detail.querySelector("h3").textContent = r.title || "";
    const a = detail.querySelector(".br-link");
    a.href = r.url || "#"; a.textContent = r.url || "";
    detail.querySelector(".br-detail-snippet").textContent = r.snippet || "";
    // Many sites block embedding via X-Frame-Options; iframe may stay blank.
    if (r.url) detail.querySelector(".br-frame").src = r.url;
  }
}

function escape(s) {
  return String(s).replace(/[&<>]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;" }[c]));
}
