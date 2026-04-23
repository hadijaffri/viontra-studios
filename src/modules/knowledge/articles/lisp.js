// Lisp reference article for the offline knowledge base.

export const lispArticle = {
  id: "lisp",
  title: "Lisp",
  keywords: [
    "lisp", "mccarthy", "1958", "s-expression", "cons", "car", "cdr",
    "macro", "homoiconic", "common lisp", "scheme", "clojure", "emacs",
  ],
  summary:
    "Lisp (from 'LISt Processor') is a family of programming languages originally specified by John McCarthy in 1958. It's the second-oldest high-level language still in use, famous for parenthesized S-expression syntax, treating code as data, and pioneering features now standard (garbage collection, recursion, first-class functions, dynamic typing, REPL).",
  sections: [
    {
      id: "overview",
      title: "What is Lisp",
      keywords: ["lisp", "what", "language", "functional", "s-expression"],
      body: "Lisp is a family of languages (not one language) built around lists as the fundamental data structure and S-expressions as the syntax. Code and data share the same shape — a list — which makes Lisp uniquely good at programs that manipulate other programs. The big modern dialects are Common Lisp, Scheme, Clojure, and Emacs Lisp.",
    },
    {
      id: "history",
      title: "History of Lisp",
      keywords: ["history", "mccarthy", "1958", "mit", "ai"],
      body: "Lisp was specified by John McCarthy at MIT in 1958 and first implemented by Steve Russell (who hand-compiled `eval` by reading McCarthy's paper). It was the default language of 1960s–1980s AI research. Key milestones: Lisp 1.5 (1962), Maclisp, InterLisp, Scheme (1975, Sussman & Steele), Common Lisp (1984 standard), Clojure (2007).",
    },
    {
      id: "syntax",
      title: "S-expression syntax",
      keywords: ["syntax", "s-expression", "parenthesis", "prefix"],
      body: "Everything is either an atom (number, symbol, string) or a list of S-expressions in parentheses. Function calls are prefix: `(+ 1 2)` is 3, `(print \"hi\")` prints hi. There's no operator precedence — the parens tell you exactly what's nested. `;` starts a line comment.",
    },
    {
      id: "cons",
      title: "cons, car, cdr",
      keywords: ["cons", "car", "cdr", "pair", "linked list"],
      body: "A cons cell is a pair — two slots. `(cons 1 2)` makes `(1 . 2)`. Lists are chains of cons cells ending in nil: `(1 2 3)` is `(cons 1 (cons 2 (cons 3 nil)))`. `(car x)` returns the first slot, `(cdr x)` returns the rest. These three primitives underlie almost everything.",
    },
    {
      id: "homoiconicity",
      title: "Homoiconicity (code is data)",
      keywords: ["homoiconic", "code as data", "macro"],
      body: "In Lisp, a program is just a list of symbols — exactly the same data structure your program manipulates. So a program can easily generate, transform, or inspect other programs. `'(+ 1 2)` is the list `(+ 1 2)`; `(eval '(+ 1 2))` runs it and returns 3. This property is what makes macros powerful.",
    },
    {
      id: "macros",
      title: "Macros",
      keywords: ["macro", "defmacro", "compile time", "syntax extension"],
      body: "Lisp macros are functions that run at compile time and rewrite code. `(defmacro when (cond &rest body) `(if ,cond (progn ,@body)))`. Because macros manipulate the parsed code tree directly, they're far more powerful than C's textual macros — languages have been implemented as sets of Lisp macros.",
    },
    {
      id: "lambda",
      title: "Lambdas and closures",
      keywords: ["lambda", "function", "closure", "first class"],
      body: "Anonymous functions: `(lambda (x) (* x x))`. Bind one: `(setq square (lambda (x) (* x x)))`, call: `(funcall square 5)`. First-class functions and proper lexical closures were present in Lisp long before most other languages adopted them. `(let ((x 10)) (lambda () x))` captures x.",
    },
    {
      id: "eval-apply",
      title: "eval and apply",
      keywords: ["eval", "apply", "metacircular"],
      body: "`eval` takes a Lisp expression (as data) and evaluates it; `apply` takes a function and a list of arguments and calls it. McCarthy's original paper defined Lisp's semantics as a metacircular interpreter — a Lisp program that evaluates Lisp — in one page. That elegance is why Lisp keeps attracting people.",
    },
    {
      id: "common-lisp",
      title: "Common Lisp",
      keywords: ["common lisp", "cl", "clos", "sbcl", "ansi"],
      body: "Common Lisp is the big, industrial Lisp standardized by ANSI in 1994. Multi-paradigm, dynamically typed, with a powerful object system (CLOS — multiple dispatch, multiple inheritance, method combinations), condition system for error handling, and fast compiled implementations like SBCL. Huge spec, huge standard library.",
    },
    {
      id: "scheme",
      title: "Scheme",
      keywords: ["scheme", "minimal", "sicp", "rnrs"],
      body: "Scheme is a minimalist Lisp (Sussman and Steele, 1975). Tiny core, tail-call optimization required, lexical scope, first-class continuations via call/cc. Specified in short 'Revised n Reports' (R5RS, R6RS, R7RS). The language of SICP — 'Structure and Interpretation of Computer Programs' — and Racket is a major descendant.",
    },
    {
      id: "clojure",
      title: "Clojure",
      keywords: ["clojure", "jvm", "persistent", "rich hickey", "2007"],
      body: "Clojure (Rich Hickey, 2007) is a modern Lisp on the JVM (also JS via ClojureScript, .NET via ClojureCLR). Design emphasizes immutability: data structures are persistent (share structure when updated). Strong concurrency primitives (atoms, agents, refs with STM). Pragmatic Java interop: `(String. \"hi\")` calls Java.",
    },
    {
      id: "emacs-lisp",
      title: "Emacs Lisp",
      keywords: ["emacs lisp", "elisp", "editor", "config"],
      body: "Emacs is almost entirely written in Emacs Lisp — the editor is an Elisp interpreter with just enough C for bootstrap and primitives. You configure and extend Emacs by writing Elisp. It's dynamically scoped historically (now has `lexical-binding` too) and has every oddity a 40-year-old dialect develops.",
    },
    {
      id: "racket",
      title: "Racket",
      keywords: ["racket", "plt", "language oriented", "drracket"],
      body: "Racket (formerly PLT Scheme) is a descendant of Scheme focused on language-oriented programming — writing new DSLs and languages inside Racket. Comes with DrRacket, an IDE widely used in education. 'Typed Racket' adds a gradual type system. Used in 'How to Design Programs,' the pedagogical counterpart to SICP.",
    },
    {
      id: "repl",
      title: "The REPL",
      keywords: ["repl", "interactive", "prompt"],
      body: "Lisp popularized the Read-Eval-Print Loop: type an expression, it's read, evaluated, and printed. Common Lisp implementations take this further — you can redefine functions and classes while your program runs and have changes take effect immediately. The interactive, incremental workflow is a Lisp hallmark.",
    },
    {
      id: "ai-history",
      title: "Lisp and AI",
      keywords: ["ai", "artificial intelligence", "history", "symbolic"],
      body: "From the late 1950s through the 1980s, Lisp was *the* AI language — symbolic reasoning, expert systems, and theorem provers were written in it. The 'AI winter' plus the rise of C and later Python for statistical ML moved the field elsewhere, but tools like ACL2, Maxima, and large knowledge-based systems still run Lisp.",
    },
    {
      id: "influence",
      title: "Influence on other languages",
      keywords: ["influence", "python", "ruby", "javascript"],
      body: "Many features we take for granted came from Lisp first: garbage collection, first-class functions, closures, recursion as a primary control-flow mechanism, dynamic typing, REPL-driven development, condition/restart error handling. Every scripting language (Python, Ruby, JS) borrows heavily from the Lisp lineage.",
    },
    {
      id: "paren-culture",
      title: "Parens, paredit, and editing",
      keywords: ["parenthesis", "paredit", "editor", "indent"],
      body: "People fear the parens, but fluent Lispers don't count them — editor modes like Paredit / Parinfer / Smartparens keep structural edits balanced by construction. You think in S-expressions (like 'move this expression') rather than characters. Good indentation makes parens fade into the background.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent traps: confusing `'(a b c)` (quoted list) with `(a b c)` (function call); forgetting when macros expand vs when functions evaluate; accidentally capturing variables in unhygienic macros; assuming tail-call optimization in all dialects (Common Lisp doesn't guarantee it, Scheme does); dynamic vs lexical scope confusion (especially in old Elisp).",
    },
    {
      id: "where-lisp-shines",
      title: "Where Lisp shines",
      keywords: ["use", "strength", "dsl", "macro", "interactive"],
      body: "Lisp is excellent when the problem involves manipulating code, designing DSLs, or needing extreme interactivity and runtime flexibility. Symbolic computation (Maxima), theorem proving (ACL2), complex data pipelines (Clojure), configuring an editor (Emacs), and exploratory research are all places where Lisp's macro and REPL power pays off.",
    },
  ],
};
