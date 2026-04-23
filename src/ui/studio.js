// The "big square" — two sections with swappable layout and positions.
// One section is the web browser, the other is the design canvas.

import { bus } from "../core/bus.js";
import { getSettings } from "./settings.js";
import { mountBrowser } from "../modules/browser/browser.js";
import { mountLogo }    from "../modules/design/logo.js";
import { mountModel3D } from "../modules/design/model3d.js";
import { mountWebpage } from "../modules/design/webpage.js";

export function mountStudio(host) {
  host.innerHTML = `
    <div class="studio-split">
      <div class="studio-pane" data-pane="browser"></div>
      <div class="studio-divider"></div>
      <div class="studio-pane" data-pane="design"></div>
    </div>
  `;

  const split    = host.querySelector(".studio-split");
  const paneBrow = host.querySelector('[data-pane="browser"]');
  const paneDesg = host.querySelector('[data-pane="design"]');

  mountBrowser(paneBrow);
  mountDesign(paneDesg);

  applyLayout();
  bus.on("settings.changed", applyLayout);

  function applyLayout() {
    const { layout, browserPosition } = getSettings();
    split.classList.toggle("horizontal", layout === "horizontal");
    split.classList.toggle("vertical",   layout === "vertical");

    // Re-order without destroying the panes (their children keep their state).
    const divider = split.querySelector(".studio-divider") || (() => {
      const d = document.createElement("div"); d.className = "studio-divider"; return d;
    })();
    const ordered = browserPosition === "first"
      ? [paneBrow, divider, paneDesg]
      : [paneDesg, divider, paneBrow];
    // appendChild on an existing child moves it; nothing is destroyed.
    ordered.forEach(el => split.appendChild(el));
  }
}

function mountDesign(host) {
  host.innerHTML = `
    <header class="dsg-head">
      <div class="dsg-brand">Design</div>
      <div class="dsg-tabs">
        <button class="dsg-tab active" data-tool="logo">Logo</button>
        <button class="dsg-tab" data-tool="model3d">3D</button>
        <button class="dsg-tab" data-tool="webpage">Webpage</button>
      </div>
    </header>
    <div class="dsg-body">
      <div class="dsg-tool active" data-tool="logo"></div>
      <div class="dsg-tool" data-tool="model3d"></div>
      <div class="dsg-tool" data-tool="webpage"></div>
    </div>
  `;
  mountLogo(host.querySelector('.dsg-tool[data-tool="logo"]'));
  mountModel3D(host.querySelector('.dsg-tool[data-tool="model3d"]'));
  mountWebpage(host.querySelector('.dsg-tool[data-tool="webpage"]'));

  host.querySelectorAll(".dsg-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      host.querySelectorAll(".dsg-tab").forEach(t => t.classList.toggle("active", t === tab));
      host.querySelectorAll(".dsg-tool").forEach(t => t.classList.toggle("active", t.dataset.tool === tab.dataset.tool));
    });
  });
}
