// Coder AI — scripts and *backend* logic. Paired with `frontend` for UI.
// Tries the composer template library first (covers "code me a flight sim",
// "snake game", "todo app", etc.), then a tiny legacy pattern list, then
// falls back to an honest "no match" message — never echoes the prompt back
// as if it were code.

import { composer } from "../modules/composer/composer.js";

export const coderRole = {
  id: "coder",
  label: "Coding (Backend)",

  async handle(text) {
    // 1. Composer templates — 15 runnable scaffolds (games, apps, sims, etc.)
    const hit = composer.compose(text);
    if (hit) {
      return {
        text: `Built a ${hit.template.name.toLowerCase()} — loaded into the editor. Press Run ▶ to try it.`,
        code: hit.code,
        action: { kind: "load-editor", code: hit.code },
      };
    }

    // 2. Tiny legacy snippets (hello, counter, fetch stub).
    const code = legacySnippet(text);
    if (code) {
      return {
        text: "Here's a starting snippet — dropped into the editor.",
        code,
        action: { kind: "load-editor", code },
      };
    }

    // 3. Honest miss — tell the user rather than echoing their prompt.
    const list = composer.list().slice(0, 8).map(t => t.name).join(", ");
    return {
      text:
        `I don't have a template or snippet for "${text}". Try one of the Build ` +
        `templates (${list}, …) or switch to the AI Pro tab for free-form generation.`,
    };
  },
};

function legacySnippet(prompt) {
  const p = prompt.toLowerCase();
  if (/\b(hello|hi|world)\b/.test(p)) {
    return `// greeting\n$root.textContent = "Hello from Viontra!";`;
  }
  if (/\bcount|counter\b/.test(p)) {
    return [
      "let n = 0;",
      'const el = document.createElement("button");',
      'el.textContent = "count: 0";',
      'el.onclick = () => el.textContent = "count: " + (++n);',
      "$root.appendChild(el);",
    ].join("\n");
  }
  if (/\bfetch|api\s+call|request\b/.test(p)) {
    return [
      "// NOTE: sandbox has no network by default.",
      '$root.textContent = "Network is disabled in the sandbox — wire a safe proxy to enable.";',
    ].join("\n");
  }
  return null;
}
