// Communication Layer — message bus that connects every module and AI role.
// Keep this tiny and dependency-free so the rest of the system can lean on it.

export class MessageBus {
  constructor() {
    this.listeners = new Map(); // topic -> Set<handler>
    this.history = [];          // last N messages, for debugging / replay
    this.historyLimit = 200;
  }

  on(topic, handler) {
    if (!this.listeners.has(topic)) this.listeners.set(topic, new Set());
    this.listeners.get(topic).add(handler);
    return () => this.off(topic, handler);
  }

  off(topic, handler) {
    this.listeners.get(topic)?.delete(handler);
  }

  emit(topic, payload) {
    const msg = { topic, payload, t: Date.now() };
    this.history.push(msg);
    if (this.history.length > this.historyLimit) this.history.shift();

    const direct = this.listeners.get(topic);
    const wild   = this.listeners.get("*");
    direct?.forEach(h => { try { h(payload, msg); } catch (e) { console.error(e); } });
    wild?.forEach(h => { try { h(payload, msg); } catch (e) { console.error(e); } });
  }

  // request/response helper — await a single reply on a response topic.
  request(topic, payload, { replyTopic, timeoutMs = 5000 } = {}) {
    const rt = replyTopic || `${topic}.reply.${Math.random().toString(36).slice(2)}`;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { off(); reject(new Error(`bus.request timeout: ${topic}`)); }, timeoutMs);
      const off = this.on(rt, (data) => { clearTimeout(timer); off(); resolve(data); });
      this.emit(topic, { ...payload, __replyTopic: rt });
    });
  }
}

// Single app-wide bus. Import this anywhere a module needs to talk.
export const bus = new MessageBus();
