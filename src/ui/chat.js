// AI Agent panel — 6 capabilities as tabs. Each tab routes the prompt to a
// specific role; the transcript is shared so switching tabs mid-conversation
// keeps context visually contiguous.

import { bus } from "../core/bus.js";
import { listenOnce } from "../roles/voice.js";

const CAPS = [
  { id: "voice",    label: "Voice",     icon: "🎙", role: "voice" },
  { id: "thinking", label: "Thinking",  icon: "🧠", role: "thinking" },
  { id: "coder",    label: "Code",      icon: "⌨",  role: "coder" },
  { id: "tester",   label: "Test",      icon: "✓",  role: "tester" },
  { id: "logo",     label: "Logo",      icon: "◆",  role: "logo" },
  { id: "frontend", label: "Frontend",  icon: "▥",  role: "frontend" },
  { id: "knowledge", label: "Learn",    icon: "📖", role: "knowledge" },
  { id: "composer",  label: "Build",    icon: "🛠", role: "composer" },
  { id: "local-llm", label: "AI Pro",   icon: "✨", role: "local-llm" },
];

export function mountChat(host) {
  host.innerHTML = `
    <h3>AI Agent</h3>
    <div class="cap-tabs"></div>
    <div class="llm-status" id="llm-status" hidden style="padding:8px 12px;margin:0 0 6px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:6px;font:12px/1.45 system-ui;color:#3730a3"></div>
    <div class="chat-log" id="chat-log"></div>
    <div class="chat-input">
      <button class="mic-btn" title="Voice input">🎙</button>
      <textarea id="chat-text" placeholder="Ask the AI…"></textarea>
      <button id="chat-send">Send</button>
    </div>
  `;

  const tabsEl   = host.querySelector(".cap-tabs");
  const statusEl = host.querySelector("#llm-status");
  const log      = host.querySelector("#chat-log");
  const box      = host.querySelector("#chat-text");
  const send     = host.querySelector("#chat-send");
  const mic      = host.querySelector(".mic-btn");
  let active = CAPS[2]; // default: Code

  function showStatus(text) {
    statusEl.textContent = text;
    statusEl.hidden = false;
  }
  function hideStatus() { statusEl.hidden = true; }

  bus.on("llm.autoload.started", p => showStatus(`Loading AI model (${p.kind}: ${p.model}) — first time only…`));
  bus.on("llm.progress", p => {
    const pct = p.percent != null ? ` ${p.percent}%` : "";
    showStatus(`${p.stage}${pct} ${p.text || ""}`.trim());
  });
  bus.on("llm.ready", () => showStatus("AI ready."));
  bus.on("llm.generating", () => showStatus("AI is thinking… (web context + knowledge base)"));
  bus.on("llm.done", p => { if (p?.error) showStatus("AI error: " + p.error); else hideStatus(); });

  CAPS.forEach(cap => {
    const b = document.createElement("button");
    b.className = "cap-tab" + (cap.id === active.id ? " active" : "");
    b.innerHTML = `<span class="cap-icon">${cap.icon}</span><span>${cap.label}</span>`;
    b.addEventListener("click", () => {
      active = cap;
      tabsEl.querySelectorAll(".cap-tab").forEach(t => t.classList.remove("active"));
      b.classList.add("active");
      box.placeholder = `Ask ${cap.label}…`;
    });
    tabsEl.appendChild(b);
  });

  function append(role, reply) {
    const el = document.createElement("div");
    el.className = `msg ${role === "user" ? "user" : "ai"}`;
    const who = reply.label || (role === "user" ? "you" : role);
    el.innerHTML = `<div class="role"></div><div class="body"></div>`;
    el.querySelector(".role").textContent = who;
    el.querySelector(".body").textContent = reply.text || "";
    if (reply.thinking?.length) {
      const det = document.createElement("details");
      det.className = "thinking";
      det.innerHTML = `<summary>thinking</summary><ol></ol>`;
      reply.thinking.forEach(s => { const li = document.createElement("li"); li.textContent = s; det.querySelector("ol").appendChild(li); });
      el.appendChild(det);
    }
    if (reply.code) {
      const pre = document.createElement("pre");
      pre.textContent = reply.code;
      el.appendChild(pre);
    }
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  async function submit() {
    const text = box.value.trim();
    if (!text) return;
    box.value = "";
    append("user", { text });
    // Local LLM generation can take minutes; bump the timeout for that role.
    const timeoutMs = active.role === "local-llm" ? 5 * 60 * 1000 : 5000;
    const reply = await bus.request("ai.prompt", { text, role: active.role }, { timeoutMs });
    append(reply.role || "ai", reply);
    if (reply.action?.kind === "load-editor" && reply.code) {
      bus.emit("editor.load", { code: reply.code });
    }
  }

  send.addEventListener("click", submit);
  box.addEventListener("keydown", e => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit(); }
  });
  mic.addEventListener("click", async () => {
    mic.classList.add("listening");
    try {
      const transcript = await listenOnce();
      box.value = transcript; submit();
    } catch (err) {
      append("ai", { text: `voice: ${err.message}` });
    } finally {
      mic.classList.remove("listening");
    }
  });
}
