// Admin dashboard — cards, mini-chart, table.

export const dashboardTemplate = {
  id: "dashboard",
  name: "Dashboard",
  tagline: "Admin dashboard with KPI cards, a mini-chart, and a recent-activity table.",
  intents: [/\b(admin\s+)?dashboard\b/, /\banalytics\s+(page|dashboard)\b/, /\badmin\s+panel\b/],
  keywords: ["dashboard","admin","analytics","metrics","chart","kpi"],
  render() { return CODE; },
};

const CODE = `// Dashboard scaffold — fake data. Swap in real values via a fetch().

const wrap = document.createElement("div");
wrap.style.cssText = "font:14px/1.5 system-ui;color:#0f172a;padding:24px;background:#f8fafc;min-height:100vh;margin:-12px";
wrap.innerHTML = \`
  <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px">
    <div>
      <h1 style="font:600 24px system-ui;margin:0">Dashboard</h1>
      <p style="color:#64748b;margin:4px 0 0">Welcome back — here's what's happening today.</p>
    </div>
    <div style="display:flex;gap:8px">
      <button style="padding:8px 14px;background:#fff;border:1px solid #cbd5e1;border-radius:8px;cursor:pointer">Export</button>
      <button style="padding:8px 14px;background:#0f172a;color:#fff;border:none;border-radius:8px;cursor:pointer">+ New</button>
    </div>
  </header>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px" id="kpis"></div>
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px">
    <div style="background:#fff;padding:20px;border-radius:12px;border:1px solid #e2e8f0">
      <h3 style="margin:0 0 14px;font:600 16px system-ui">Revenue (last 14 days)</h3>
      <canvas id="chart" width="600" height="240"></canvas>
    </div>
    <div style="background:#fff;padding:20px;border-radius:12px;border:1px solid #e2e8f0">
      <h3 style="margin:0 0 14px;font:600 16px system-ui">Recent activity</h3>
      <ul id="feed" style="list-style:none;padding:0;margin:0"></ul>
    </div>
  </div>
\`;
$root.appendChild(wrap);

const KPIs = [
  { label: "Revenue",     value: "$48,290", delta: "+12.4%",  up: true },
  { label: "Active users", value: "3,482",  delta: "+5.1%",   up: true },
  { label: "Signups",     value: "212",    delta: "-2.3%",   up: false },
  { label: "Churn",       value: "1.8%",   delta: "-0.4 pts", up: true },
];
const kpisEl = wrap.querySelector("#kpis");
for (const k of KPIs){
  const c = document.createElement("div");
  c.style.cssText = "padding:18px;background:#fff;border-radius:12px;border:1px solid #e2e8f0";
  c.innerHTML =
    "<div style='color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.04em'>" + k.label + "</div>" +
    "<div style='font:600 26px system-ui;margin:6px 0 4px'>" + k.value + "</div>" +
    "<div style='font-size:13px;color:" + (k.up ? "#16a34a" : "#dc2626") + "'>" + k.delta + " vs last week</div>";
  kpisEl.appendChild(c);
}

// Mini bar chart
const cnv = wrap.querySelector("#chart");
const ctx = cnv.getContext("2d");
const data = Array.from({length: 14}, () => 30 + Math.random() * 180);
const max = Math.max(...data);
const barW = cnv.width / data.length;
data.forEach((v, i) => {
  const h = (v / max) * (cnv.height - 30);
  ctx.fillStyle = "#60a5fa";
  ctx.fillRect(i * barW + 4, cnv.height - h, barW - 8, h);
  ctx.fillStyle = "#94a3b8"; ctx.font = "10px system-ui";
  ctx.fillText("d" + (i+1), i * barW + 6, cnv.height - 2);
});

const ACTIVITY = [
  { who: "Ada Lovelace",    what: "signed up",        when: "2m ago" },
  { who: "Rich Hickey",     what: "upgraded to Pro",  when: "14m ago" },
  { who: "Linus Torvalds",  what: "left a review",    when: "1h ago" },
  { who: "Barbara Liskov",  what: "invited 3 members",when: "2h ago" },
  { who: "Alan Kay",        what: "changed plan",     when: "4h ago" },
];
const feed = wrap.querySelector("#feed");
for (const a of ACTIVITY){
  const li = document.createElement("li");
  li.style.cssText = "padding:10px 0;border-bottom:1px solid #f1f5f9";
  li.innerHTML = "<strong>" + a.who + "</strong> " + a.what + "<div style='color:#94a3b8;font-size:12px'>" + a.when + "</div>";
  feed.appendChild(li);
}
`;
