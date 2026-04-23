# Viontra Studios

All-in-one AI-powered creative + development environment. Zero dependencies,
works offline, runs directly from `index.html`.

## Run

ES modules need a static server:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  Viontra Studios                                    status    ⚙      │
├────────┬──────────────────────┬──────────────────┬──────────────────┤
│        │ ┌──────────────────┐ │                  │                  │
│ Tools  │ │ Web Browser      │ │  Workspace       │  AI Agent        │
│        │ │ (search API)     │ │  editor·preview  │  6 capabilities  │
│ roles  │ ├──────────────────┤ │  console         │  voice · think   │
│ tools  │ │ Design           │ │                  │  code · test     │
│        │ │ logo · 3D · web  │ │                  │  logo · frontend │
│        │ └──────────────────┘ │                  │                  │
└────────┴──────────────────────┴──────────────────┴──────────────────┘
        the studio (two sections, swappable in Settings)
```

Open **Settings (⚙)** to flip the studio split (top/bottom ↔ left/right) and
choose which half shows the browser vs the design canvas. Default: browser
on top, design on bottom.

## First-run tutorial

Viontra sets a cookie on first visit and shows a 5-step tutorial with a Skip
button. Returning users skip straight to the studio. Replay the tutorial from
Settings.

## Search API key

The web browser module uses a **pluggable search provider**:
- DuckDuckGo (default, no key required, limited)
- Brave Search (key)
- SerpAPI (key)

Paste your key in **Settings → Search API key** — it's stored in
`localStorage` only, never transmitted except to the provider you pick.

## Architecture

```
src/
├── core/
│   ├── bus.js          message bus (Communication Layer)
│   ├── registry.js     pluggable roles/tools/modules (Expansion System)
│   ├── ai-core.js      routes prompts to the selected role
│   └── storage.js      cookie + localStorage helpers
├── engine/
│   └── sandbox.js      sandboxed iframe for live code execution
├── roles/              the 6 AI-agent capabilities
│   ├── voice.js           🎙  voice chat (Web Speech API)
│   ├── thinking.js        🧠  extended thinking
│   ├── coder.js           ⌨  coding / backend
│   ├── tester.js          ✓  testing
│   ├── logo-design.js     ◆  logo design
│   ├── frontend.js        ▥  frontend design
│   ├── designer.js        (legacy helper)
│   └── game.js            (legacy helper)
├── modules/
│   ├── browser/
│   │   ├── browser.js      in-studio web browser
│   │   └── providers/      duckduckgo · brave · serpapi
│   ├── design/
│   │   ├── logo.js         SVG logo designer
│   │   ├── model3d.js      software-rendered 3D wireframe modeler
│   │   └── webpage.js      visual webpage builder
│   └── game/
│       ├── player.js · objects.js · physics.js
├── ui/
│   ├── app.js          bootstrap
│   ├── studio.js       the big square (browser + design)
│   ├── chat.js         AI agent panel (6 capability tabs)
│   ├── workspace.js    editor + preview + console
│   ├── tools.js        tool panel
│   ├── settings.js     settings modal (layout, API key, tutorial)
│   └── tutorial.js     first-run walkthrough
└── styles/app.css

.claude/agents/         Claude Code subagents for dev workflow
├── viontra-architect.md
├── viontra-ai-roles.md
├── viontra-design.md
└── viontra-browser.md
```

## Subagents

Four specialist subagents split the work:

| Agent | Responsibility |
|---|---|
| `viontra-architect` | module boundaries, wiring, keeping things decoupled |
| `viontra-ai-roles`  | the AI agent and its 6 capabilities |
| `viontra-design`    | logo / 3D / webpage design modules |
| `viontra-browser`   | search providers + in-studio browser |

Claude Code will auto-route to them based on their `description` — or invoke
explicitly with `@viontra-design fix the logo tool`.

## Adding a new AI capability

```js
// src/roles/my-role.js
export const myRole = {
  id: "my-role",
  label: "My Role",
  async handle(text) {
    return { text: "done", code: "$root.textContent = 'hi';",
             action: { kind: "load-editor", code: "…" } };
  },
};
// src/ui/app.js → registry.registerRole(myRole);
// src/ui/chat.js → add an entry to CAPS
```

## Offline

- The core shell (UI, knowledge base, composer templates, sandbox) runs
  fully offline — no CDNs, no external fonts, no fetches.
- The **sandbox** iframe has `sandbox="allow-scripts"` only — no network
  unless the user's code opts in.
- The **browser** module fetches only when the user submits a search.
- **AI Pro** is the opt-in exception: the first time you prompt it, it
  downloads a small LLM from a CDN (80 MB–2.4 GB once, then cached offline
  via OPFS). It also runs live web searches per prompt via the browser
  module so answers include current information.

## AI Pro — local LLM + web RAG

The **AI Pro** tab runs a real generative model on your machine. No API key.

- On first use it auto-loads **Qwen2.5-Coder 1.5B** via
  [WebLLM](https://github.com/mlc-ai/web-llm) (WebGPU), or falls back to
  **Qwen2.5-Coder 0.5B** via
  [Transformers.js](https://github.com/huggingface/transformers.js) if WebGPU
  isn't available. Model weights are cached in the browser after first load.
- Every prompt is augmented with:
  - relevant sections from the **knowledge base**
  - the closest **composer template** as an exemplar
  - **live web search results** via the selected search provider
- The combination lets a small local model punch well above its weight.
- Quality is meaningfully lower than Claude / GPT-4 — expect "decent intern"
  not "senior engineer." Templates remain the guaranteed-working path.

## Deploy to Vercel (from GitHub)

This is a static site — no build step. Deploy in two steps:

```bash
# 1. Push to GitHub (after creating a repo at github.com/new)
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git push -u origin main

# 2. Import on Vercel
#    → vercel.com/new → pick the GitHub repo → Deploy
```

Or with the Vercel CLI:

```bash
npm i -g vercel
vercel            # first-time setup, answers "static site"
vercel --prod     # deploy to production
```

`vercel.json` sets clean URLs and the cross-origin headers needed for
WebLLM's SharedArrayBuffer usage.
