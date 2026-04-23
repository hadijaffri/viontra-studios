// Brave Search — requires an API key (set in Settings).

export const brave = {
  id: "brave",
  label: "Brave Search",
  needsKey: true,

  async search(query, { apiKey, signal } = {}) {
    if (!apiKey) throw new Error("Brave Search needs an API key (Settings → Search API key).");
    const url = new URL("https://api.search.brave.com/res/v1/web/search");
    url.searchParams.set("q", query);
    const res = await fetch(url, {
      signal,
      headers: { "Accept": "application/json", "X-Subscription-Token": apiKey },
    });
    if (!res.ok) throw new Error(`brave http ${res.status}`);
    const data = await res.json();
    return (data?.web?.results || []).map(r => ({
      title: r.title, url: r.url, snippet: r.description, source: "Brave",
    }));
  },
};
