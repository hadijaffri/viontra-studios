// First-run tutorial. Shows on first visit (cookie-gated). User can skip.

import { isFirstVisit, markVisited, saveJSON } from "../core/storage.js";

const STEPS = [
  {
    title: "Welcome to Viontra Studios",
    body: "A single environment for AI, code, design, and browsing. Let's take 30 seconds.",
    highlight: null,
  },
  {
    title: "Your AI agent",
    body: "Six capabilities in one panel: voice, extended thinking, coding, testing, logo design, and frontend design. Pick a tab and go.",
    highlight: "#chat",
  },
  {
    title: "The studio",
    body: "The big square has two halves: a web browser (search via API key) on top, and a design canvas on the bottom. Swap the split in Settings.",
    highlight: "#studio",
  },
  {
    title: "Tools & expansion",
    body: "The left panel lists roles and tools. Anything new you add via the registry shows up here automatically.",
    highlight: "#tools",
  },
  {
    title: "You're ready",
    body: "Press the gear in the top-right anytime to tweak the layout. Have fun.",
    highlight: null,
  },
];

export function mountTutorial({ force = false } = {}) {
  if (!force && !isFirstVisit()) return;

  const overlay = document.createElement("div");
  overlay.className = "tut-overlay";
  overlay.innerHTML = `
    <div class="tut-card" role="dialog" aria-modal="true">
      <div class="tut-progress"><div class="tut-bar"></div></div>
      <h2 class="tut-title"></h2>
      <p class="tut-body"></p>
      <div class="tut-actions">
        <button class="tut-skip">Skip</button>
        <div class="tut-nav">
          <button class="tut-back">Back</button>
          <button class="tut-next">Next</button>
        </div>
      </div>
    </div>
    <div class="tut-spotlight" aria-hidden="true"></div>
  `;
  document.body.appendChild(overlay);

  const $ = sel => overlay.querySelector(sel);
  let i = 0;

  function finish() {
    markVisited();
    saveJSON("tutorial.completed", true);
    overlay.classList.add("tut-exit");
    setTimeout(() => overlay.remove(), 220);
  }

  function render() {
    const step = STEPS[i];
    $(".tut-title").textContent = step.title;
    $(".tut-body").textContent  = step.body;
    $(".tut-bar").style.width   = `${((i + 1) / STEPS.length) * 100}%`;
    $(".tut-back").disabled     = i === 0;
    $(".tut-next").textContent  = i === STEPS.length - 1 ? "Finish" : "Next";

    const spot = $(".tut-spotlight");
    if (step.highlight) {
      const el = document.querySelector(step.highlight);
      if (el) {
        const r = el.getBoundingClientRect();
        Object.assign(spot.style, {
          display: "block",
          left: `${r.left - 6}px`, top: `${r.top - 6}px`,
          width: `${r.width + 12}px`, height: `${r.height + 12}px`,
        });
      } else spot.style.display = "none";
    } else spot.style.display = "none";
  }

  $(".tut-skip").addEventListener("click", finish);
  $(".tut-back").addEventListener("click", () => { if (i > 0) { i--; render(); } });
  $(".tut-next").addEventListener("click", () => {
    if (i < STEPS.length - 1) { i++; render(); } else finish();
  });
  window.addEventListener("resize", render);

  requestAnimationFrame(render);
}
