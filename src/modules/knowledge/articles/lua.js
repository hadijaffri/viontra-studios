// Lua reference article for the offline knowledge base.

export const luaArticle = {
  id: "lua",
  title: "Lua",
  keywords: [
    "lua", "ierusalimschy", "tecgraf", "brazil", "embedded", "scripting",
    "table", "metatable", "coroutine", "luajit", "roblox", "wow",
  ],
  summary:
    "Lua is a lightweight, high-level, multi-paradigm scripting language created in 1993 at PUC-Rio in Brazil, designed primarily to be embedded in larger applications as an extension language.",
  sections: [
    {
      id: "overview",
      title: "What is Lua",
      keywords: ["lua", "what", "language", "embedded", "scripting"],
      body: "Lua is a small, fast, dynamically typed scripting language designed to be embedded. The entire reference implementation is about 24,000 lines of portable ANSI C and the compiled interpreter is around 250 KB — small enough to ship inside almost anything. 'Lua' means 'moon' in Portuguese.",
    },
    {
      id: "history",
      title: "History of Lua",
      keywords: ["history", "origin", "1993", "tecgraf", "brazil", "puc-rio"],
      body: "Lua was created in 1993 by Roberto Ierusalimschy, Luiz Henrique de Figueiredo, and Waldemar Celes at the Computer Graphics Technology Group (Tecgraf) at PUC-Rio in Brazil. It grew out of in-house data-description languages (SOL, DEL) used for engineering projects at Petrobras. Since Lua 5.0 it has been MIT-licensed.",
    },
    {
      id: "philosophy",
      title: "Design philosophy",
      keywords: ["philosophy", "simple", "minimal", "embeddable"],
      body: "Lua is a 'multi-paradigm' language in the sense that it provides a few general mechanisms (tables, first-class functions, metatables, coroutines) that can be combined to implement OOP, functional patterns, or data description. The base language stays tiny on purpose — features live in libraries or user code.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "local", "function", "end", "print"],
      body: "Hello world: `print(\"Hello, world!\")`. Blocks are delimited by keywords (`do`/`end`, `then`/`end`, `function`/`end`), not braces. `--` starts a single-line comment, `--[[ ... ]]` a block comment. `local` declares a lexically scoped variable; without it, assignment creates a global (a frequent source of bugs).",
    },
    {
      id: "types",
      title: "Types",
      keywords: ["type", "nil", "boolean", "number", "string", "table"],
      body: "Lua has eight basic types: nil, boolean, number (since 5.3 split into integer/float), string, function, userdata, thread (coroutine), and table. `nil` and `false` are the only falsy values — 0 and empty string are truthy. `type(x)` returns the type name.",
    },
    {
      id: "tables",
      title: "Tables (the only data structure)",
      keywords: ["table", "array", "hash", "associative"],
      body: "The table is Lua's one and only aggregate type — it's an associative array with both integer and arbitrary-key slots. Used for arrays, records (structs), namespaces, objects, and sets. `t = {1, 2, 3}` is an array-like table; `t = {name = \"Ada\", age = 36}` is a record. Integer indexing starts at 1, not 0.",
    },
    {
      id: "functions",
      title: "Functions and first-class values",
      keywords: ["function", "first class", "closure", "multiple return"],
      body: "Functions are first-class values: assign them to variables, pass as arguments, return from other functions. Lua supports closures with proper lexical scoping. Functions can return multiple values: `local q, r = divmod(10, 3)`. Trailing `()` rules: a function call followed by a table or string literal can drop the parens.",
    },
    {
      id: "control-flow",
      title: "Control flow",
      keywords: ["if", "then", "end", "for", "while", "repeat"],
      body: "`if cond then ... elseif cond2 then ... else ... end`. Loops: `while cond do ... end`, `repeat ... until cond` (runs at least once), `for i = 1, 10 do ... end` (numeric), `for k, v in pairs(t) do ... end` (generic, iterator-based). No switch statement — use table dispatch or if/elseif chains.",
    },
    {
      id: "metatables",
      title: "Metatables and metamethods",
      keywords: ["metatable", "metamethod", "__index", "setmetatable"],
      body: "Every table can have a metatable that defines its behavior for operators and lookups. Set with `setmetatable(t, mt)`. Common metamethods: `__index` (fallback lookup — basis for inheritance), `__newindex` (write interception), `__add`, `__eq`, `__tostring`, `__call` (make a table callable). Metatables power Lua's lightweight OOP.",
    },
    {
      id: "oop",
      title: "Object-oriented programming",
      keywords: ["oop", "class", "self", "inheritance"],
      body: "Lua has no built-in classes. The idiom: define a table as the 'class,' set it as the `__index` metatable of instances, define methods on it. Colon syntax implicitly passes self: `function Vector:magnitude() return ... end` is sugar for `function Vector.magnitude(self) ... end`. Call as `v:magnitude()`.",
    },
    {
      id: "coroutines",
      title: "Coroutines",
      keywords: ["coroutine", "cooperative", "yield", "resume"],
      body: "Coroutines are stackful cooperative threads. `co = coroutine.create(fn)`; `coroutine.resume(co, ...)` runs it until it calls `coroutine.yield(...)`, which returns control to the resumer. Useful for iterators, generators, and implementing async patterns without callbacks. Not preemptive — the running coroutine chooses when to yield.",
    },
    {
      id: "strings",
      title: "Strings",
      keywords: ["string", "concat", "pattern", "format"],
      body: "Strings are immutable. Concatenate with `..` (not `+`): `\"hi \" .. name`. `#s` gives byte length. The `string` library has `string.format`, `string.sub`, `string.find`, `string.gsub` with Lua's pattern syntax (simpler than full regex: `%d`, `%s`, `%w`, `*`, `+`, `-`, `?`, `[]`, anchors `^` and `$`).",
    },
    {
      id: "c-api",
      title: "The C API (embedding)",
      keywords: ["c api", "embed", "lua_state", "stack"],
      body: "Lua's killer feature is its C embedding API. A Lua state is a virtual stack — C code pushes/pops values to call Lua functions or expose C functions to Lua. `luaL_newstate()`, `lua_pushinteger`, `lua_call`, `lua_register` are typical calls. This stack-based design makes integration safer than APIs that expose raw pointers.",
    },
    {
      id: "modules",
      title: "Modules and require",
      keywords: ["require", "module", "package", "luarocks"],
      body: "`require(\"foo\")` loads and caches a module, returning whatever it returned via `return`. Module lookup searches package.path (Lua files) and package.cpath (C libraries). LuaRocks is the de facto package manager — think CPAN for Lua — installing into a standard directory structure.",
    },
    {
      id: "implementations",
      title: "Implementations and dialects",
      keywords: ["luajit", "implementation", "interpreter", "jit"],
      body: "The reference interpreter (PUC-Rio Lua) is a register-based VM. LuaJIT is an incredibly fast just-in-time compiler tracking Lua 5.1 semantics — often within 2x of C. Notable dialects: Luau (Roblox, gradual typing), Ravi (typed + JIT), Pluto (superset of 5.4), Teal (statically typed). MoonScript and Fennel compile to Lua.",
    },
    {
      id: "games",
      title: "Lua in games",
      keywords: ["game", "roblox", "wow", "love", "scripting"],
      body: "Lua is the most popular scripting language for games. Used in Roblox (as Luau), World of Warcraft, Garry's Mod, Dota 2, Crysis, Factorio, and many more. Game engines embed Lua because it's small, fast, easy to sandbox, and designed exactly for 'host app exposes an API, user writes scripts.'",
    },
    {
      id: "other-uses",
      title: "Lua outside games",
      keywords: ["redis", "nginx", "wireshark", "mediawiki", "neovim"],
      body: "Lua is used as an extension language in Redis (server-side scripts), Nginx (via OpenResty), Wireshark dissectors, MediaWiki (Scribunto templates), LuaTeX, Neovim (config and plugins), Adobe Lightroom, Moho, and system tools in FreeBSD/NetBSD. It's a common answer when an app needs a scripting surface.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha", "global"],
      body: "Frequent traps: forgetting `local` and accidentally creating globals (lint tools like luacheck catch this); 1-based indexing when you're used to 0-based; `#t` returning undefined for tables with holes; implicit conversion between strings and numbers; `nil` holes terminating sequences unexpectedly; pass-by-reference semantics for tables.",
    },
    {
      id: "where-lua-shines",
      title: "Where Lua shines",
      keywords: ["use", "when", "strength", "embedded"],
      body: "Lua excels whenever you need a tiny, fast scripting surface inside a larger application — games, editors, network services, embedded systems, config DSLs. If you're building a native app and want users to write plugins, Lua + its C API is one of the easiest integrations available, bar none.",
    },
  ],
};
