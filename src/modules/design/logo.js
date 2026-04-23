// Logo designer — SVG canvas with shapes, text, colors. Saved to localStorage.

import { saveJSON, loadJSON } from "../../core/storage.js";

const KEY = "design.logo";

export function mountLogo(host) {
  host.innerHTML = `
    <div class="dsg-toolbar">
      <button data-act="circle">● Circle</button>
      <button data-act="rect">▬ Rect</button>
      <button data-act="text">T Text</button>
      <input type="color" data-act="color" value="#6aa6ff" title="Fill color" />
      <button data-act="clear">Clear</button>
      <button data-act="export">Export SVG</button>
    </div>
    <div class="dsg-stage">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
  `;
  const svg = host.querySelector("svg");
  let fill = "#6aa6ff";
  let state = loadJSON(KEY, { shapes: [] });
  render();

  host.querySelector(".dsg-toolbar").addEventListener("click", e => {
    const act = e.target.dataset.act;
    if (!act || act === "color") return;
    if (act === "circle") add({ t: "circle", cx: rand(60, 340), cy: rand(60, 340), r: rand(20, 70), fill });
    if (act === "rect")   add({ t: "rect",   x: rand(40, 260), y: rand(40, 260), w: rand(40, 120), h: rand(40, 120), fill });
    if (act === "text") {
      const str = prompt("Text:") || "";
      if (str) add({ t: "text", x: rand(60, 300), y: rand(100, 300), str, fill, size: 32 });
    }
    if (act === "clear")  { state = { shapes: [] }; persist(); render(); }
    if (act === "export") exportSvg();
  });
  host.querySelector('input[data-act="color"]').addEventListener("input", e => { fill = e.target.value; });

  function add(shape) { state.shapes.push(shape); persist(); render(); }
  function persist()  { saveJSON(KEY, state); }
  function render() {
    svg.innerHTML = "";
    for (const s of state.shapes) {
      const el = document.createElementNS("http://www.w3.org/2000/svg",
        s.t === "text" ? "text" : s.t);
      if (s.t === "circle") { el.setAttribute("cx", s.cx); el.setAttribute("cy", s.cy); el.setAttribute("r", s.r); }
      if (s.t === "rect")   { el.setAttribute("x", s.x); el.setAttribute("y", s.y); el.setAttribute("width", s.w); el.setAttribute("height", s.h); }
      if (s.t === "text")   { el.setAttribute("x", s.x); el.setAttribute("y", s.y); el.setAttribute("font-size", s.size); el.textContent = s.str; }
      el.setAttribute("fill", s.fill);
      svg.appendChild(el);
    }
  }

  function exportSvg() {
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "viontra-logo.svg"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function rand(a, b) { return Math.round(a + Math.random() * (b - a)); }
