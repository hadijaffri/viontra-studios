// Paint / drawing canvas with brush size and colors.

export const paintCanvasTemplate = {
  id: "paint-canvas",
  name: "Paint canvas",
  tagline: "Freehand drawing canvas with color picker and brush size.",
  intents: [/\bpaint\s*(app|canvas)\b/, /\bdrawing\s*(app|canvas)\b/, /\bsketch\s*app\b/],
  keywords: ["paint","draw","drawing","sketch","canvas","brush"],
  render() { return CODE; },
};

const CODE = `// Paint / sketch canvas.

const wrap = document.createElement("div");
wrap.style.cssText = "font:14px system-ui;text-align:center;padding:10px";
wrap.innerHTML = \`
  <div style="display:flex;gap:10px;align-items:center;justify-content:center;margin-bottom:10px">
    <label>color <input id="c" type="color" value="#2563eb"></label>
    <label>size <input id="s" type="range" min="1" max="40" value="5"></label>
    <button id="clr" style="padding:6px 12px;border:1px solid #cbd5e1;background:#fff;border-radius:6px;cursor:pointer">Clear</button>
    <button id="save" style="padding:6px 12px;border:1px solid #cbd5e1;background:#fff;border-radius:6px;cursor:pointer">Download</button>
  </div>
  <canvas id="cv" width="800" height="500" style="background:#fff;border:1px solid #cbd5e1;border-radius:8px;cursor:crosshair;touch-action:none"></canvas>
\`;
$root.appendChild(wrap);
const cv  = wrap.querySelector("#cv"), cx = cv.getContext("2d");
const col = wrap.querySelector("#c"), sz = wrap.querySelector("#s");

let drawing = false, lx = 0, ly = 0;
function pos(e){
  const r = cv.getBoundingClientRect();
  const p = e.touches ? e.touches[0] : e;
  return { x: (p.clientX - r.left) * (cv.width / r.width), y: (p.clientY - r.top) * (cv.height / r.height) };
}
function down(e){ drawing = true; const p = pos(e); lx = p.x; ly = p.y; e.preventDefault(); }
function move(e){
  if (!drawing) return;
  const p = pos(e);
  cx.strokeStyle = col.value;
  cx.lineWidth = +sz.value;
  cx.lineCap = "round"; cx.lineJoin = "round";
  cx.beginPath(); cx.moveTo(lx, ly); cx.lineTo(p.x, p.y); cx.stroke();
  lx = p.x; ly = p.y;
  e.preventDefault();
}
function up(){ drawing = false; }

cv.addEventListener("mousedown", down); cv.addEventListener("mousemove", move); window.addEventListener("mouseup", up);
cv.addEventListener("touchstart", down); cv.addEventListener("touchmove", move); window.addEventListener("touchend", up);

wrap.querySelector("#clr").addEventListener("click", () => cx.clearRect(0, 0, cv.width, cv.height));
wrap.querySelector("#save").addEventListener("click", () => {
  const a = document.createElement("a");
  a.download = "sketch.png"; a.href = cv.toDataURL("image/png"); a.click();
});
`;
