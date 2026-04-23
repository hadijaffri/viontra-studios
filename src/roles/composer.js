// Composer role — handles "code me / build me / make me a..." requests by
// picking a matching template from the composer library and emitting code
// that the workspace loads into the editor.

import { composer } from "../modules/composer/composer.js";

export const composerRole = {
  id: "composer",
  label: "Build",

  async handle(text) {
    const hit = composer.compose(text);
    if (!hit) {
      const list = composer.list()
        .map(t => `• ${t.name} — ${t.tagline}`)
        .join("\n");
      return {
        text:
          `I don't have a template that matches "${text}" yet. ` +
          `Try one of:\n${list}`,
      };
    }
    return {
      text:
        `Built a ${hit.template.name.toLowerCase()} — loaded into the editor. ` +
        `Press Run ▶ to try it.`,
      code: hit.code,
      action: { kind: "load-editor", code: hit.code },
    };
  },
};
