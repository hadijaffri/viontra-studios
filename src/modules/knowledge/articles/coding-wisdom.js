// Practical coding wisdom — patterns, idioms, and design heuristics from
// general software engineering experience. Used by the AI Pro role as RAG
// context so even a small local model has solid practical guidance to draw
// from. This is the "trained by Claude" pre-seed: lessons that don't appear
// in language-reference Wikipedia articles.

export const codingWisdomArticle = {
  id: "coding-wisdom",
  title: "Practical coding wisdom",
  keywords: [
    "best practice", "pattern", "idiom", "design", "clean code",
    "refactor", "architecture", "naming", "debugging", "testing",
    "performance", "security", "code review",
  ],
  summary:
    "A distilled set of practical patterns, idioms, and design heuristics that experienced engineers internalise. Covers structure, naming, errors, debugging, performance, security, and the everyday decisions that separate solid code from fragile code.",
  sections: [
    {
      id: "naming",
      title: "Naming things",
      keywords: ["name", "naming", "variable", "function", "identifier"],
      body: "Names should describe what something IS or DOES, not how it's implemented. Prefer `users` to `arr`, `loadConfig()` to `process()`. Booleans read like questions: `isReady`, `hasErrors`, `canEdit`. Reserve short names for short scopes (loop counter `i`); the wider the scope, the more descriptive the name should be. If a name needs a comment to explain it, the name is wrong.",
    },
    {
      id: "small-functions",
      title: "Small, single-purpose functions",
      keywords: ["function", "small", "single responsibility", "decompose"],
      body: "A function should do one thing. If you can't summarise it in one sentence without 'and', split it. Functions over ~30 lines or with more than 3 levels of nesting are a code smell. Extract chunks into well-named helpers — even if you only call the helper once. The names become a free running commentary on what the code does.",
    },
    {
      id: "early-return",
      title: "Early-return and guard clauses",
      keywords: ["early return", "guard", "nesting", "if", "else"],
      body: "Handle invalid or edge cases at the top of a function and return early. This keeps the 'happy path' un-indented and obvious. Avoid `else` branches when the `if` branch returns: `if (!user) return null; doStuff(user);` is clearer than wrapping the whole body in an `if (user) { ... }`.",
    },
    {
      id: "errors",
      title: "Error handling",
      keywords: ["error", "exception", "try", "catch", "throw"],
      body: "Throw errors at the boundary where you detect them; catch them where you can do something meaningful. Don't catch and swallow — you're hiding bugs. Catch and: (a) log + rethrow, (b) recover with a sensible default, or (c) translate to a domain error. Never `catch (e) { console.log(e); }` and continue as if nothing happened.",
    },
    {
      id: "no-magic-numbers",
      title: "No magic numbers or strings",
      keywords: ["magic number", "constant", "literal"],
      body: "Numbers and strings buried in code without names are a maintenance trap. Extract `const MAX_RETRIES = 3;` once at the top instead of sprinkling `3` through the file. Same for status strings — `\"pending\"` everywhere becomes `STATUS.pending`. The exception: 0, 1, -1, and obviously self-explanatory values.",
    },
    {
      id: "comments",
      title: "Comments — when and when not",
      keywords: ["comment", "documentation", "why", "what"],
      body: "Code says WHAT; comments say WHY. Don't comment what the code obviously does (`// increment counter` above `i++` is noise). DO comment surprising decisions, workarounds, hidden constraints, gotchas. If you're tempted to write a comment, first try renaming or restructuring so the code itself is clear; only add the comment if the code can't carry the meaning.",
    },
    {
      id: "no-premature-abstraction",
      title: "Don't abstract too early",
      keywords: ["abstraction", "dry", "premature", "wet"],
      body: "Three similar lines of code is fine. Three near-identical functions across a codebase are a hint, not a mandate. Premature abstraction (one function with seven boolean parameters to handle every case) is worse than duplication. Wait until you have 3+ real instances and the pattern is stable, then extract. 'Wrong abstraction' is more painful to fix than 'some duplication'.",
    },
    {
      id: "immutability",
      title: "Prefer immutable data",
      keywords: ["immutable", "mutation", "const", "spread"],
      body: "Mutating shared state is the source of most concurrency bugs and surprising side effects. Default to creating new values: `const next = { ...prev, name: 'Ada' }` rather than `prev.name = 'Ada'`. Use `const` for variables that don't reassign. Frozen / read-only data is easier to reason about, especially across module boundaries.",
    },
    {
      id: "async-await",
      title: "async/await > callbacks > raw promises",
      keywords: ["async", "await", "promise", "callback", "concurrency"],
      body: "Use `async/await` for sequential async logic — it reads like synchronous code. Use `Promise.all([...])` to parallelise independent awaits. Never forget to `await` (or return) a promise — silent unhandled rejections are vicious bugs. Wrap fetches in try/catch at the boundary that knows how to recover, not at every call site.",
    },
    {
      id: "data-structure-choice",
      title: "Pick the right data structure",
      keywords: ["data structure", "map", "set", "array", "object"],
      body: "Lookup by key? Use Map (or plain object). Membership check? Use Set, not `array.includes()` (O(1) vs O(n)). Ordered list? Array. Need both ordered and keyed? Map preserves insertion order. Don't use objects as maps when keys are dynamic — Map is purpose-built and avoids prototype-pollution issues.",
    },
    {
      id: "validate-at-boundary",
      title: "Validate at boundaries, trust internally",
      keywords: ["validation", "boundary", "trust", "input"],
      body: "Validate user input, network responses, and DB reads at the boundary they enter your system. Once data is past the boundary and typed/parsed, internal code should trust it. Re-validating at every internal call adds noise without value. The boundary is where the real world meets your assumptions.",
    },
    {
      id: "single-source-of-truth",
      title: "Single source of truth",
      keywords: ["single source of truth", "duplication", "state", "sync"],
      body: "Each piece of state should have ONE place that owns it. Derived values should be computed from that source, not stored separately. Two copies of the same data inevitably drift. If you find yourself writing 'don't forget to also update X when Y changes', that's a sign X should be derived from Y.",
    },
    {
      id: "console-debugging",
      title: "Debugging — start with print, then breakpoints",
      keywords: ["debug", "console", "breakpoint", "trace"],
      body: "Print/log statements are still the fastest first-line debugger — type 1 thing, see 1 thing, gone in seconds. When the bug requires walking a complex state, switch to a real debugger (Chrome DevTools, VS Code). Bisect: when something breaks, find the most-recent commit that worked (`git bisect`) instead of guessing.",
    },
    {
      id: "rubber-duck",
      title: "Rubber-duck debugging",
      keywords: ["rubber duck", "debug", "explain", "stuck"],
      body: "When stuck, explain the problem out loud (or in writing) in detail to an inanimate object — or to a colleague. The act of articulating forces you to confront assumptions you skipped over silently. About 60% of hard bugs surface mid-explanation, before the listener even responds.",
    },
    {
      id: "perf-measure-first",
      title: "Measure before optimising",
      keywords: ["performance", "optimize", "profile", "measure"],
      body: "Don't optimise based on hunches. Profile (DevTools Performance tab, Node `--prof`, Lighthouse), find the actual bottleneck, then fix it. The slow part is usually NOT what you guessed — common culprits: layout thrash from DOM access in a loop, large unbatched state updates, N+1 queries, sync I/O on a hot path. Optimising the wrong thing wastes time AND adds complexity.",
    },
    {
      id: "render-vs-compute",
      title: "Frontend perf — render is the bottleneck",
      keywords: ["render", "frontend", "performance", "dom"],
      body: "JS execution is rarely the slow part of a web app — DOM updates, layout, paint, and re-flows are. Batch DOM writes; read all measurements before any writes. Use `requestAnimationFrame` for visual changes. Virtualise long lists. CSS transforms/opacity animate cheaply (GPU-composited); animating width/height/top is expensive.",
    },
    {
      id: "cleanup",
      title: "Always clean up resources",
      keywords: ["cleanup", "leak", "remove", "listener"],
      body: "Every `addEventListener` needs a corresponding `removeEventListener` when the component unmounts. Every `setInterval` needs `clearInterval`. Every subscription, observer, AbortController, file handle, DB connection — pair the open with the close. Memory leaks in long-running apps almost always trace back to a missed cleanup.",
    },
    {
      id: "security-basics",
      title: "Security — the unforgettable few",
      keywords: ["security", "xss", "sql injection", "csrf", "secret"],
      body: "Never inject user input into HTML without escaping (XSS). Never build SQL with string concatenation — use parameterised queries (SQL injection). Never store secrets in client code or git. Use HTTPS everywhere. Hash passwords with bcrypt/argon2, not SHA. Validate auth on EVERY request server-side; cookies/JWTs can be tampered with. Treat all user input as hostile.",
    },
    {
      id: "git-hygiene",
      title: "Git hygiene",
      keywords: ["git", "commit", "branch", "history"],
      body: "Make commits small and focused — one logical change per commit. Write commit messages that explain WHY, not just WHAT (the diff already shows what). Use feature branches for any non-trivial work. Pull/rebase before pushing to avoid messy merges. Never force-push shared branches. `git stash` is your friend when you need to switch contexts mid-work.",
    },
    {
      id: "readme-first",
      title: "README-driven development",
      keywords: ["readme", "documentation", "design"],
      body: "Before building a non-trivial feature, write the README section that describes how it'll be used. If you can't describe the use case clearly, you don't understand it well enough to build it. The README forces you to think from the user's perspective and often surfaces design flaws before any code is written.",
    },
    {
      id: "tests-as-design",
      title: "Tests as design pressure",
      keywords: ["test", "tdd", "design", "unit"],
      body: "Code that's hard to test is usually hard to USE. Tight coupling, hidden dependencies, and giant functions all show up first as 'I can't test this'. Write tests at the unit level for pure functions and tricky logic; at the integration level for HTTP handlers and DB code; end-to-end for critical user flows. Aim for fast tests — slow tests don't get run.",
    },
    {
      id: "naming-files",
      title: "Project structure",
      keywords: ["structure", "directory", "layout", "organize"],
      body: "Group code by FEATURE, not by type. `users/handler.ts users/db.ts users/test.ts` beats `handlers/users.ts dbs/users.ts tests/users.ts` — when you change the users feature, all the relevant code is in one place. Same goes for components, modules, services. Convention beats ceremony — pick a structure and apply it everywhere in the codebase.",
    },
    {
      id: "react-patterns",
      title: "React/component patterns",
      keywords: ["react", "component", "hook", "state"],
      body: "Lift state up only when truly shared; otherwise local state. Derive don't store: if you can compute it from props, don't put it in state. Wrap expensive computations in `useMemo`, callbacks in `useCallback`, only when profiling shows a problem. Effects are escape hatches — most things shouldn't need them. Keep components small; extract presentational bits into stateless sub-components.",
    },
    {
      id: "css-layout",
      title: "Modern CSS layout",
      keywords: ["css", "layout", "flex", "grid", "responsive"],
      body: "Use Flexbox for 1D layouts (rows or columns), Grid for 2D layouts (rows AND columns). `gap` replaces margin hacks. Use `clamp(min, preferred, max)` for fluid sizing. Set `box-sizing: border-box` globally. Mobile-first media queries (`min-width`, not `max-width`) compose better. Use logical properties (`margin-inline`) for international layouts.",
    },
    {
      id: "api-design",
      title: "API design",
      keywords: ["api", "rest", "endpoint", "resource"],
      body: "REST: nouns for resources (`/users/123`), verbs via HTTP method (GET/POST/PUT/DELETE). Use HTTP status codes correctly (200 OK, 400 client error, 401 unauth, 404 not found, 500 server error). Return JSON envelopes that are easy to extend (`{data: [...], meta: {...}}`). Version APIs (`/v1/...`). Document with OpenAPI. For complex querying, GraphQL or a search-style endpoint beats inventing custom URL DSLs.",
    },
    {
      id: "code-review",
      title: "Code review checklist",
      keywords: ["code review", "review", "pr", "checklist"],
      body: "When reviewing: read the description first to know the intent. Look for correctness, then design, then style. Ask questions instead of demanding changes. Praise good patterns. Catch: missing tests, error paths, security issues, naming clarity, magic numbers, sneaky scope creep. Ship the small good thing instead of blocking on the perfect thing.",
    },
    {
      id: "shipping",
      title: "Shipping — done is better than perfect",
      keywords: ["ship", "deploy", "perfect", "iterate"],
      body: "A working v0.1 in users' hands beats a 'perfect' v1.0 that ships in six months. You'll learn more from one real user than ten internal review meetings. Ship the smallest useful thing; iterate based on actual feedback. Feature flags let you ship incomplete code safely. Rollback strategy matters more than launch strategy — you'll need it eventually.",
    },
  ],
};
