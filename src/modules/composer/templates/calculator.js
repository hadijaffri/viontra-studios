// 4-function calculator with keyboard support.

export const calculatorTemplate = {
  id: "calculator",
  name: "Calculator",
  tagline: "4-function calculator with keyboard support.",
  intents: [/\bcalculator\b/, /\bcalc\s+(app|tool)\b/],
  keywords: ["calculator","calc","math","app"],
  render() { return CODE; },
};

const CODE = `// 4-function calculator.

const state = { display: "0", prev: null, op: null, justEvaluated: false };

const wrap = document.createElement("div");
wrap.style.cssText = "max-width:300px;margin:40px auto;font:15px system-ui";
wrap.innerHTML = \`
  <div id="d" style="background:#111827;color:#fff;padding:20px;border-radius:10px 10px 0 0;font:500 32px system-ui;text-align:right;overflow:hidden">0</div>
  <div id="pad" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#e5e7eb;border-radius:0 0 10px 10px;overflow:hidden"></div>
\`;
$root.appendChild(wrap);
const disp = wrap.querySelector("#d");
const pad  = wrap.querySelector("#pad");

const BTNS = [
  ["C","±","%","÷"],
  ["7","8","9","×"],
  ["4","5","6","−"],
  ["1","2","3","+"],
  ["0","0",".","="],
];

BTNS.flat().forEach((label, i) => {
  if (label === "0" && i === BTNS.flat().indexOf("0", 16) + 1) return;
  const b = document.createElement("button");
  b.textContent = label;
  const isOp  = ["÷","×","−","+","="].includes(label);
  const isTop = ["C","±","%"].includes(label);
  b.style.cssText =
    "border:none;padding:18px 0;font:500 18px system-ui;cursor:pointer;" +
    "background:" + (isOp ? "#f59e0b" : isTop ? "#9ca3af" : "#fff") + ";" +
    "color:" + (isOp || isTop ? "#fff" : "#111") + ";";
  if (label === "0") b.style.gridColumn = "span 2";
  b.addEventListener("click", () => press(label));
  pad.appendChild(b);
});

function press(k){
  if (/^[0-9]$/.test(k)){
    if (state.display === "0" || state.justEvaluated){ state.display = k; state.justEvaluated = false; }
    else state.display += k;
  } else if (k === "."){
    if (!state.display.includes(".")) state.display += ".";
  } else if (k === "C"){
    state.display = "0"; state.prev = null; state.op = null;
  } else if (k === "±"){
    state.display = String(parseFloat(state.display) * -1);
  } else if (k === "%"){
    state.display = String(parseFloat(state.display) / 100);
  } else if (["+","−","×","÷"].includes(k)){
    if (state.op && !state.justEvaluated) evaluate();
    state.prev = parseFloat(state.display); state.op = k; state.justEvaluated = true;
  } else if (k === "="){
    evaluate(); state.op = null;
  }
  disp.textContent = state.display;
}

function evaluate(){
  if (state.op == null || state.prev == null) return;
  const b = parseFloat(state.display);
  const r =
    state.op === "+" ? state.prev + b :
    state.op === "−" ? state.prev - b :
    state.op === "×" ? state.prev * b :
    state.op === "÷" ? (b === 0 ? NaN : state.prev / b) : b;
  state.display = Number.isFinite(r) ? String(r) : "Error";
  state.prev = r; state.justEvaluated = true;
}

window.addEventListener("keydown", e => {
  const map = { "*":"×", "/":"÷", "-":"−", "Enter":"=", "Backspace":"C", "Escape":"C" };
  const k = map[e.key] || e.key;
  if (/^[0-9]$/.test(k) || ["+","−","×","÷","=",".","C","%"].includes(k)){ press(k); e.preventDefault(); }
});
`;
