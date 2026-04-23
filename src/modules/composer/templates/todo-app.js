// Todo-list app with localStorage persistence.

export const todoAppTemplate = {
  id: "todo-app",
  name: "Todo app",
  tagline: "Task list with add/complete/delete and localStorage persistence.",
  intents: [/\btodo(\s+list|\s+app)?\b/, /\btask\s+(list|app|manager)\b/],
  keywords: ["todo","task","list","app","productivity"],
  render() { return CODE; },
};

const CODE = `// Todo app with localStorage persistence.

const KEY = "viontra:todo:v1";
let items = [];
try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch { items = []; }

const wrap = document.createElement("div");
wrap.style.cssText = "max-width:520px;margin:32px auto;font:15px system-ui;color:#111";
wrap.innerHTML = \`
  <h2 style="margin:0 0 12px;font:600 22px system-ui">My Tasks</h2>
  <form id="f" style="display:flex;gap:8px;margin-bottom:16px">
    <input id="t" placeholder="Add a task…" style="flex:1;padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font:inherit">
    <button style="padding:10px 16px;border:none;background:#2563eb;color:#fff;border-radius:8px;font:inherit;cursor:pointer">Add</button>
  </form>
  <ul id="list" style="list-style:none;padding:0;margin:0"></ul>
  <p id="empty" style="color:#6b7280;text-align:center;display:none">No tasks yet — add one above.</p>
\`;
$root.appendChild(wrap);

function save(){ try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }

function render(){
  const list = wrap.querySelector("#list");
  list.innerHTML = "";
  wrap.querySelector("#empty").style.display = items.length ? "none" : "block";
  for (const it of items){
    const li = document.createElement("li");
    li.style.cssText = "display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:8px;background:#fff";
    const cb = document.createElement("input");
    cb.type = "checkbox"; cb.checked = !!it.done;
    cb.addEventListener("change", () => { it.done = cb.checked; save(); render(); });
    const sp = document.createElement("span");
    sp.textContent = it.text;
    sp.style.cssText = "flex:1;" + (it.done ? "text-decoration:line-through;color:#9ca3af" : "");
    const rm = document.createElement("button");
    rm.textContent = "×"; rm.setAttribute("aria-label", "delete");
    rm.style.cssText = "background:none;border:none;color:#ef4444;font-size:20px;cursor:pointer;padding:0 6px";
    rm.addEventListener("click", () => { items = items.filter(x => x !== it); save(); render(); });
    li.append(cb, sp, rm);
    list.appendChild(li);
  }
}

wrap.querySelector("#f").addEventListener("submit", e => {
  e.preventDefault();
  const t = wrap.querySelector("#t");
  const text = t.value.trim();
  if (!text) return;
  items.push({ text, done: false, id: Date.now() });
  t.value = ""; save(); render();
});

render();
`;
