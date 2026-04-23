// Stopwatch + lap timer.

export const stopwatchTemplate = {
  id: "stopwatch",
  name: "Stopwatch",
  tagline: "Start/stop/lap stopwatch with millisecond precision.",
  intents: [/\bstopwatch\b/, /\blap\s*timer\b/, /\btimer\s*app\b/],
  keywords: ["stopwatch","timer","lap","clock","app"],
  render() { return CODE; },
};

const CODE = `// Stopwatch with lap support.

const wrap = document.createElement("div");
wrap.style.cssText = "max-width:360px;margin:48px auto;text-align:center;font:15px system-ui;color:#0f172a";
wrap.innerHTML = \`
  <div id="t" style="font:500 64px ui-monospace,monospace;letter-spacing:-.02em;margin:16px 0">00:00.000</div>
  <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px">
    <button id="se" style="padding:10px 22px;border:none;background:#16a34a;color:#fff;border-radius:8px;font:500 16px system-ui;cursor:pointer">Start</button>
    <button id="la" style="padding:10px 22px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;font:500 16px system-ui;cursor:pointer">Lap</button>
    <button id="rs" style="padding:10px 22px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;font:500 16px system-ui;cursor:pointer">Reset</button>
  </div>
  <ol id="laps" style="text-align:left;font:ui-monospace,monospace;padding-left:24px"></ol>
\`;
$root.appendChild(wrap);

const dEl = wrap.querySelector("#t"), se = wrap.querySelector("#se"), la = wrap.querySelector("#la"), rs = wrap.querySelector("#rs"), lapsEl = wrap.querySelector("#laps");
let running = false, startAt = 0, accum = 0, laps = [], lastLap = 0, raf = 0;

function fmt(ms){
  const m = Math.floor(ms / 60000), s = Math.floor(ms/1000) % 60, x = Math.floor(ms) % 1000;
  return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0") + "." + String(x).padStart(3,"0");
}

function tick(){
  const ms = accum + (running ? performance.now() - startAt : 0);
  dEl.textContent = fmt(ms);
  if (running) raf = requestAnimationFrame(tick);
}

se.addEventListener("click", () => {
  if (!running){ startAt = performance.now(); running = true; se.textContent = "Stop"; se.style.background = "#dc2626"; tick(); }
  else { accum += performance.now() - startAt; running = false; se.textContent = "Start"; se.style.background = "#16a34a"; cancelAnimationFrame(raf); }
});
la.addEventListener("click", () => {
  const ms = accum + (running ? performance.now() - startAt : 0);
  const lap = ms - lastLap; lastLap = ms;
  laps.push({ total: ms, lap });
  const li = document.createElement("li");
  li.textContent = "lap " + fmt(lap) + "   total " + fmt(ms);
  lapsEl.appendChild(li);
});
rs.addEventListener("click", () => {
  running = false; accum = 0; lastLap = 0; laps = []; lapsEl.innerHTML = "";
  cancelAnimationFrame(raf); se.textContent = "Start"; se.style.background = "#16a34a";
  dEl.textContent = "00:00.000";
});
`;
