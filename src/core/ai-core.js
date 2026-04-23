// AI Core — reasoning + routing.
// The UI normally sets an explicit `role` on `ai.prompt`; if omitted, fall
// back to keyword routing. Swap the offline roles for real model calls later
// without changing callers.

import { bus } from "./bus.js";
import { registry } from "./registry.js";

export class AICore {
  constructor({ bus: b = bus, registry: r = registry } = {}) {
    this.bus = b;
    this.registry = r;

    this.bus.on("ai.prompt", async ({ text, role, __replyTopic }) => {
      const reply = await this.handle(text, role);
      if (__replyTopic) this.bus.emit(__replyTopic, reply);
      this.bus.emit("ai.reply", reply);
    });
  }

  route(text) {
    const t = (text || "").toLowerCase();
    // Build intents — "code me / build me / make me a flight sim" etc.
    if (/\b(code|build|make|create|generate|scaffold)\s+(me\s+)?(a|an|the)\s+/.test(t)) return "composer";
    if (/\b(code|build|make|create|generate)\s+me\b/.test(t))     return "composer";
    // Learning intents go to the knowledge base.
    if (/\b(what\s+is|what\s+are|who\s+is|who\s+created|explain|describe|define|tell\s+me\s+about|teach\s+me|history\s+of)\b/.test(t)) return "knowledge";
    if (/\b(ui|layout|css|style|button|frontend)\b/.test(t))      return "frontend";
    if (/\b(logo|icon|brand)\b/.test(t))                          return "logo";
    if (/\b(test|spec|assert)\b/.test(t))                         return "tester";
    if (/\b(think|reason|plan|how should)\b/.test(t))             return "thinking";
    if (/\b(say|speak|out loud)\b/.test(t))                       return "voice";
    return "coder";
  }

  async handle(text, roleId) {
    const id = roleId || this.route(text);
    const role = this.registry.role(id);
    if (!role) return { role: "core", text: `no role registered for "${id}"` };
    const ctx = { bus: this.bus, registry: this.registry };
    try {
      const out = await role.handle(text, ctx);
      return { role: role.id, label: role.label, ...out };
    } catch (err) {
      return { role: role.id, label: role.label, text: `error: ${err.message}` };
    }
  }
}
