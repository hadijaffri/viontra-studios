// Web learning — pulls live search results and pages from the internet so the
// local LLM has up-to-date context. Reuses the existing browser providers
// (DuckDuckGo / Brave / SerpAPI) so search keys configured in Settings work
// here too. This is the realistic "learn from the internet" path: we can't
// retrain the model, but we can feed it real web content at every prompt.

import { duckduckgo }    from "../browser/providers/duckduckgo.js";
import { brave }         from "../browser/providers/brave.js";
import { serpapi }       from "../browser/providers/serpapi.js";
import { getSettings }   from "../../ui/settings.js";
import { knowledgeBase } from "../knowledge/knowledge.js";

const PROVIDERS = { duckduckgo, brave, serpapi };

// Run a quick search via the user's selected provider. Returns up to `limit`
// {title, url, snippet} hits. Errors swallowed — web context is best-effort.
export async function searchWeb(query, { limit = 5, signal } = {}) {
  const s = getSettings();
  const provider = PROVIDERS[s.searchProvider] || duckduckgo;
  try {
    const results = await provider.search(query, { apiKey: s.apiKey, signal });
    return (results || []).slice(0, limit);
  } catch {
    return [];
  }
}

// Format search hits as a context block for the LLM system prompt.
export async function webContext(query, opts = {}) {
  const hits = await searchWeb(query, opts);
  if (!hits.length) return "";
  return hits
    .map(r => `[${r.title || r.url}] ${r.snippet || ""}\n${r.url || ""}`)
    .join("\n\n");
}

// Fetch a page and extract readable text. Many sites block CORS; failures are
// thrown so callers can show a useful error.
export async function fetchPageText(url, { signal } = {}) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`http ${res.status}`);
  const html = await res.text();
  return extractText(html);
}

// Crude HTML → text. Drops scripts/styles, strips tags, collapses whitespace.
// Good enough to feed an LLM as reference; not a full Reader Mode.
function extractText(html) {
  const cleaned = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  return cleaned
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, " ").trim();
}

// Teach the AI from a URL — fetch the page, extract text, register it as a
// KB article so future searches retrieve it. Use this for "I read this and
// you should know about it too" moments.
export async function teachFromUrl(url, { topic } = {}) {
  const text = await fetchPageText(url);
  const summary = text.slice(0, 6000);
  const id = "web-" + Math.abs(hash(url)).toString(36);
  const title = topic || extractTitle(text) || url;
  const kws = tokenize(title + " " + summary.slice(0, 200));
  knowledgeBase.addArticle({
    id, title: title + " (web)",
    keywords: kws,
    summary: `Fetched from ${url}.`,
    sections: [{
      id: "content",
      title,
      keywords: kws,
      body: summary,
    }],
  });
  return { id, title, length: text.length };
}

function extractTitle(text) {
  const first = text.split(/[.!?]/)[0] || "";
  return first.trim().slice(0, 80) || null;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

function tokenize(s) {
  return [...new Set(
    String(s).toLowerCase().replace(/[^a-z0-9+#.]+/g, " ")
      .split(/\s+/).filter(w => w.length > 2)
  )].slice(0, 12);
}
