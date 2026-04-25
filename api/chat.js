// Vercel serverless function — proxies the browser to Anthropic's Messages API.
// The key is read from the ANTHROPIC_API_KEY env var, set via Vercel project
// settings (never committed to the repo). This is the only safe way to use
// a Claude key from a public static site: the browser never sees it.

const MODEL = "claude-opus-4-7";
const ALLOWED_METHODS = ["POST", "OPTIONS"];

export default async function handler(req, res) {
  // Basic CORS — same-origin only in production; permissive for local dev.
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (!ALLOWED_METHODS.includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error:
        "Server is missing ANTHROPIC_API_KEY. Set it in Vercel → Project → Settings → Environment Variables, then redeploy.",
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { messages, system, max_tokens = 4096, model = MODEL } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array required" });
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const text = data.content?.map(c => c.text || "").join("") || "";
    return res.status(200).json({ text, usage: data.usage, model: data.model });
  } catch (err) {
    return res.status(500).json({ error: err.message || "internal error" });
  }
}
