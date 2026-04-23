// Marketing landing page — hero, features, pricing, CTA.

export const landingPageTemplate = {
  id: "landing-page",
  name: "Landing page",
  tagline: "Hero + features + pricing + CTA marketing page.",
  intents: [/\blanding\s*page\b/, /\bmarketing\s*page\b/, /\bhero\s*page\b/, /\bhomepage\b/],
  keywords: ["landing","marketing","hero","page","website","homepage"],
  render() { return CODE; },
};

const CODE = `// Landing page scaffold — swap text & colors to rebrand.

const wrap = document.createElement("div");
wrap.style.cssText = "font:15px/1.55 system-ui;color:#0f172a;max-width:1100px;margin:0 auto;padding:0 20px";
wrap.innerHTML = \`
  <nav style="display:flex;align-items:center;justify-content:space-between;padding:24px 0">
    <div style="font:700 20px system-ui">◆ Lumen</div>
    <div style="display:flex;gap:24px;align-items:center">
      <a style="color:#475569;text-decoration:none">Features</a>
      <a style="color:#475569;text-decoration:none">Pricing</a>
      <a style="color:#475569;text-decoration:none">Docs</a>
      <a style="padding:8px 16px;background:#0f172a;color:#fff;border-radius:8px;text-decoration:none">Sign in</a>
    </div>
  </nav>

  <section style="padding:80px 0;text-align:center">
    <h1 style="font:700 56px/1.1 system-ui;margin:0 0 16px;letter-spacing:-.02em">
      Ship your ideas<br><span style="color:#2563eb">in days, not months.</span>
    </h1>
    <p style="font-size:19px;color:#475569;max-width:620px;margin:0 auto 32px">
      Lumen is the all-in-one platform that lets your team move from sketch to
      shipped product faster than you thought possible.
    </p>
    <div style="display:flex;gap:12px;justify-content:center">
      <button style="padding:14px 28px;background:#2563eb;color:#fff;border:none;border-radius:8px;font:500 16px system-ui;cursor:pointer">Get started — it's free</button>
      <button style="padding:14px 28px;background:#fff;color:#0f172a;border:1px solid #cbd5e1;border-radius:8px;font:500 16px system-ui;cursor:pointer">Watch demo</button>
    </div>
  </section>

  <section style="padding:64px 0">
    <h2 style="text-align:center;font:700 36px system-ui;margin:0 0 48px">Everything you need</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px" id="feats"></div>
  </section>

  <section style="padding:64px 0;background:#f8fafc;margin:0 -20px;padding-left:20px;padding-right:20px">
    <h2 style="text-align:center;font:700 36px system-ui;margin:0 0 48px">Simple pricing</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:960px;margin:0 auto" id="tiers"></div>
  </section>

  <footer style="padding:48px 0;text-align:center;color:#64748b;border-top:1px solid #e2e8f0;margin-top:48px">
    © Lumen. Built with Viontra.
  </footer>
\`;
$root.appendChild(wrap);

const feats = [
  { icon: "⚡", title: "Blazing fast", body: "Built on edge infra so every page loads in under a second, worldwide." },
  { icon: "🔒", title: "Secure by default", body: "SSO, audit logs, and SOC 2 — so your security team doesn't have to ask." },
  { icon: "🧩", title: "Plays well with others", body: "200+ integrations out of the box. Webhooks and a full REST API included." },
];
const featsEl = wrap.querySelector("#feats");
for (const f of feats){
  const c = document.createElement("div");
  c.style.cssText = "padding:28px;background:#fff;border:1px solid #e2e8f0;border-radius:12px";
  c.innerHTML = \`<div style="font-size:32px">\${f.icon}</div><h3 style="font:600 18px system-ui;margin:12px 0 6px">\${f.title}</h3><p style="color:#475569;margin:0">\${f.body}</p>\`;
  featsEl.appendChild(c);
}

const tiers = [
  { name: "Starter",  price: "$0",  body: "For hobby projects", feats: ["1 project","Community support","Basic analytics"] },
  { name: "Pro",      price: "$29", body: "For growing teams",  feats: ["Unlimited projects","Priority support","Advanced analytics","Custom domains"], highlight: true },
  { name: "Enterprise", price: "Contact us", body: "For large orgs", feats: ["SSO + SAML","SLAs","Dedicated support","Audit logs"] },
];
const tiersEl = wrap.querySelector("#tiers");
for (const t of tiers){
  const c = document.createElement("div");
  c.style.cssText = "padding:32px;background:#fff;border:" + (t.highlight ? "2px solid #2563eb" : "1px solid #e2e8f0") + ";border-radius:12px";
  c.innerHTML =
    "<h3 style='font:600 20px system-ui;margin:0'>" + t.name + "</h3>" +
    "<div style='font:700 36px system-ui;margin:10px 0'>" + t.price + "<span style='font:400 14px system-ui;color:#64748b'>" + (t.name==="Pro" ? "/mo" : "") + "</span></div>" +
    "<p style='color:#64748b;margin:0 0 16px'>" + t.body + "</p>" +
    "<ul style='list-style:none;padding:0;margin:0 0 20px'>" + t.feats.map(f => "<li style='padding:6px 0;color:#334155'>✓ " + f + "</li>").join("") + "</ul>" +
    "<button style='width:100%;padding:12px;background:" + (t.highlight ? "#2563eb" : "#fff") + ";color:" + (t.highlight ? "#fff" : "#0f172a") + ";border:" + (t.highlight ? "none" : "1px solid #cbd5e1") + ";border-radius:8px;font:500 15px system-ui;cursor:pointer'>Choose " + t.name + "</button>";
  tiersEl.appendChild(c);
}
`;
