// Rust reference article for the offline knowledge base.

export const rustArticle = {
  id: "rust",
  title: "Rust",
  keywords: [
    "rust", "mozilla", "graydon hoare", "ownership", "borrow", "lifetime",
    "cargo", "crate", "trait", "memory safety", "systems", "async",
  ],
  summary:
    "Rust is a multi-paradigm, general-purpose, compiled systems programming language that emphasizes performance, type safety, and memory safety through an ownership model enforced at compile time — without a garbage collector.",
  sections: [
    {
      id: "overview",
      title: "What is Rust",
      keywords: ["rust", "what", "language", "systems", "safety"],
      body: "Rust is a statically typed, compiled systems language that targets the same performance level as C and C++ while eliminating most memory-safety bugs at compile time. It uses an ownership/borrow-checker model instead of a garbage collector, so programs are both fast and deterministic in memory use.",
    },
    {
      id: "history",
      title: "History of Rust",
      keywords: ["history", "graydon hoare", "mozilla", "2006", "2015"],
      body: "Rust started as a personal project by Graydon Hoare at Mozilla in 2006; Mozilla sponsored it from 2009. Rust 1.0 shipped in May 2015 with strong backward-compatibility guarantees. In 2021 the independent Rust Foundation was formed (AWS, Google, Huawei, Microsoft, Mozilla) to steward the language after Mozilla's restructuring.",
    },
    {
      id: "philosophy",
      title: "Design philosophy",
      keywords: ["philosophy", "safety", "concurrency", "zero cost"],
      body: "Rust's slogans are 'memory safety without garbage collection' and 'fearless concurrency.' The compiler rejects programs that can cause data races, use-after-free, double-free, or null-pointer dereferences. Abstractions are zero-cost — iterators, traits, generics compile down to code as tight as hand-written C.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "fn", "let", "mut", "hello world"],
      body: "Hello world: `fn main() { println!(\"Hello, world!\"); }`. Variables are immutable by default: `let x = 5;` is fixed, `let mut x = 5;` is mutable. Functions use `fn`, blocks are the last expression's value, statements end with `;`. Macros end with `!` (e.g., `println!`, `vec!`).",
    },
    {
      id: "ownership",
      title: "Ownership",
      keywords: ["ownership", "move", "drop", "resource"],
      body: "Every value has a single owner; when the owner goes out of scope the value is dropped (memory freed, files closed, etc.). Assignment moves ownership unless the type is `Copy` (ints, bools, etc.). This rule alone eliminates double-free and use-after-free bugs statically.",
    },
    {
      id: "borrowing",
      title: "Borrowing and references",
      keywords: ["borrow", "reference", "&", "&mut"],
      body: "Instead of moving, you can borrow: `&T` is a shared immutable reference, `&mut T` is an exclusive mutable reference. Rule: at any moment you have either one `&mut` or any number of `&` to a value — never both. This eliminates data races by construction.",
    },
    {
      id: "lifetimes",
      title: "Lifetimes",
      keywords: ["lifetime", "'a", "borrow checker", "reference"],
      body: "Every reference has a lifetime — the scope it's valid for — that the borrow checker verifies. Most are inferred; sometimes you annotate them, e.g., `fn longest<'a>(a: &'a str, b: &'a str) -> &'a str`. Lifetimes ensure a reference never outlives the value it points to.",
    },
    {
      id: "types",
      title: "Types",
      keywords: ["type", "i32", "u32", "f64", "bool", "string"],
      body: "Integers: `i8 i16 i32 i64 i128 isize` and unsigned `u*`. Floats: `f32 f64`. `bool`, `char` (4-byte Unicode scalar). Tuples `(i32, f64)`, arrays `[T; N]`, slices `&[T]`. Strings: `String` (owned, heap, growable) vs `&str` (borrowed slice). Option and Result replace nulls and exceptions.",
    },
    {
      id: "option-result",
      title: "Option and Result",
      keywords: ["option", "result", "none", "err", "unwrap", "?"],
      body: "`Option<T>` is `Some(T)` or `None` — no null pointers. `Result<T, E>` is `Ok(T)` or `Err(E)` — no exceptions. The `?` operator propagates errors up the call stack: `let data = fs::read_to_string(path)?;` returns early with the error if reading fails.",
    },
    {
      id: "structs-enums",
      title: "Structs and enums",
      keywords: ["struct", "enum", "variant", "data"],
      body: "Structs are named records: `struct Point { x: f64, y: f64 }`. Enums are sum types with optional data in each variant: `enum Shape { Circle(f64), Rect(f64, f64) }`. Pattern matching with `match` is exhaustive — the compiler forces you to handle every variant.",
    },
    {
      id: "traits",
      title: "Traits",
      keywords: ["trait", "interface", "impl", "generic"],
      body: "Traits are Rust's interfaces: a set of methods a type can implement. `impl Display for Point { ... }` adds the `Display` trait. Traits power generics (`fn print<T: Display>(x: T)`), trait objects (`&dyn Display` for dynamic dispatch), and shared behavior across unrelated types.",
    },
    {
      id: "generics",
      title: "Generics",
      keywords: ["generic", "type parameter", "monomorphization"],
      body: "Rust generics are monomorphized — the compiler generates specialized code per type use, so there's no runtime cost. Syntax: `fn largest<T: PartialOrd>(xs: &[T]) -> &T`. Trait bounds constrain what operations T supports. Most of Rust's standard collections are generic over their element type.",
    },
    {
      id: "pattern-matching",
      title: "Pattern matching",
      keywords: ["match", "pattern", "destructure", "if let"],
      body: "`match` destructures and branches in one expression: `match x { Some(n) => n, None => 0 }`. `if let Some(n) = x { ... }` is a lightweight one-arm match. Patterns can nest deeply into tuples, structs, enums, ranges, and literals. All `match` arms must cover every possible value.",
    },
    {
      id: "error-handling",
      title: "Error handling",
      keywords: ["error", "panic", "result", "thiserror", "anyhow"],
      body: "Recoverable errors use `Result<T, E>`; unrecoverable bugs use `panic!`, which unwinds (or aborts) the thread. The community uses `thiserror` to define error enums in libraries and `anyhow::Result` for quick-and-dirty application error handling. Exceptions don't exist.",
    },
    {
      id: "memory",
      title: "Memory model",
      keywords: ["memory", "stack", "heap", "box", "rc", "arc"],
      body: "Values live on the stack by default. `Box<T>` heap-allocates a single value. `Rc<T>` is single-threaded reference counting; `Arc<T>` is atomic reference counting (thread-safe). `RefCell` / `Mutex` add interior mutability when you need shared mutation under the borrow rules.",
    },
    {
      id: "concurrency",
      title: "Concurrency",
      keywords: ["concurrency", "thread", "send", "sync", "fearless"],
      body: "`std::thread::spawn` launches OS threads. Safety rests on two marker traits: `Send` (safe to transfer across threads) and `Sync` (safe to share by reference). The compiler rejects code that would cause data races — e.g., you can't send a non-Send `Rc` between threads; it forces you to use `Arc`.",
    },
    {
      id: "async",
      title: "Async/await",
      keywords: ["async", "await", "future", "tokio"],
      body: "Rust has `async fn` and `.await`, but no built-in runtime. You pick a runtime like Tokio or async-std. `async fn foo() -> Result<...> { let x = bar().await?; ... }`. Futures are state machines compiled by the compiler — no allocation per await point when it can avoid it.",
    },
    {
      id: "cargo",
      title: "Cargo and crates",
      keywords: ["cargo", "crate", "crates.io", "build"],
      body: "`cargo` is Rust's build tool and package manager. `cargo new hello` scaffolds a project; `cargo build`, `cargo run`, `cargo test`, `cargo fmt`, `cargo clippy` are everyday commands. Libraries are called crates; the registry at crates.io hosts them. `Cargo.toml` declares dependencies.",
    },
    {
      id: "unsafe",
      title: "Unsafe Rust",
      keywords: ["unsafe", "raw pointer", "ffi", "undefined behavior"],
      body: "`unsafe { ... }` unlocks operations the compiler can't verify: dereferencing raw pointers, calling C functions, mutating static variables. It does not disable the borrow checker inside the block — it just lets you use a small extra set of primitives. Most Rust programs need little or no unsafe code.",
    },
    {
      id: "macros",
      title: "Macros",
      keywords: ["macro", "declarative", "procedural", "derive"],
      body: "`macro_rules!` defines pattern-based declarative macros: `println!`, `vec!`, `format!`. Procedural macros are Rust code that runs at compile time to transform syntax — used for `#[derive(Debug, Clone)]`, the `serde_derive` pipeline, and `#[tokio::main]`. Macros expand before type checking.",
    },
    {
      id: "use-cases",
      title: "Where Rust shines",
      keywords: ["use", "strength", "systems", "performance"],
      body: "Rust is great for: systems code (browsers, OS kernels, embedded), performance-critical services (Discord, Cloudflare, Dropbox), WebAssembly modules, CLI tools (ripgrep, fd, uv), blockchain nodes, game engines, and anywhere you'd reach for C++ but want safety. It's in the Linux kernel and Windows kernel too.",
    },
    {
      id: "ecosystem",
      title: "Ecosystem",
      keywords: ["ecosystem", "serde", "tokio", "axum", "actix"],
      body: "Key crates: `serde` (serialization), `tokio` (async runtime), `reqwest` (HTTP client), `axum` / `actix-web` / `rocket` (web frameworks), `sqlx` / `diesel` (databases), `clap` (CLI parsing), `rayon` (data parallelism), `tracing` (structured logging), `anyhow` / `thiserror` (errors).",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha", "fight borrow"],
      body: "Frequent traps: 'fighting the borrow checker' early on (the fix is usually cloning, restructuring ownership, or splitting borrows); overusing `clone()` instead of redesigning; lifetimes hell with self-referential structs (use `Rc`/`Arc` or `Pin`); trying to rewrite OOP class hierarchies (use traits + composition); async cancellation footguns; `unsafe` to skip the checker instead of fixing ownership.",
    },
    {
      id: "learning",
      title: "Learning Rust",
      keywords: ["learning", "book", "rustlings", "beginner"],
      body: "Canonical path: read 'The Rust Programming Language' (the official book, free online), work through Rustlings (small exercises), read 'Rust by Example,' then ship something real. Expect a learning curve — the payoff is compile-time confidence you rarely get in other systems languages.",
    },
  ],
};
