// Composer — offline code generator.
// Takes a natural-language build request ("code me a flight sim"), matches it
// against a library of runnable templates, and emits a complete JS scaffold
// the sandbox can execute. No LLM, no API key — pattern matching over a
// curated template set plus parameter extraction from the prompt.

const STOP = new Set([
  "a","an","the","me","please","can","could","would","you","i","want","need",
  "make","build","create","code","generate","write","scaffold","setup",
]);

function tokenize(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9+#.]+/g, " ")
    .split(/\s+/).filter(w => w && !STOP.has(w) && w.length > 1);
}

export class Composer {
  constructor() { this.templates = []; }

  register(tpl) {
    if (!tpl?.id || typeof tpl.render !== "function") {
      throw new Error("composer: template needs id + render()");
    }
    this.templates.push(tpl);
    return this;
  }

  list() {
    return this.templates.map(t => ({ id: t.id, name: t.name, tagline: t.tagline }));
  }

  match(text) {
    const raw = String(text || "").toLowerCase();
    const tokens = tokenize(raw);
    let best = null;
    for (const tpl of this.templates) {
      const score = scoreTemplate(tpl, raw, tokens);
      if (score > 0 && (!best || score > best.score)) {
        best = { template: tpl, score };
      }
    }
    return best;
  }

  compose(text) {
    const hit = this.match(text);
    if (!hit) return null;
    const params = extractParams(hit.template, text);
    const code = hit.template.render(params);
    return { template: hit.template, code, params, score: hit.score };
  }
}

function scoreTemplate(tpl, rawLower, tokens) {
  let score = 0;
  for (const intent of tpl.intents || []) {
    if (intent instanceof RegExp && intent.test(rawLower)) score += 12;
    else if (typeof intent === "string" && rawLower.includes(intent.toLowerCase())) score += 6;
  }
  const kws = new Set((tpl.keywords || []).map(k => k.toLowerCase()));
  for (const t of tokens) if (kws.has(t)) score += 2;
  return score;
}

function extractParams(tpl, text) {
  const out = {};
  for (const p of tpl.params || []) {
    let v;
    try { v = p.extract ? p.extract(text) : undefined; } catch { v = undefined; }
    out[p.name] = v === undefined ? p.default : v;
  }
  return out;
}

export const composer = new Composer();
