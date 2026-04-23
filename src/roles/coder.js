// Coder AI — scripts and *backend* logic. Paired with `frontend` for UI.
// Offline stub: returns a code snippet via simple pattern matching. Replace
// `generate()` with a real model later.

export const coderRole = {
  id: "coder",
  label: "Coding (Backend)",

  async handle(text) {
    const code = generate(text);
    return {
      text: "Here's a starting snippet — dropped into the editor.",
      code,
      action: { kind: "load-editor", code },
    };
  },
};

function generate(prompt) {
  const p = prompt.toLowerCase();

  if (/\b(hello|hi|world)\b/.test(p)) {
    return `// greeting\n$root.textContent = "Hello from Viontra!";`;
  }
  if (/\bcount|counter|timer\b/.test(p)) {
    return [
      "let n = 0;",
      'const el = document.createElement("button");',
      'el.textContent = "count: 0";',
      'el.onclick = () => el.textContent = "count: " + (++n);',
      "$root.appendChild(el);",
    ].join("\n");
  }
  if (/\bfetch|api|request\b/.test(p)) {
    return [
      "// NOTE: sandbox has no network by default.",
      '$root.textContent = "Network is disabled in the sandbox — wire a safe proxy to enable.";',
    ].join("\n");
  }
  return [
    "// scaffold — replace with your logic",
    "const box = document.createElement('div');",
    "box.style.padding = '12px';",
    "box.style.border  = '1px solid #ccc';",
    "box.style.borderRadius = '8px';",
    `box.textContent = ${JSON.stringify(prompt)};`,
    "$root.appendChild(box);",
  ].join("\n");
}
