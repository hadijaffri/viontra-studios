// Frontend design role — UI/HTML/CSS scaffolds (distinct from `coder`, which
// is the backend/logic side).

export const frontendRole = {
  id: "frontend",
  label: "Frontend Design",

  async handle(text) {
    const code = scaffold(text);
    return {
      text: "Dropped a small frontend scaffold into the editor. Run it to preview.",
      code,
      action: { kind: "load-editor", code },
    };
  },
};

function scaffold(prompt) {
  return [
    "// frontend scaffold — HTML + CSS, no framework",
    "const wrap = document.createElement('div');",
    "wrap.style.cssText = 'font-family:system-ui;max-width:420px;margin:24px auto;padding:20px;border:1px solid #eee;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.06)';",
    `wrap.innerHTML = \``,
    `  <h2 style='margin:0 0 8px;color:#111'>${escape(prompt || "Your component")}</h2>`,
    "  <p style='margin:0 0 16px;color:#555'>A clean starting point — edit freely.</p>",
    "  <button id='cta' style='background:#111;color:#fff;border:none;border-radius:8px;padding:10px 14px;font-weight:600;cursor:pointer'>Primary action</button>",
    "`;",
    "$root.appendChild(wrap);",
    "wrap.querySelector('#cta').addEventListener('click', () => alert('clicked'));",
  ].join("\n");
}

function escape(s) { return String(s).replace(/[&<>]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;" }[c])); }
