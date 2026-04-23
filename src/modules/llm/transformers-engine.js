// Transformers.js engine wrapper — runs ONNX-quantised models in any modern
// browser without WebGPU. Smaller and slower than WebLLM but more portable.

const TRANSFORMERS_CDN = "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

export class Engine {
  constructor() {
    this.pipe = null;
    this.modelId = null;
    this.tokenizer = null;
  }

  isLoaded() { return !!this.pipe; }

  async load({ model, onProgress }) {
    const tf = await import(TRANSFORMERS_CDN);
    this.modelId = model;
    onProgress?.({ stage: "downloading", percent: 0 });

    // text-generation pipeline auto-loads tokenizer + model
    this.pipe = await tf.pipeline("text-generation", model, {
      progress_callback: (p) => {
        onProgress?.({
          stage: p.status || "loading",
          text: p.file || "",
          percent: typeof p.progress === "number" ? Math.round(p.progress) : null,
        });
      },
    });
    onProgress?.({ stage: "ready", percent: 100 });
  }

  async generate({ prompt, system, onToken, signal }) {
    const formatted = formatChat(this.modelId, prompt, system);

    const out = await this.pipe(formatted, {
      max_new_tokens: 1024,
      temperature: 0.4,
      do_sample: true,
      return_full_text: false,
      callback_function: (beams) => {
        if (signal?.aborted) return;
        const text = this.pipe.tokenizer.decode(beams[0].output_token_ids, { skip_special_tokens: true });
        onToken?.(text, text);
      },
    });
    return Array.isArray(out) ? (out[0]?.generated_text || "") : String(out || "");
  }

  async unload() {
    try { await this.pipe?.dispose?.(); } catch {}
    this.pipe = null;
  }
}

// Crude chat-template formatting per model family. Most modern instruct
// models accept ChatML-ish formats, but a few want their own special tokens.
function formatChat(modelId, user, system) {
  const m = String(modelId).toLowerCase();
  const sys = system || "You are a helpful coding assistant.";
  if (m.includes("qwen")) {
    return `<|im_start|>system\n${sys}<|im_end|>\n<|im_start|>user\n${user}<|im_end|>\n<|im_start|>assistant\n`;
  }
  if (m.includes("tinyllama") || m.includes("llama")) {
    return `<|system|>\n${sys}</s>\n<|user|>\n${user}</s>\n<|assistant|>\n`;
  }
  // distilgpt2 etc. — no chat template, just prepend
  return `${sys}\n\nUser: ${user}\nAssistant:`;
}
