// Swift reference article for the offline knowledge base.

export const swiftArticle = {
  id: "swift",
  title: "Swift",
  keywords: [
    "swift", "apple", "lattner", "ios", "macos", "xcode", "objective-c",
    "swiftui", "protocol", "optional", "arc", "compiler", "llvm",
  ],
  summary:
    "Swift is a compiled, statically typed, multi-paradigm language created by Apple in 2014 to replace Objective-C as the primary development language for iOS, macOS, and other Apple platforms.",
  sections: [
    {
      id: "overview",
      title: "What is Swift",
      keywords: ["swift", "what", "language", "apple", "ios"],
      body: "Swift is Apple's modern systems-and-apps language — compiled via LLVM, statically typed, memory-safe by default, and designed to feel lightweight while scaling to large apps. It replaces Objective-C for iOS, iPadOS, macOS, watchOS, tvOS, and visionOS development, and also runs on Linux and Windows.",
    },
    {
      id: "history",
      title: "History of Swift",
      keywords: ["history", "origin", "lattner", "2010", "2014", "wwdc"],
      body: "Swift was started in 2010 by Chris Lattner (also the creator of LLVM) and announced at Apple's WWDC 2014. Version 1.0 shipped September 2014; Swift went open-source under Apache 2.0 in December 2015. Swift 5 (2019) established ABI stability on Apple platforms; Swift 6 (2024) added full data-race safety.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "let", "var", "func", "print"],
      body: "Hello world: `print(\"Hello, world!\")`. Constants use `let`, variables use `var`. Types are inferred when possible; annotate with `:`: `var count: Int = 0`. Functions: `func add(_ a: Int, _ b: Int) -> Int { a + b }`. The underscore makes an argument label unnamed at call sites.",
    },
    {
      id: "types",
      title: "Type system",
      keywords: ["type", "static", "value", "reference", "struct", "class"],
      body: "Swift is statically typed with strong inference. The fundamental split is value types (struct, enum, tuple — copied on assignment) vs reference types (class, closure — shared). Many standard types (String, Array, Dictionary) are value types with copy-on-write, so copies are cheap until mutation.",
    },
    {
      id: "optionals",
      title: "Optionals",
      keywords: ["optional", "nil", "unwrap", "question mark"],
      body: "Optionals make nil explicit in the type: `String?` is either a String or nil. Force unwrap with `!` (crashes on nil — avoid). Safe unwrap with `if let x = maybe { ... }` or `guard let x = maybe else { return }`. Optional chaining (`obj?.method()`) returns nil if any link is nil. Nil-coalescing: `x ?? defaultValue`.",
    },
    {
      id: "control-flow",
      title: "Control flow",
      keywords: ["if", "guard", "switch", "for", "while"],
      body: "`if`, `while`, `for x in seq` work as expected; parentheses around conditions are optional. `guard condition else { return }` is for early exits. `switch` is exhaustive, supports pattern matching, ranges (`1...9`), tuples, and where clauses. Cases don't fall through by default.",
    },
    {
      id: "structs-classes",
      title: "Structs vs classes",
      keywords: ["struct", "class", "value", "reference"],
      body: "Structs are value types with auto-synthesized memberwise initializers, great for data. Classes are reference types with inheritance and identity (`===`). Apple's guidance: prefer structs unless you need inheritance, reference semantics, or Objective-C interop. Most of Swift's standard library uses structs.",
    },
    {
      id: "protocols",
      title: "Protocols and protocol extensions",
      keywords: ["protocol", "extension", "conformance", "oriented"],
      body: "Protocols describe a set of required methods/properties. Types conform explicitly: `struct User: Codable, Identifiable { ... }`. Protocol extensions provide default implementations that any conforming type inherits. 'Protocol-oriented programming' — favor protocols + value types over class hierarchies — is the Swift-native style.",
    },
    {
      id: "generics",
      title: "Generics",
      keywords: ["generic", "type parameter", "constraint", "where"],
      body: "Generics use angle brackets: `func swap<T>(_ a: inout T, _ b: inout T) { ... }`. Constrain with protocols: `func min<T: Comparable>(...)`. `where` clauses add further constraints. The standard library is generic-heavy — Array<Element>, Dictionary<Key, Value>, Result<Success, Failure>, Optional<Wrapped>.",
    },
    {
      id: "enums",
      title: "Enums with associated values",
      keywords: ["enum", "associated value", "case", "sum type"],
      body: "Swift enums are powerful sum types. Cases can carry associated values: `enum Result<T, E: Error> { case success(T); case failure(E) }`. Pattern match with switch. Raw values (Int, String) are optional. Enums can have methods, computed properties, and conform to protocols.",
    },
    {
      id: "closures",
      title: "Closures",
      keywords: ["closure", "lambda", "trailing", "capture"],
      body: "Closures are anonymous functions: `{ (x: Int) -> Int in return x * 2 }`. Type inference and shorthand argument names ($0, $1) shrink them: `nums.map { $0 * 2 }`. Trailing closure syntax puts the closure after the call: `btn.addAction { print(\"tap\") }`. Capture lists (`[weak self]`) control how captured references behave.",
    },
    {
      id: "arc",
      title: "Automatic Reference Counting",
      keywords: ["arc", "memory", "retain", "weak", "unowned"],
      body: "Swift classes use ARC: the compiler inserts retain/release calls to track references. When count hits zero, the object deallocates. Reference cycles leak — break them with `weak var` (optional, becomes nil on dealloc) or `unowned` (non-optional, crashes if accessed after dealloc). Closures that capture self usually need `[weak self]`.",
    },
    {
      id: "error-handling",
      title: "Error handling",
      keywords: ["error", "throws", "try", "catch", "do"],
      body: "Functions that can fail are marked `throws`: `func loadData() throws -> Data`. Callers must handle errors: `do { let d = try loadData() } catch { print(error) }`, or `try?` returns an optional, or `try!` crashes on error. Conform to the `Error` protocol to define error types — typically enums with associated values.",
    },
    {
      id: "concurrency",
      title: "Concurrency (async/await and actors)",
      keywords: ["async", "await", "actor", "task", "concurrency"],
      body: "Swift 5.5+ has structured concurrency: `async` functions are called with `await`. Run in parallel with `async let` or `TaskGroup`. `actor` types serialize access to their state — only one task can be inside an actor at a time, eliminating data races on isolated state. Swift 6 enforces data-race safety at compile time.",
    },
    {
      id: "swiftui",
      title: "SwiftUI",
      keywords: ["swiftui", "ui", "declarative", "view"],
      body: "SwiftUI (2019) is Apple's declarative UI framework — you describe what the UI looks like given state, and the system re-renders on changes. Views are structs conforming to `View`: `struct Hello: View { var body: some View { Text(\"hi\") } }`. State flows via `@State`, `@Binding`, `@ObservedObject`, `@Environment` property wrappers.",
    },
    {
      id: "interop",
      title: "Objective-C and C interop",
      keywords: ["interop", "objective-c", "c", "bridge"],
      body: "Swift can call Objective-C and C directly on Apple platforms. Bridging headers expose Obj-C symbols to Swift. `@objc` annotations expose Swift symbols back to Obj-C (with limitations — generics, tuples, etc. don't bridge). Swift 5.9 added direct C++ interop, allowing Swift to call C++ without an Obj-C layer.",
    },
    {
      id: "tooling",
      title: "Tooling",
      keywords: ["xcode", "swift package manager", "spm", "playground"],
      body: "Xcode is the primary IDE on Apple platforms. Swift Package Manager (SPM) is the official package manager and build tool — `Package.swift` declares dependencies and targets. On Linux and Windows, `swift build` / `swift test` / `swift run` are the CLI equivalents. Playgrounds give a REPL-like interactive environment.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent issues: force-unwrapping optionals (`!`) causing runtime crashes; retain cycles between classes and closures (use `[weak self]`); massive compile-time type inference slowdowns on complex expressions (break them up); overusing classes when structs would do; ignoring Swift's value-type semantics in performance-critical code.",
    },
    {
      id: "where-swift-shines",
      title: "Where Swift shines",
      keywords: ["use", "when", "strength", "apple", "ios"],
      body: "Swift is the default choice for apps on Apple platforms. Beyond that, it's increasingly used for server-side (Vapor, Hummingbird), systems programming, machine learning (Swift for TensorFlow historically), and cross-platform CLI tools. The combination of value types, optionals, generics, and protocols makes it expressive and safe.",
    },
  ],
};
