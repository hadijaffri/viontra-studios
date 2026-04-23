// Luau reference article for the offline knowledge base.

export const luauArticle = {
  id: "luau",
  title: "Luau",
  keywords: [
    "luau", "roblox", "lua 5.1", "gradual typing", "type checker",
    "sandbox", "performance", "alan wake", "warframe",
  ],
  summary:
    "Luau is an open-source scripting language derived from Lua 5.1, developed by Roblox Corporation. It adds gradual typing, performance improvements, and sandboxing while staying backward compatible with Lua 5.1.",
  sections: [
    {
      id: "overview",
      title: "What is Luau",
      keywords: ["luau", "what", "language", "roblox", "lua"],
      body: "Luau is a statically-typed-optional dialect of Lua 5.1, built by Roblox to scale scripting to millions of developers and very large game codebases. It keeps Lua's syntax and semantics (Lua 5.1 code runs unchanged) while adding a gradual type system, a faster VM, and sandboxing features suitable for running untrusted scripts.",
    },
    {
      id: "history",
      title: "History of Luau",
      keywords: ["history", "origin", "roblox", "2019", "open source"],
      body: "Roblox began the 'Faster Lua VM' project to replace their customized Lua 5.1 runtime. It shipped on the Roblox platform on August 27, 2019 and was renamed Luau. In November 2021 Roblox open-sourced Luau under the MIT License on GitHub, which has since been adopted outside Roblox by Remedy (Alan Wake 2), Digital Extremes (Warframe), Giants Software (Farming Simulator 25), and Linden Lab (Second Life's SLua).",
    },
    {
      id: "vs-lua",
      title: "Differences from Lua 5.1",
      keywords: ["difference", "lua", "vs", "compared"],
      body: "Compared to stock Lua 5.1, Luau adds: a gradual type system with inference; compound assignment (`+=`, `-=`, ...); string interpolation with backticks (`` `hello {name}` ``); continue statement; generalized iteration (`for k, v in t do`); if-expressions (`local x = if cond then a else b`); type aliases; and extensive performance work. It stays syntactically a superset of Lua 5.1 source you'd normally write.",
    },
    {
      id: "types",
      title: "The type system",
      keywords: ["type", "gradual", "static", "inference"],
      body: "Luau has gradual typing: types are optional and inferred when possible. Annotate with colon syntax: `local count: number = 0`, `function add(a: number, b: number): number return a + b end`. The checker uses structural typing — any table with the right fields satisfies a structural type. Files can opt into `--!strict` or `--!nonstrict` mode.",
    },
    {
      id: "type-annotations",
      title: "Type annotations",
      keywords: ["annotation", "type alias", "nilable", "union"],
      body: "Basic syntax: `x: number`, `name: string`, `active: boolean`. Nilable with `?`: `maybe: string?`. Union types: `value: number | string`. Tables: `user: { name: string, age: number }`. Type aliases: `type Point = { x: number, y: number }`. Generics: `function first<T>(xs: {T}): T? return xs[1] end`.",
    },
    {
      id: "modes",
      title: "Strict vs non-strict mode",
      keywords: ["strict", "nonstrict", "mode", "comment"],
      body: "A `--!strict` comment at the top of a file turns on full type checking; `--!nonstrict` (the default in many setups) is lenient, treating missing types as `any`. Strict mode is recommended for new modules — it catches the most bugs. Non-strict is useful when migrating existing Lua codebases incrementally.",
    },
    {
      id: "performance",
      title: "Performance",
      keywords: ["performance", "fast", "jit", "native"],
      body: "Luau's interpreter is heavily optimized — inline caching, register-based VM, fast table access. In October 2023, Luau added native code generation for x64 and ARM64, producing machine code for hot functions and delivering 1.5–2.5x speedups on compute-heavy code. The interpreter performs on par with LuaJIT's interpreter mode, though LuaJIT's tracing JIT can still be faster on some workloads.",
    },
    {
      id: "sandboxing",
      title: "Sandboxing",
      keywords: ["sandbox", "security", "untrusted"],
      body: "Luau is designed to run untrusted user code. The standard library omits filesystem and OS access by default. The runtime enforces memory and CPU limits so a runaway loop or giant table allocation can't take down the host. This is why it fits embedding scenarios — games, plugin hosts, automation engines — where arbitrary scripts run from outside the developer's control.",
    },
    {
      id: "string-interpolation",
      title: "String interpolation",
      keywords: ["string", "interpolation", "backtick", "template"],
      body: "Luau added template strings using backticks: `` local greeting = `Hello, {name}!` ``. Expressions inside `{...}` are stringified and inlined. Cleaner than `string.format(\"Hello, %s!\", name)` or `\"Hello, \" .. name .. \"!\"` — the classic Lua options.",
    },
    {
      id: "compound-assignment",
      title: "Compound assignment",
      keywords: ["compound", "assignment", "+=", "-="],
      body: "Luau supports `+=`, `-=`, `*=`, `/=`, `//=` (floor div), `%=`, `^=`, `..=` (string concat): `count += 1` is equivalent to `count = count + 1`. A small ergonomic win over standard Lua which requires the full form.",
    },
    {
      id: "continue",
      title: "continue statement",
      keywords: ["continue", "loop", "skip"],
      body: "Luau adds `continue`, which skips to the next iteration of the enclosing loop — a feature Lua deliberately omits. `for _, item in items do if not item.active then continue end; process(item) end`. Small quality-of-life improvement when porting code from other languages.",
    },
    {
      id: "if-expression",
      title: "if-else expression",
      keywords: ["if expression", "ternary", "inline"],
      body: "Luau makes `if` an expression: `local label = if score > 50 then \"pass\" else \"fail\"`. Cleaner than Lua's `cond and a or b` idiom (which breaks if `a` is falsy). Supports `elseif` chains too.",
    },
    {
      id: "generalized-iteration",
      title: "Generalized iteration",
      keywords: ["iteration", "for in", "generalized"],
      body: "Luau allows `for k, v in t do ... end` (no `pairs`/`ipairs` call) over tables, extending the iteration protocol so types can define their own iteration via an `__iter` metamethod. Often a cleaner, type-checkable way to iterate.",
    },
    {
      id: "typechecker",
      title: "Linter and type checker",
      keywords: ["linter", "type checker", "lsp", "diagnostics"],
      body: "The Luau distribution includes `luau-analyze` for offline type checking and a language server for editor integration. The linter flags common mistakes (unused locals, unreachable code, deprecated APIs). Strict mode errors become compile-time signals instead of runtime surprises.",
    },
    {
      id: "roblox",
      title: "Luau in Roblox",
      keywords: ["roblox", "scripting", "game", "engine"],
      body: "Luau is the scripting language for all Roblox experiences, running inside Roblox Studio's engine. It drives gameplay, UI, physics events, and server logic. Roblox ships a Luau language server in Studio so type errors surface while writing scripts. Millions of creators have shipped experiences in Luau.",
    },
    {
      id: "outside-roblox",
      title: "Luau outside Roblox",
      keywords: ["remedy", "warframe", "giants", "second life", "adoption"],
      body: "Since open-sourcing, Luau has been adopted by: Remedy Entertainment (Alan Wake 2's Northlight engine, replacing a proprietary language — removed ~80k lines of legacy code); Digital Extremes (Warframe, migrated from stock Lua); Giants Software (Farming Simulator 25, migrated from LuaJIT); and Linden Lab (SLua, a Luau-based alternative to LSL for Second Life, 2025).",
    },
    {
      id: "compared-luajit",
      title: "Compared to LuaJIT",
      keywords: ["luajit", "comparison", "jit", "portable"],
      body: "LuaJIT has a more mature tracing JIT and can be faster on tight numeric loops. Luau is more portable (works on consoles, mobile, web), has a real gradual type system, better sandboxing, and a more actively maintained codebase. If you need types + sandboxing + broad platform support, Luau; if you need the fastest possible interpreted loops on supported platforms, LuaJIT.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent traps: assuming Luau ships the full Lua 5.4 feature set (it's Lua 5.1-based); expecting the type system to catch everything at runtime (types are erased at compile); confusing strict vs non-strict diagnostics; Luau globals and sandboxed environments not always matching stock Lua's; Roblox-specific globals only exist inside the Roblox engine.",
    },
    {
      id: "where-luau-shines",
      title: "Where Luau shines",
      keywords: ["use", "when", "strength", "game", "embedded"],
      body: "Luau is ideal for embedding scripting into games, editors, and engines that need to run user-written code safely, at scale. The combo of familiar Lua syntax, gradual types for tooling support, fast execution, and strong sandboxing is hard to match. If you already know Lua, Luau is nearly free to learn; if you're picking an embeddable language from scratch, it deserves a look.",
    },
  ],
};
