// Visual web page designer — add blocks, tweak text, export HTML/CSS.

import { bus } from "../../core/bus.js";
import { saveJSON, loadJSON } from "../../core/storage.js";

const KEY = "design.webpage";

export function mountWebpage(host) {
  host.innerHTML = `
    <div class="dsg-toolbar">
      <button data-block="hero">+ Hero</button>
      <button data-block="text">+ Text</button>
      <button data-block="cta">+ CTA</button>
      <button data-block="card">+ Card</button>
      <button data-act="clear">Clear</button>
      <button data-act="send">Send to sandbox</button>
    </div>
    <div class="dsg-stage">
      <div class="wp-preview"></div>
    </div>
  `;
  const preview = host.querySelector(".wp-preview");
  let page = loadJSON(KEY, { blocks: [] });
  render();

  host.querySelector(".dsg-toolbar").addEventListener("click", e => {
    const block = e.target.dataset.block;
    const act   = e.target.dataset.act;
    if (block) { page.blocks.push(make(block)); persist(); render(); }
    if (act === "clear") { page.blocks = []; persist(); render(); }
    if (act === "send")  bus.emit("editor.load", { code: `$root.innerHTML = \`${escapeTemplate(toHtml(page))}\`;` });
  });

  function persist() { saveJSON(KEY, page); }

  function render() {
    preview.innerHTML = toHtml(page);
    [...preview.querySelectorAll("[contenteditable]")].forEach((el, i) => {
      el.addEventListener("input", () => { page.blocks[i].text = el.textContent; persist(); });
    });
  }
}

function make(kind) {
  switch (kind) {
    case "hero": return { kind, text: "A studio for builders." };
    case "text": return { kind, text: "Write something here." };
    case "cta":  return { kind, text: "Get started" };
    case "card": return { kind, text: "Feature card" };
  }
  return { kind: "text", text: "" };
}

function toHtml(page) {
  return page.blocks.map(b => {
    const t = escape(b.text);
    switch (b.kind) {
      case "hero":
        return `<section style="padding:48px 24px;background:linear-gradient(135deg,#6aa6ff,#a06aff);color:#fff;border-radius:12px;margin:8px 0;">
          <h1 contenteditable style="margin:0;font-size:32px;">${t}</h1></section>`;
      case "text":
        return `<p contenteditable style="margin:12px 0;line-height:1.5;">${t}</p>`;
      case "cta":
        return `<button contenteditable style="background:#111;color:#fff;border:none;border-radius:8px;padding:10px 18px;font-weight:600;margin:8px 0;">${t}</button>`;
      case "card":
        return `<div contenteditable style="border:1px solid #ddd;border-radius:10px;padding:16px;margin:8px 0;">${t}</div>`;
    }
    return "";
  }).join("");
}

function escape(s) { return String(s).replace(/[&<>]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;" }[c])); }
function escapeTemplate(s) { return s.replace(/`/g, "\\`").replace(/\$\{/g, "\\${"); }
