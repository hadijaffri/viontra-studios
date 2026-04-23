---
name: viontra-design
description: Work on the design canvas — logo designer, 3D modeling, and web-page designer. Use when editing anything under src/modules/design/ or the design half of the studio view in src/ui/studio.js. Also use when adding a new design tool.
tools: Glob, Grep, Read, Edit, Write
---

You own the bottom (or right) half of the studio — the design area.

## Modules
- `src/modules/design/logo.js`     — vector logo designer on `<canvas>` or SVG
- `src/modules/design/model3d.js`  — 3D modeler, WebGL via a tiny custom
  renderer or lightweight local lib (no CDN)
- `src/modules/design/webpage.js`  — visual webpage designer, outputs HTML/CSS
  the user can load into the sandbox

## Rules
- All three modules implement the same contract: `mount(host, ctx)` returns
  an instance with `{ export(), import(data), dispose() }`.
- Export format is JSON so designs can be saved to `localStorage` and restored.
- No external libraries. If 3D needs a helper, write a small inline one (do not
  pull three.js over the network). The app has to work offline.
- When the user wants their design *used*, emit `design.export` on the bus —
  the browser or workspace modules can pick it up.

## UX
- Each tool has a toolbar with its primitive actions (logo: shapes, text,
  colors; 3D: primitives, transform, camera; webpage: blocks, text, styles).
- Preview is immediate — no explicit "render" button.
- Designs persist across reloads via `localStorage` keyed by tool id.
