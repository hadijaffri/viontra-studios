// Composer role — handles "code me / build me / make me a..." requests.
// First tries the offline template library (15 runnable scaffolds). If no
// template matches, falls back to Claude via the /api/chat serverless
// proxy to generate frontend code on the fly.

import { composer }                from "../modules/composer/composer.js";
import { buildContext, cleanCode } from "../modules/llm/rag.js";
import { bus }                     from "../core/bus.js";

const FRONTEND_INSTRUCTION =
  "Generate runnable JavaScript that builds a frontend UI inside a sandbox iframe " +
  "where a global $root div is available. Do NOT use top-level imports. Prefer DOM " +
  "APIs and canvas. If you need a third-party library (e.g. Three.js), inject via " +
  "<script src> from a CDN. Output ONLY the code — no prose, no markdown fences.";

export const composerRole = {
  id: "composer",
  label: "Build",

  async handle(text) {
    // 1. Offline template match — guaranteed to work.
    const hit = composer.compose(text);
    if (hit) {
      return {
        text: `Built a ${hit.template.name.toLowerCase()} — loaded into the editor. Press Run ▶ to try it.`,
        code: hit.code,
        action: { kind: "load-editor", code: hit.code },
      };
    }

    // 2. Fallback — call Claude via the serverless proxy.
    bus.emit("llm.generating", { prompt: text, via: "build->claude" });
    try {
      const baseSystem = await buildContext(text, { useWeb: true });
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system: baseSystem + "\n\n" + FRONTEND_INSTRUCTION,
          messages: [{ role: "user", content: text }],
          max_tokens: 4096,
        }),
      });
      const data = await r.json().catch(() => ({}));
      bus.emit("llm.done", r.ok ? {} : { error: data.error || r.statusText });

      if (!r.ok) {
        const list = composer.list().slice(0, 6).map(t => t.name).join(", ");
        return {
          text:
            `No template matched and Claude API failed (${r.status}: ${data.error?.message || data.error || r.statusText}). ` +
            `Try one of: ${list}.`,
        };
      }
      const code = cleanCode(data.text || "");
      return {
        text: "No template matched — Claude generated something for you. Loaded into the editor; press Run ▶.",
        code,
        action: { kind: "load-editor", code },
      };
    } catch (err) {
      bus.emit("llm.done", { error: err.message });
      const list = composer.list().slice(0, 6).map(t => t.name).join(", ");
      return {
        text: `Build failed: ${err.message}. Try one of: ${list}.`,
      };
    }
  },
};
