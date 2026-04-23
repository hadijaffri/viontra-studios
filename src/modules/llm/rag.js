// RAG (retrieval-augmented generation) helper — pulls the most relevant KB
// sections, the closest composer template, and (optionally) live web search
// snippets, then formats them as reference context that gets injected into
// the LLM's system prompt.

import { knowledgeBase } from "../knowledge/knowledge.js";
import { composer }      from "../composer/composer.js";
import { webContext }    from "./web-learn.js";

const SYSTEM_BASE = `You are Viontra Studios' offline coding AI. You generate runnable JavaScript that builds UI inside a sandbox iframe where a global \`$root\` div is available for output. Do NOT use top-level imports — write plain script. Prefer DOM APIs and canvas. If you need a third-party library (e.g. Three.js), inject it via a <script> tag from a CDN. Output ONLY the code — no prose, no markdown fences.`;

// Async because we may run a live web search.
export async function buildContext(prompt, {
  maxKbSections = 4,
  includeTemplate = true,
  useWeb = false,
  webLimit = 4,
} = {}) {
  const parts = [SYSTEM_BASE];

  // Closest composer template (if any) as exemplar.
  if (includeTemplate) {
    const hit = composer.match(prompt);
    if (hit && hit.score > 0) {
      const code = hit.template.render({});
      parts.push(
        "\n--- REFERENCE TEMPLATE (similar to what the user asked for; adapt, don't copy verbatim) ---\n" +
        `// ${hit.template.name}: ${hit.template.tagline}\n` +
        truncate(code, 4000)
      );
    }
  }

  // KB sections that match.
  const hits = knowledgeBase.search(prompt, { limit: maxKbSections });
  if (hits.length) {
    const refs = hits
      .map(h => `[${h.article.title} › ${h.section.title}]\n${h.section.body}`)
      .join("\n\n");
    parts.push(
      "\n--- REFERENCE KNOWLEDGE (use these facts when relevant) ---\n" +
      truncate(refs, 3000)
    );
  }

  // Live web search snippets — best-effort, swallow errors.
  if (useWeb) {
    try {
      const web = await webContext(prompt, { limit: webLimit });
      if (web) {
        parts.push(
          "\n--- LIVE WEB CONTEXT (search results just fetched for this prompt) ---\n" +
          truncate(web, 3000)
        );
      }
    } catch {}
  }

  parts.push(
    "\n--- TASK ---\n" +
    "Write JavaScript code that fulfils the user's request. Output the code only."
  );

  return parts.join("\n");
}

function truncate(s, n) {
  return s.length > n ? s.slice(0, n) + "\n// ... (truncated for context window)" : s;
}

// Strip common markdown code fences if the model adds them despite instructions.
export function cleanCode(s) {
  let out = String(s || "").trim();
  out = out.replace(/^```(?:javascript|js|html)?\s*\n?/i, "");
  out = out.replace(/```\s*$/i, "");
  return out.trim();
}
