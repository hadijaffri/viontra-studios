// Local chat app — rooms + messages stored in localStorage, echo bot.

export const chatAppTemplate = {
  id: "chat-app",
  name: "Chat app",
  tagline: "Chat UI with rooms, persisted messages, and an echo bot.",
  intents: [/\bchat\s*(app|ui)\b/, /\bmessaging\s*(app|ui)\b/],
  keywords: ["chat","messaging","messenger","app","conversation"],
  render() { return CODE; },
};

const CODE = `// Chat app — rooms on the left, messages on the right, echo bot replies.

const KEY = "viontra:chat:v1";
let store = {};
try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
if (!Object.keys(store).length) store = { general: [], random: [], ideas: [] };
let active = Object.keys(store)[0];

const wrap = document.createElement("div");
wrap.style.cssText = "display:grid;grid-template-columns:220px 1fr;height:560px;font:14px system-ui;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;max-width:900px;margin:12px auto;background:#fff";
wrap.innerHTML = \`
  <aside style="background:#0f172a;color:#e2e8f0;padding:16px;display:flex;flex-direction:column">
    <div style="font-weight:600;margin-bottom:14px">Rooms</div>
    <ul id="rooms" style="list-style:none;padding:0;margin:0;flex:1;overflow:auto"></ul>
    <form id="newRoom" style="display:flex;gap:4px;margin-top:12px">
      <input id="roomName" placeholder="+ new room" style="flex:1;padding:6px;border-radius:4px;border:none;background:#1e293b;color:#fff">
    </form>
  </aside>
  <main style="display:flex;flex-direction:column">
    <header style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-weight:600" id="title"></header>
    <div id="log" style="flex:1;overflow:auto;padding:14px 16px;background:#f8fafc"></div>
    <form id="msgForm" style="display:flex;gap:8px;padding:12px;border-top:1px solid #e2e8f0">
      <input id="msg" placeholder="Type a message…" style="flex:1;padding:10px;border:1px solid #cbd5e1;border-radius:6px;font:inherit">
      <button style="padding:10px 16px;background:#2563eb;color:#fff;border:none;border-radius:6px;cursor:pointer">Send</button>
    </form>
  </main>
\`;
$root.appendChild(wrap);

function save(){ try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} }

function renderRooms(){
  const ul = wrap.querySelector("#rooms");
  ul.innerHTML = "";
  for (const r of Object.keys(store)){
    const li = document.createElement("li");
    li.textContent = "# " + r;
    li.style.cssText = "padding:8px 10px;border-radius:6px;cursor:pointer;margin-bottom:2px;" + (r === active ? "background:#1e293b" : "");
    li.addEventListener("click", () => { active = r; renderRooms(); renderLog(); });
    ul.appendChild(li);
  }
  wrap.querySelector("#title").textContent = "# " + active;
}

function renderLog(){
  const log = wrap.querySelector("#log");
  log.innerHTML = "";
  for (const m of store[active]){
    const bubble = document.createElement("div");
    const mine = m.who === "you";
    bubble.style.cssText = "max-width:70%;padding:8px 12px;border-radius:10px;margin:4px 0;" +
      (mine ? "background:#2563eb;color:#fff;margin-left:auto" : "background:#fff;border:1px solid #e2e8f0");
    bubble.innerHTML = "<div style='font-size:11px;opacity:.7;margin-bottom:2px'>" + m.who + "</div>" + escape(m.text);
    log.appendChild(bubble);
  }
  log.scrollTop = log.scrollHeight;
}
function escape(s){ return String(s).replace(/[&<>]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;" })[c]); }

wrap.querySelector("#msgForm").addEventListener("submit", e => {
  e.preventDefault();
  const box = wrap.querySelector("#msg");
  const text = box.value.trim(); if (!text) return;
  store[active].push({ who: "you", text, at: Date.now() });
  box.value = ""; save(); renderLog();
  setTimeout(() => {
    store[active].push({ who: "bot", text: "echo: " + text, at: Date.now() });
    save(); renderLog();
  }, 400);
});
wrap.querySelector("#newRoom").addEventListener("submit", e => {
  e.preventDefault();
  const n = wrap.querySelector("#roomName");
  const name = n.value.trim().replace(/\\s+/g, "-").toLowerCase();
  if (!name || store[name]) return;
  store[name] = []; active = name; n.value = ""; save(); renderRooms(); renderLog();
});

renderRooms(); renderLog();
`;
