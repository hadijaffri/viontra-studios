// LLM manager — auto-picks an engine (WebLLM if WebGPU is available, otherwise
// Transformers.js) and an appropriate small code-focused model. Lazy-loaded so
// boot stays fast. No settings UI — the AI Pro role calls ensureLoaded() on
// first prompt and shows progress inline in the chat.

import { bus } from "../../core/bus.js";

// Auto-defaults. WebLLM gives better quality; Transformers.js is the fallback
// for browsers without WebGPU (Safari iOS, older Firefox, etc.).
const DEFAULT_WEBLLM_MODEL       = "Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC";
const DEFAULT_TRANSFORMERS_MODEL = "Xenova/Qwen2.5-Coder-0.5B-Instruct";

export function pickDefaults() {
  const hasGPU = typeof navigator !== "undefined" && !!navigator.gpu;
  return hasGPU
    ? { kind: "webllm",       model: DEFAULT_WEBLLM_MODEL }
    : { kind: "transformers", model: DEFAULT_TRANSFORMERS_MODEL };
}

class LLMManager {
  constructor() {
    this.engine = null;       // active engine instance
    this.engineKind = null;   // "webllm" | "transformers"
    this.modelId = null;
    this.loading = false;
    this.lastProgress = null;
  }

  isLoaded() { return !!this.engine && this.engine.isLoaded(); }

  status() {
    return {
      kind: this.engineKind,
      model: this.modelId,
      loaded: this.isLoaded(),
      loading: this.loading,
      progress: this.lastProgress,
    };
  }

  async ensureLoaded({ kind, model }) {
    if (this.isLoaded() && this.engineKind === kind && this.modelId === model) return;
    if (this.loading) throw new Error("a model is already loading — wait or unload first");

    this.loading = true;
    this.engineKind = kind; this.modelId = model;
    bus.emit("llm.loading", { kind, model, stage: "starting" });

    try {
      const mod = kind === "webllm"
        ? await import("./webllm-engine.js")
        : await import("./transformers-engine.js");
      this.engine = new mod.Engine();
      await this.engine.load({
        model,
        onProgress: p => {
          this.lastProgress = p;
          bus.emit("llm.progress", { kind, model, ...p });
        },
      });
      bus.emit("llm.ready", { kind, model });
    } finally {
      this.loading = false;
    }
  }

  async generate({ prompt, system, onToken, signal }) {
    if (!this.isLoaded()) throw new Error("LLM not loaded — open Settings → AI engine to load one");
    return this.engine.generate({ prompt, system, onToken, signal });
  }

  async unload() {
    if (this.engine?.unload) await this.engine.unload();
    this.engine = null; this.engineKind = null; this.modelId = null;
    bus.emit("llm.unloaded", {});
  }
}

export const llm = new LLMManager();
