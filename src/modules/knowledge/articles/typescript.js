// TypeScript reference article for the offline knowledge base.

export const typescriptArticle = {
  id: "typescript",
  title: "TypeScript",
  keywords: [
    "typescript", "ts", "type", "microsoft", "hejlsberg", "javascript",
    "superset", "tsc", "compiler", "static typing", "generics",
  ],
  summary:
    "TypeScript is a statically typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript, adding type annotations, interfaces, generics, and modern language features.",
  sections: [
    {
      id: "overview",
      title: "What is TypeScript",
      keywords: ["typescript", "what", "superset", "javascript", "type"],
      body: "TypeScript is a strict syntactical superset of JavaScript that adds optional static typing. Any valid JS is valid TS. The TypeScript compiler (tsc) checks types at compile time and emits plain JavaScript that runs anywhere JS runs — browsers, Node.js, Deno, Bun.",
    },
    {
      id: "history",
      title: "History of TypeScript",
      keywords: ["history", "origin", "hejlsberg", "microsoft", "2012"],
      body: "TypeScript was designed by Anders Hejlsberg (also the creator of Turbo Pascal, Delphi, and C#) at Microsoft and first released in October 2012. It was created to scale JavaScript for large codebases. Adoption exploded after Angular 2 adopted it in 2015; by the 2020s most large JS projects ship TypeScript.",
    },
    {
      id: "why-use",
      title: "Why use TypeScript",
      keywords: ["why", "benefit", "reason", "static typing", "safety"],
      body: "TypeScript catches whole classes of bugs — typos, wrong arguments, null dereferences — at compile time. It also powers tool support: autocomplete, refactoring, jump-to-definition, and inline docs all rely on type info. For any codebase over ~10k lines, the upfront cost pays for itself in fewer runtime errors and safer refactors.",
    },
    {
      id: "basic-types",
      title: "Basic types",
      keywords: ["type", "string", "number", "boolean", "array", "tuple"],
      body: "Primitive types: string, number, boolean, bigint, symbol, null, undefined. Collection types: arrays (`number[]` or `Array<number>`), tuples (`[string, number]`), and objects (`{ name: string; age: number }`). Special types: `any` (escape hatch), `unknown` (safe any), `never` (unreachable), `void` (no return value).",
    },
    {
      id: "annotations",
      title: "Type annotations",
      keywords: ["annotation", "colon", "declare", "type"],
      body: "Add types with `: Type` after names: `let name: string = 'Ada';`, `function add(a: number, b: number): number { return a + b; }`. Most of the time you can skip annotations — TypeScript infers types from initializers and return values. Annotate public APIs and leave internals to inference.",
    },
    {
      id: "interfaces",
      title: "Interfaces and type aliases",
      keywords: ["interface", "type alias", "object shape"],
      body: "Both describe object shapes. `interface User { id: number; name: string; }` and `type User = { id: number; name: string; }` are mostly interchangeable. Interfaces can be re-opened (declaration merging) and extended with `extends`; type aliases can use unions, intersections, and mapped types. Prefer interfaces for public API shapes, types for unions and utilities.",
    },
    {
      id: "unions-intersections",
      title: "Union and intersection types",
      keywords: ["union", "intersection", "or", "and", "type"],
      body: "Union types describe 'one of': `string | number`. Intersection types combine: `A & B` has all members of both. Narrowing via `typeof`, `instanceof`, `in`, or custom guards tells the compiler which branch of a union you're in, so member access becomes type-safe after the check.",
    },
    {
      id: "generics",
      title: "Generics",
      keywords: ["generic", "template", "parameter", "reusable"],
      body: "Generics let types take parameters: `function wrap<T>(x: T): T[] { return [x]; }`. Constrain with `extends`: `<T extends { id: number }>`. Generics power the standard library — `Array<T>`, `Map<K, V>`, `Promise<T>` — and let you write reusable utilities without losing type info.",
    },
    {
      id: "literal-types",
      title: "Literal and template types",
      keywords: ["literal", "template", "string literal", "const"],
      body: "Literal types are exact values: `'left' | 'right' | 'center'` is a type with three possible strings. Use `as const` to make object literals deeply readonly and specific. Template literal types compose string shapes: `` type Event = `on${Capitalize<string>}`; ``.",
    },
    {
      id: "utility-types",
      title: "Utility types",
      keywords: ["utility", "partial", "required", "pick", "omit", "record"],
      body: "Built-in helpers: `Partial<T>` (all props optional), `Required<T>` (all required), `Readonly<T>`, `Pick<T, K>` (subset), `Omit<T, K>` (inverse), `Record<K, V>` (map type), `Exclude`, `Extract`, `ReturnType<typeof fn>`, `Awaited<T>`. They let you transform types without duplicating them.",
    },
    {
      id: "classes",
      title: "Classes",
      keywords: ["class", "constructor", "public", "private", "readonly"],
      body: "TS classes add access modifiers (public, private, protected), readonly fields, parameter properties (`constructor(private name: string)` auto-assigns), and abstract classes. Private via `#name` (ECMAScript private) is runtime-enforced; `private` is compile-time only.",
    },
    {
      id: "null-safety",
      title: "strictNullChecks",
      keywords: ["null", "undefined", "strict", "safety"],
      body: "With `strictNullChecks` on, `null` and `undefined` are separate from other types — you must explicitly allow them (`string | null`). The compiler then forces you to handle the null case before use. Always enable strict mode on new projects; it eliminates most runtime null errors.",
    },
    {
      id: "modules",
      title: "Modules and bundling",
      keywords: ["module", "import", "export", "bundler", "esm"],
      body: "TS uses ES modules (`import`/`export`). Compiler options control emit: ESM, CommonJS, or both. In practice, projects use a bundler (Vite, esbuild, webpack) or transpiler (tsc, swc, babel) to produce the final JS. Declaration files (.d.ts) ship type info for libraries without source.",
    },
    {
      id: "tsconfig",
      title: "tsconfig.json",
      keywords: ["tsconfig", "config", "strict", "compiler options"],
      body: "tsconfig.json controls the compiler. Essentials: `strict: true` (enables all strict checks), `target` (JS output version), `module`, `moduleResolution: 'bundler'` (modern), `esModuleInterop: true`, `skipLibCheck: true`. Start strict and loosen only when you have a reason.",
    },
    {
      id: "type-vs-runtime",
      title: "Types disappear at runtime",
      keywords: ["runtime", "erasure", "type", "compile"],
      body: "TypeScript types are stripped during compilation — they don't exist at runtime. That means you can't check `typeof x === 'User'`. For runtime validation, pair types with a schema library like Zod or Valibot, which gives both a runtime schema and an inferred TS type from the same source.",
    },
    {
      id: "type-guards",
      title: "Type guards and narrowing",
      keywords: ["type guard", "narrow", "is", "predicate"],
      body: "User-defined type guards use the `x is T` return type: `function isUser(x: unknown): x is User { return typeof x === 'object' && x !== null && 'id' in x; }`. Inside an `if (isUser(x))` block, TS treats `x` as `User`. Built-in guards (`typeof`, `instanceof`, `in`, equality) also narrow.",
    },
    {
      id: "enums",
      title: "Enums (and alternatives)",
      keywords: ["enum", "const enum", "union"],
      body: "`enum Color { Red, Green, Blue }` creates a named constant set. Enums have a runtime object, which surprises people. Many codebases prefer string literal unions (`type Color = 'red' | 'green' | 'blue'`) or `as const` objects — zero runtime cost and easier to tree-shake.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "any", "gotcha", "bug"],
      body: "Frequent issues: leaking `any` (disables type checking for everything it touches — use `unknown` instead); excessive type gymnastics when a refactor would be simpler; trusting `JSON.parse` as typed (it returns `any` — validate with a schema); casting with `as` to silence errors instead of fixing them; forgetting types vanish at runtime.",
    },
    {
      id: "where-ts-shines",
      title: "Where TypeScript shines",
      keywords: ["use", "when", "strength", "scale"],
      body: "TypeScript is the default choice for medium-to-large JavaScript codebases, libraries (so consumers get types), full-stack apps (share types between server and client via tRPC, GraphQL codegen, or shared schemas), and any team where IDE help and refactor safety matter more than the occasional build step.",
    },
  ],
};
