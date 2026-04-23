// SerpAPI — Google results over HTTP, requires an API key.

export const serpapi = {
  id: "serpapi",
  label: "SerpAPI",
  needsKey: true,

  async search(query, { apiKey, signal } = {}) {
    if (!apiKey) throw new Error("SerpAPI needs an API key (Settings → Search API key).");
    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("q", query);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("engine", "google");
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`serpapi http ${res.status}`);
    const data = await res.json();
    return (data.organic_results || []).map(r => ({
      title: r.title, url: r.link, snippet: r.snippet, source: "Google via SerpAPI",
    }));
  },
};
