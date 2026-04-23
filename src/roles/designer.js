// Designer AI — UI and visual work.

export const designerRole = {
  id: "designer",
  label: "Designer AI",

  async handle(text) {
    const code = scaffoldUI(text);
    return {
      text: "Drafted a small UI. Tweak the colors/labels in the editor and re-run.",
      code,
      action: { kind: "load-editor", code },
    };
  },
};

function scaffoldUI(prompt) {
  return [
    "// designer scaffold",
    "const card = document.createElement('div');",
    "Object.assign(card.style, {",
    "  padding: '16px', borderRadius: '12px',",
    "  background: 'linear-gradient(135deg,#6aa6ff,#a06aff)',",
    "  color: 'white', fontFamily: 'system-ui,sans-serif',",
    "  maxWidth: '320px'",
    "});",
    `card.innerHTML = \`<h3 style="margin:0 0 6px">Viontra</h3><p style="margin:0;opacity:.9">${escapeHtml(prompt)}</p>\`;`,
    "$root.appendChild(card);",
  ].join("\n");
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
