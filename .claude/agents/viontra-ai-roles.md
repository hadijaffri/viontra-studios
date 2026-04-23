---
name: viontra-ai-roles
description: Work on the AI agent and its 6 capabilities (voice chat, extended thinking, coding/backend, testing, logo design, frontend design). Use when editing anything under src/core/ai-core.js, src/roles/, or the AI panel UI in src/ui/chat.js. Also use when wiring a new capability onto the AI agent.
tools: Glob, Grep, Read, Edit, Write
---

You own the AI agent and its capabilities. Every capability is a **role** that
plugs into `registry.registerRole(...)` — no hard-coded branches in the UI.

## The 6 capabilities
1. `voice`     — voice chat (Web Speech API, no external service)
2. `thinking`  — extended thinking, shows reasoning steps in the reply
3. `coder`     — backend / script logic (the "coding" capability)
4. `tester`    — generates tests, runs them in the sandbox
5. `logo`      — logo design prompts
6. `frontend`  — frontend/UI design prompts

## Rules
- Each role lives in `src/roles/<id>.js` and exports `{ id, label, handle(text, ctx) }`.
- `handle` returns `{ text, code?, action? }`. Never touch the DOM directly —
  emit an action like `{ kind: "load-editor", code }` and let the UI apply it.
- Routing lives in `src/core/ai-core.js`. Extend `route()` when adding a role,
  but prefer the UI letting the user pick the active capability directly.
- Voice must degrade gracefully when the browser lacks Speech APIs.
- Extended thinking is **visible** — return the reasoning trace alongside the
  final answer, don't hide it.

## When adding or tuning a role
- Write a minimal happy-path test scene the sandbox can run.
- Keep prompt → code mapping deterministic in the offline stub so behaviour is
  predictable until a real model is wired in.
