// Knowledge article: JavaScript. Sourced from the Wikipedia article on
// JavaScript. Broken into focused sections so the KB can quote the right
// one in response to a question.

export const javascriptArticle = {
  id: "javascript",
  title: "JavaScript",
  keywords: ["javascript", "js", "ecmascript", "ecma", "node", "nodejs", "browser", "web", "scripting"],
  summary:
    "JavaScript (JS) is a programming language and core technology of the Web, alongside HTML and CSS. Created by Brendan Eich at Netscape in 1995. As of 2025, 98.9% of websites use it for client-side behavior.",

  sections: [
    {
      id: "overview",
      title: "What JavaScript is",
      keywords: ["what", "overview", "about", "summary", "definition"],
      body:
        "JavaScript is a high-level, often just-in-time-compiled programming language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, imperative, and object-oriented programming. Alongside HTML and CSS it is a core technology of the Web. It also runs outside browsers — most notably through Node.js.",
    },

    {
      id: "history-creation",
      title: "Creation at Netscape (1995)",
      keywords: ["history", "created", "creation", "netscape", "eich", "brendan", "1995", "livescript"],
      body:
        "JavaScript was created by Brendan Eich at Netscape in 1995. Netscape wanted a 'language for the masses' to make web pages dynamic. They negotiated with Sun to embed Java, while also hiring Eich to embed Scheme. Management decided Eich should devise a new language with Java-like syntax. It was first shipped as LiveScript in a Navigator beta in September 1995, then renamed JavaScript for the December 1995 release. The name was a marketing move tied to Java's popularity.",
    },

    {
      id: "history-microsoft",
      title: "Microsoft, JScript, and the browser wars",
      keywords: ["microsoft", "jscript", "internet explorer", "ie", "browser war"],
      body:
        "Microsoft debuted Internet Explorer in 1995 and released its own JavaScript implementation, JScript, in 1996. The implementations differed noticeably from Netscape's, so developers put 'best viewed in Netscape' or 'best viewed in Internet Explorer' logos on their sites. By the early 2000s IE had 95% market share and JScript became the de facto client-side scripting standard.",
    },

    {
      id: "history-ecmascript",
      title: "Standardization as ECMAScript",
      keywords: ["standard", "ecmascript", "ecma", "tc39", "specification", "spec"],
      body:
        "In November 1996 Netscape submitted JavaScript to Ecma International. The first ECMAScript specification was released in June 1997. ECMAScript 2 followed in 1998 and ECMAScript 3 in 1999. Work on ECMAScript 4 began in 2000 but was abandoned after Microsoft stopped collaborating. ECMAScript 5 shipped in December 2009, and ECMAScript 6 (also called ES2015) in 2015 added a large set of refinements. The spec is now maintained on GitHub with annual snapshots and is governed by Ecma Technical Committee 39 (TC39).",
    },

    {
      id: "history-node",
      title: "Node.js and JavaScript outside the browser",
      keywords: ["node", "nodejs", "ryan dahl", "v8", "runtime", "server"],
      body:
        "Ryan Dahl created Node.js in 2009. Node combines the V8 engine, an event loop, and I/O APIs to form a standalone JavaScript runtime, bringing JS to servers and command-line tools. Its package manager, npm, became the largest package registry in the world. Deno and Bun are other notable standalone runtimes.",
    },

    {
      id: "trademark",
      title: "The JavaScript trademark",
      keywords: ["trademark", "oracle", "sun", "name"],
      body:
        "'JavaScript' is a trademark of Oracle Corporation in the United States. It was originally issued to Sun Microsystems on 6 May 1997 and transferred to Oracle when Oracle acquired Sun in 2009. In September 2024, a letter led by Ryan Dahl and signed by Brendan Eich and over 14,000 others called on Oracle to release the trademark.",
    },

    {
      id: "client-side",
      title: "Client-side usage in browsers",
      keywords: ["client", "browser", "dom", "web page", "usage", "website"],
      body:
        "JavaScript is the dominant client-side scripting language of the Web — 99% of websites use it. Scripts are embedded in or linked from HTML and interact with the DOM (Document Object Model). Typical scripted behaviors include: loading new content without reloading the page (Ajax or WebSocket), animations, browser games, controlling streaming playback, pop-ups and alerts, form validation, behavior logging for analytics, redirects, and storing data on the user's device via localStorage or IndexedDB.",
    },

    {
      id: "libraries",
      title: "Libraries and frameworks",
      keywords: ["library", "libraries", "framework", "jquery", "react", "angular", "vue", "bootstrap", "vanilla"],
      body:
        "Over 80% of websites use a third-party JavaScript library or framework on the client. jQuery is the most-used, followed by Angular, Bootstrap, Lodash, Modernizr, React, Underscore, and Vue. Multiple libraries are often combined (e.g. jQuery with Bootstrap). The term 'Vanilla JS' refers to sites that use no library — only the standard language and browser APIs.",
    },

    {
      id: "non-browser",
      title: "Non-browser uses",
      keywords: ["server", "electron", "cordova", "react native", "desktop", "embedded", "acrobat", "gnome"],
      body:
        "JavaScript engines are embedded in many non-browser systems. Server-side use grew with Node.js; earlier attempts included Netscape Enterprise Server and Microsoft IIS. Electron, Cordova, and React Native use JavaScript to build desktop and mobile apps. Adobe Acrobat scripts PDF documents with it, GNOME Shell extensions are written in it, and it also appears in embedded systems — usually through Node.js.",
    },

    {
      id: "engine",
      title: "JavaScript engines",
      keywords: ["engine", "v8", "spidermonkey", "javascriptcore", "chakra", "jit", "compilation"],
      body:
        "A JavaScript engine parses and executes JS source. Early engines were pure interpreters; modern ones use just-in-time (JIT) compilation. Major engines today are V8 (Chrome, Node.js), JavaScriptCore (Safari), and SpiderMonkey (Firefox). Microsoft's Chakra is deprecated. Google's introduction of V8 in 2008 was a turning point — its JIT was so much faster that competitors had to rewrite their engines to catch up.",
    },

    {
      id: "runtime",
      title: "Runtime and event loop",
      keywords: ["runtime", "event loop", "single-threaded", "concurrency", "async", "call stack", "non-blocking"],
      body:
        "JavaScript is single-threaded. The runtime pulls messages from a queue one at a time and runs the function tied to each message to completion, using a call stack for local state. This is the 'event loop'. It is described as non-blocking because I/O is done through events and callbacks — so JS can handle a click while a database query is still in flight. Notable standalone runtimes: Node.js, Deno, Bun.",
    },

    {
      id: "imperative",
      title: "Imperative and structured syntax",
      keywords: ["imperative", "structured", "if", "while", "switch", "for", "statement", "c-like"],
      body:
        "JavaScript borrows much of its structured-programming syntax from C: if statements, while loops, switch statements, do-while loops. Originally JS only had function scoping with var; block scoping came in ECMAScript 2015 with let and const. Like C, JS distinguishes expressions from statements. One notable difference: automatic semicolon insertion lets you omit trailing semicolons in many places.",
    },

    {
      id: "weakly-typed",
      title: "Weak typing and coercion",
      keywords: ["weak", "weakly typed", "coercion", "cast", "type conversion", "nan"],
      body:
        "JavaScript is weakly typed — values get implicitly cast depending on the operator. The binary + casts both operands to a string unless both are numbers (because + also means concatenation). Binary - always casts to numbers. Arrays cast to comma-joined strings, other objects cast to '[object Object]'. This produces famous quirks: '123' + 1 is '1231', but '123' - 1 is 122; '123' - 'abc' is NaN. {} + [] appears to be 0, but only because {} is parsed as an empty code block — wrap it as ({} + []) and you get '[object Object]'.",
    },

    {
      id: "dynamic-typing",
      title: "Dynamic typing and eval",
      keywords: ["dynamic", "typing", "duck", "eval", "reassign"],
      body:
        "JavaScript is dynamically typed: types live on values, not variables, so a variable bound to a number can later hold a string. Several ways exist to check a type at runtime, including duck typing. JS also has an eval function that can execute code given as a string at runtime.",
    },

    {
      id: "prototypes",
      title: "Prototype-based object orientation",
      keywords: ["prototype", "object", "class", "inheritance", "new", "constructor", "oop"],
      body:
        "JavaScript uses prototypes instead of classes for inheritance. An object is an associative array of properties augmented with a prototype; properties can be added, rebound, or deleted at runtime. ES6 added the class/extends/super keywords as syntactic sugar over the prototype system. Example:\n\nclass Person {\n  constructor(name) { this.name = name; }\n}\nclass Student extends Person {\n  constructor(name, id) { super(name); this.id = id; }\n}\nconst bob = new Student('Robert', 12345);\n\nUnderneath, classes are still prototypes. Private fields are declared with a leading #.",
    },

    {
      id: "functions",
      title: "First-class functions and closures",
      keywords: ["function", "first-class", "closure", "lexical", "anonymous", "arrow", "callback"],
      body:
        "Functions in JavaScript are first-class values — they are objects with properties and methods like .call() and .bind(). A function defined inside another function forms a lexical closure: the outer scope's variables remain part of the inner function's state even after the outer call returns. JS also supports anonymous functions and, since ES2015, arrow functions: const add = (a, b) => a + b.",
    },

    {
      id: "promises-async",
      title: "Promises and async/await",
      keywords: ["promise", "async", "await", "asynchronous", "then", "callback"],
      body:
        "The built-in Promise object represents the eventual result of an async operation. Combinators: Promise.all, Promise.race, Promise.allSettled, Promise.any. async/await lets you write async code that reads like synchronous code:\n\nasync function load(url) {\n  const res = await fetch(url);\n  return await res.json();\n}",
    },

    {
      id: "syntax-variables",
      title: "Variables: var, let, const",
      keywords: ["var", "let", "const", "variable", "declare", "scope", "block"],
      body:
        "var is function-scoped (the original form; now generally discouraged). let is block-scoped and reassignable. const is block-scoped and cannot be reassigned (but if it holds an object, the object's contents can still mutate). Declaring a variable with no keyword creates a global — considered bad practice and forbidden in strict mode.\n\nvar x;            // undefined, function-scoped\nlet y = 2;        // block-scoped\nconst z = 'hi';   // block-scoped, not reassignable",
    },

    {
      id: "security-xss",
      title: "Security: cross-site scripting (XSS)",
      keywords: ["security", "xss", "cross-site scripting", "sandbox", "same-origin"],
      body:
        "Browsers contain JavaScript with two big restrictions: a sandbox that limits scripts to web actions, and the same-origin policy that stops scripts on one site from reading data from another. XSS is the classic violation: an attacker injects a script into a trusted page that then runs with the victim's credentials. HTML sanitization and Content Security Policy (CSP) are the main defenses. Reflected XSS has some browser-level protection; stored XSS has to be stopped on the server.",
    },

    {
      id: "security-csrf",
      title: "Security: cross-site request forgery (CSRF)",
      keywords: ["csrf", "cross-site request forgery", "cookie", "token"],
      body:
        "CSRF tricks a logged-in user's browser into sending an unintended request to another site — e.g. transferring money at their bank. The standard fix is to require an anti-forgery token in a hidden form field (not just the cookie) for any state-changing request. Checking the HTTP Referer header helps too. 'JavaScript hijacking' is a CSRF variant where an attacker's <script> tag loads private JSON or JS from the victim's site.",
    },

    {
      id: "dev-tools",
      title: "Development tools",
      keywords: ["tools", "debugger", "eslint", "jslint", "profiler", "devtools"],
      body:
        "Every major browser ships developer tools, including a JavaScript debugger and profiler. Static analyzers like ESLint and JSLint check code against style and correctness rules. Most editors syntax-highlight JS. Benchmarking libraries such as benchmark.js and jsbench are available as standalone tools.",
    },

    {
      id: "related-java",
      title: "JavaScript vs. Java",
      keywords: ["java", "difference", "compared", "versus", "vs"],
      body:
        "Despite the name, JavaScript and Java are distinct languages. Both share C-like syntax and are sandboxed, and Java influenced JS's standard library naming (Math, Date are modeled on Java 1.0). But: Java is statically typed, JS is dynamic. Java runs from compiled bytecode, JS from source. Java's objects are class-based, JS's are prototype-based. JS has supported functional programming since day one; Java only added it in Java 8.",
    },

    {
      id: "related-json",
      title: "JSON",
      keywords: ["json", "data", "format", "object notation"],
      body:
        "JSON — JavaScript Object Notation — is a data format derived from JavaScript's object literal syntax. It is now a language-agnostic format supported by almost every programming language.",
    },

    {
      id: "related-transpilers",
      title: "TypeScript, CoffeeScript, and transpilers",
      keywords: ["typescript", "coffeescript", "transpile", "transpiler", "compile"],
      body:
        "A transpiler converts source from another language into JavaScript so it can run in the browser. TypeScript (which adds static types) and CoffeeScript are two well-known languages that transpile to JS. Over 80% of sites use some form of transpiled or bundled JS.",
    },

    {
      id: "related-webassembly",
      title: "WebAssembly",
      keywords: ["webassembly", "wasm", "asm.js", "bytecode"],
      body:
        "WebAssembly is a bytecode format designed to complement JavaScript for performance-critical code. It runs in the same sandbox as regular JS. All major JS engines support it. asm.js, a subset of JavaScript that acted as a forerunner, preceded WebAssembly.",
    },

    {
      id: "modules",
      title: "ES modules (import / export)",
      keywords: ["module", "import", "export", "esm", "commonjs", "require"],
      body:
        "Modern JavaScript uses ES modules (ESM). A file exports bindings and another file imports them:\n\n// math.js\nexport function add(a, b) { return a + b; }\nexport const PI = 3.14159;\nexport default class Calc { /* ... */ }\n\n// app.js\nimport Calc, { add, PI } from './math.js';\n\nBrowsers load ESM when you use <script type=\"module\">. Node.js also supports ESM (.mjs or \"type\": \"module\" in package.json). The older CommonJS style uses require()/module.exports, still the norm in much Node.js code.",
    },

    {
      id: "array-methods",
      title: "Array methods — map, filter, reduce, find",
      keywords: ["array", "map", "filter", "reduce", "find", "forEach", "some", "every", "flat"],
      body:
        "Prefer built-in array methods over manual for loops:\n- arr.map(fn) — new array of transformed values.\n- arr.filter(fn) — new array of elements where fn returns truthy.\n- arr.reduce((acc, x) => ..., initial) — fold into a single value.\n- arr.find(fn) / arr.findIndex(fn) — first match.\n- arr.some(fn) / arr.every(fn) — boolean check.\n- arr.flat(depth) / arr.flatMap(fn) — flatten nested arrays.\n- arr.includes(x) — true if x is in the array.\nThese do not mutate the source array. sort, reverse, push, pop, shift, unshift, splice DO mutate — be deliberate.",
    },

    {
      id: "destructuring",
      title: "Destructuring, spread, and rest",
      keywords: ["destructuring", "destructure", "spread", "rest", "...", "pattern"],
      body:
        "Destructuring unpacks arrays and objects in one expression:\n\nconst [first, second] = [1, 2];\nconst { name, age } = user;\nconst { name: userName = 'anon' } = user; // rename + default\n\nThe spread operator (...) expands iterables into lists or object literals:\n\nconst both = [...a, ...b];\nconst merged = { ...defaults, ...options };\n\nIn a parameter list, rest (...) collects remaining args:\n\nfunction log(first, ...rest) { console.log(first, rest); }",
    },

    {
      id: "equality",
      title: "== vs. === (equality)",
      keywords: ["equality", "equal", "comparison", "triple equals", "double equals"],
      body:
        "Always prefer === and !== (strict equality). They compare value and type without coercion. == and != perform type coercion, which produces surprising results: 0 == ''  is true, [] == false is true, null == undefined is true. The one common use of == is `x == null` to check for null or undefined in a single comparison — otherwise stick to strict equality. Object.is(a, b) handles NaN and -0 correctly where === doesn't.",
    },

    {
      id: "null-undefined",
      title: "null vs. undefined",
      keywords: ["null", "undefined", "nullish", "missing"],
      body:
        "undefined is the default value of a declared-but-unassigned variable, a missing function argument, or a missing object property. null is an explicit 'no value' that you assign yourself. They are equal under == but not under ===. Modern operators make handling them easier:\n- Optional chaining: user?.address?.street — returns undefined if any link is nullish.\n- Nullish coalescing: x ?? 'default' — fallback only if x is null or undefined (unlike ||, which also falls back for 0 or '').",
    },

    {
      id: "fetch",
      title: "fetch — making HTTP requests",
      keywords: ["fetch", "http", "request", "ajax", "api", "network"],
      body:
        "fetch is the modern browser API for HTTP requests:\n\nconst res = await fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Ada' }),\n});\nif (!res.ok) throw new Error(`HTTP ${res.status}`);\nconst data = await res.json();\n\nfetch only rejects on network failure — a 404 or 500 still resolves. Check res.ok or res.status yourself. For cancellation, pass an AbortSignal.",
    },

    {
      id: "dom-basics",
      title: "Manipulating the DOM",
      keywords: ["dom", "document", "element", "queryselector", "textcontent", "innerhtml", "addeventlistener"],
      body:
        "The DOM exposes HTML as a tree of nodes. Common operations:\n- document.querySelector('.card') / querySelectorAll(...) — find elements.\n- el.textContent = 'hi' — set text (safe).\n- el.innerHTML = '<b>hi</b>' — set HTML (DANGEROUS with untrusted input — XSS risk).\n- el.classList.add/remove/toggle('active') — manage classes.\n- el.setAttribute / getAttribute / dataset.key — attributes.\n- el.addEventListener('click', handler) — events.\n- document.createElement / parent.appendChild / el.remove — build/remove nodes.\nPrefer textContent over innerHTML unless you fully control the input.",
    },

    {
      id: "this-keyword",
      title: "The `this` keyword",
      keywords: ["this", "binding", "context", "bind", "call", "apply"],
      body:
        "`this` refers to whatever is calling the function:\n- In a method call obj.fn(), `this` is obj.\n- In a bare function call fn(), `this` is undefined in strict mode, or the global object otherwise.\n- In a constructor new Fn(), `this` is the new instance.\n- In an arrow function, `this` is inherited from the enclosing scope — arrows have no own `this`.\nYou can force a specific `this` with fn.call(obj, args), fn.apply(obj, [args]), or fn.bind(obj). The most common bug: passing obj.method as a callback loses the `this` binding.",
    },

    {
      id: "common-pitfalls",
      title: "Common JavaScript pitfalls",
      keywords: ["mistake", "gotcha", "pitfall", "bug", "wrong"],
      body:
        "Things that quietly ruin your day:\n- Using == instead of ===. Always ===.\n- Forgetting `await` on a promise — you get the Promise object, not the value.\n- `this` inside a callback — arrows fix it.\n- Mutating state you thought was immutable — arrays and objects are passed by reference.\n- Reading an undefined property chain — use ?. .\n- for...in iterates keys including inherited ones; for...of iterates values of an iterable; Object.keys/values/entries are usually what you want for plain objects.\n- NaN !== NaN. Use Number.isNaN(x).\n- parseInt('08') — old engines treated it as octal. Always parseInt(s, 10).\n- Floating-point: 0.1 + 0.2 === 0.30000000000000004. Use a tolerance or a decimal library for money.",
    },

    {
      id: "best-practices",
      title: "Modern JS best practices",
      keywords: ["best practice", "style", "convention", "clean", "recommended"],
      body:
        "Sensible defaults for new code:\n- const by default, let when reassignment is needed, avoid var.\n- === and !==, not == / !=.\n- Small pure functions; prefer .map/.filter/.reduce over mutating loops.\n- Arrow functions for callbacks; named functions for methods.\n- async/await over raw .then chains (but understand Promises underneath).\n- ES modules (import/export), not global scripts.\n- Use a linter (ESLint) and a formatter (Prettier).\n- For types, adopt TypeScript or at least JSDoc annotations.\n- Don't extend built-in prototypes.\n- Treat user input as hostile — always sanitize before innerHTML or eval.",
    },
  ],
};
