// WebLLM engine wrapper — loads @mlc-ai/web-llm from a CDN, runs models on
// the user's GPU via WebGPU. Models live in the OPFS cache after first load.

const WEBLLM_CDN = "https://esm.run/@mlc-ai/web-llm";

export class Engine {
  constructor() {
    this.engine = null;
    this.modelId = null;
  }

  isLoaded() { return !!this.engine; }

  async load({ model, onProgress }) {
    if (typeof navigator === "undefined" || !navigator.gpu) {
      throw new Error("WebGPU not available — your browser/device doesn't support WebLLM. Try the lighter Transformers.js engine instead.");
    }
    const { CreateMLCEngine } = await import(WEBLLM_CDN);
    this.modelId = model;
    this.engine = await CreateMLCEngine(model, {
      initProgressCallback: (p) => {
        onProgress?.({
          stage: "downloading",
          text: p.text || "",
          percent: typeof p.progress === "number" ? Math.round(p.progress * 100) : null,
        });
      },
    });
    onProgress?.({ stage: "ready", percent: 100 });
  }

  async generate({ prompt, system, onToken, signal }) {
    const messages = [];
    if (system) messages.push({ role: "system", content: system });
    messages.push({ role: "user", content: prompt });

    let full = "";
    const stream = await this.engine.chat.completions.create({
      messages,
      stream: true,
      temperature: 0.4,
      max_tokens: 2048,
    });
    for await (const chunk of stream) {
      if (signal?.aborted) break;
      const delta = chunk.choices?.[0]?.delta?.content || "";
      if (delta) {
        full += delta;
        onToken?.(delta, full);
      }
    }
    return full;
  }

  async unload() {
    try { await this.engine?.unload?.(); } catch {}
    this.engine = null;
  }
}
