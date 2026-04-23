// DuckDuckGo Instant Answer — works without an API key, CORS-friendly.
// Returns a mixed set of abstract/related/definition hits.

export const duckduckgo = {
  id: "duckduckgo",
  label: "DuckDuckGo",
  needsKey: false,

  async search(query, { signal } = {}) {
    const url = new URL("https://api.duckduckgo.com/");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("no_html", "1");
    url.searchParams.set("skip_disambig", "1");

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`duckduckgo http ${res.status}`);
    const data = await res.json();

    const out = [];
    if (data.AbstractText) {
      out.push({
        title: data.Heading || query,
        url: data.AbstractURL,
        snippet: data.AbstractText,
        source: data.AbstractSource,
      });
    }
    for (const r of (data.RelatedTopics || []).slice(0, 8)) {
      if (r.Text && r.FirstURL) {
        out.push({ title: r.Text.split(" - ")[0], url: r.FirstURL, snippet: r.Text, source: "DuckDuckGo" });
      }
    }
    return out;
  },
};
