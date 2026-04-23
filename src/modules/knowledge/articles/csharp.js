// C# reference article for the offline knowledge base.

export const csharpArticle = {
  id: "csharp",
  title: "C#",
  keywords: [
    "c#", "csharp", "dotnet", ".net", "microsoft", "hejlsberg", "clr",
    "mono", "xamarin", "unity", "linq", "async", "await",
  ],
  summary:
    "C# is a modern, multi-paradigm, statically typed language developed by Microsoft that runs on the .NET runtime (CLR), used for Windows apps, web services, games (Unity), and cross-platform software.",
  sections: [
    {
      id: "overview",
      title: "What is C#",
      keywords: ["csharp", "c#", "what", "language", "dotnet"],
      body: "C# is a general-purpose, statically typed, object-oriented language with functional features. It compiles to IL (Intermediate Language) executed by the .NET CLR (Common Language Runtime). It's used for web back-ends (ASP.NET Core), desktop apps, cloud services, and game development in Unity.",
    },
    {
      id: "history",
      title: "History of C#",
      keywords: ["history", "origin", "hejlsberg", "microsoft", "2000"],
      body: "C# was designed by Anders Hejlsberg at Microsoft and released in 2000 alongside the .NET Framework. It started as a Windows-only language but became cross-platform via Mono and then .NET Core (2016). In 2020 Microsoft unified everything under .NET 5+, which runs on Windows, Linux, and macOS.",
    },
    {
      id: "dotnet",
      title: ".NET ecosystem",
      keywords: ["dotnet", ".net", "framework", "core", "runtime"],
      body: "'.NET' today means the unified cross-platform runtime and SDK (.NET 6, 7, 8, 9). Older terms: .NET Framework (legacy Windows-only), .NET Core (2016 rewrite), Mono (open-source third-party port). Xamarin/MAUI enable mobile development. ASP.NET Core is the web framework; EF Core is the ORM.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "class", "main", "namespace", "using"],
      body: "Code lives in namespaces and classes. Top-level statements (C# 9+) simplify entry points: `Console.WriteLine(\"hi\");`. Traditional: `namespace App { class Program { static void Main() { ... } } }`. Uses semicolons, curly braces, and PascalCase for types and methods.",
    },
    {
      id: "types",
      title: "Type system",
      keywords: ["type", "value", "reference", "struct", "class"],
      body: "C# separates value types (struct, int, enum — stored inline/stack) from reference types (class, string, interface — heap-allocated). Nullable reference types (C# 8+, string? vs string) bring compile-time null safety. Generics (`List<T>`, `Dictionary<K,V>`) are reified at runtime — unlike Java, `typeof(T)` works.",
    },
    {
      id: "oop",
      title: "Object-oriented features",
      keywords: ["oop", "class", "inheritance", "interface", "abstract"],
      body: "C# supports single class inheritance plus multiple interface implementation. `abstract` for partially implemented types, `sealed` to prevent inheritance, `virtual`/`override` for polymorphism, `partial` to split a class across files. Properties with `{ get; set; }` replace Java-style getters/setters.",
    },
    {
      id: "linq",
      title: "LINQ",
      keywords: ["linq", "query", "lambda", "select", "where"],
      body: "LINQ (Language-Integrated Query) lets you query collections, XML, SQL, and more with a uniform syntax. Method syntax: `list.Where(x => x > 0).Select(x => x * 2).ToList()`. Query syntax: `from x in list where x > 0 select x * 2`. Works against databases via EF Core, translating expression trees to SQL.",
    },
    {
      id: "async-await",
      title: "async / await",
      keywords: ["async", "await", "task", "concurrency"],
      body: "C# pioneered the async/await pattern. `async Task<T>` methods can await other tasks without blocking threads. `await` unwraps a Task<T> to T. Use ConfigureAwait(false) in library code to avoid deadlocks in UI contexts. Avoid `.Result` / `.Wait()` — they can deadlock.",
    },
    {
      id: "records",
      title: "Records and pattern matching",
      keywords: ["record", "pattern", "match", "immutable"],
      body: "`record` (C# 9+) defines immutable reference types with value-based equality: `public record Point(int X, int Y);`. `record struct` for value types. Pattern matching in `switch` and `is`: `if (obj is Point { X: > 0 } p)`. Nonstandard patterns include relational, property, tuple, list (C# 11).",
    },
    {
      id: "nullable-refs",
      title: "Nullable reference types",
      keywords: ["nullable", "null", "reference", "safety"],
      body: "With nullable reference types enabled, `string` means non-null and `string?` allows null. The compiler flows this through assignments and warns on unsafe access. Use `!` (null-forgiving) only when you can prove the value is non-null but the compiler can't see it. Enable via `<Nullable>enable</Nullable>` in the csproj.",
    },
    {
      id: "collections",
      title: "Collections",
      keywords: ["collection", "list", "array", "dictionary"],
      body: "Core types in System.Collections.Generic: List<T>, Dictionary<K,V>, HashSet<T>, Queue<T>, Stack<T>, LinkedList<T>. Immutable versions in System.Collections.Immutable. Arrays are fixed-size reference types. Span<T> and Memory<T> give efficient slicing of contiguous memory without copying.",
    },
    {
      id: "exceptions",
      title: "Exceptions",
      keywords: ["exception", "try", "catch", "throw"],
      body: "Exception handling uses `try { } catch (IOException ex) when (ex.InnerException != null) { } finally { }`. Exception filters with `when` let you conditionally catch without capturing. Prefer `using` (`using var file = ...`) or `using` blocks for IDisposable resources — equivalent to try/finally + Dispose.",
    },
    {
      id: "delegates-events",
      title: "Delegates and events",
      keywords: ["delegate", "event", "action", "func"],
      body: "Delegates are typed function pointers. Action<T>, Func<T, TResult>, Predicate<T> cover most cases. Events (`public event EventHandler Clicked`) let classes broadcast notifications; subscribers use `+=` to attach. Lambdas `x => x + 1` are the usual way to create delegate instances.",
    },
    {
      id: "aspnet",
      title: "ASP.NET Core",
      keywords: ["asp.net", "aspnet", "web", "api", "mvc", "minimal"],
      body: "ASP.NET Core is the .NET web framework. Minimal APIs (`app.MapGet(\"/\", () => \"hi\")`) give Express-like simplicity for small services. MVC controllers handle larger apps. Blazor runs C# in the browser via WebAssembly (Blazor WebAssembly) or via SignalR (Blazor Server).",
    },
    {
      id: "unity",
      title: "C# in Unity",
      keywords: ["unity", "game", "monobehaviour", "engine"],
      body: "Unity is the largest non-Microsoft C# platform. Game logic attaches to GameObjects via MonoBehaviour scripts that define lifecycle methods (Start, Update, FixedUpdate, OnCollisionEnter). Unity uses a modified Mono runtime and IL2CPP to ship native code on consoles and mobile.",
    },
    {
      id: "tooling",
      title: "Tooling and project format",
      keywords: ["tooling", "dotnet cli", "csproj", "nuget", "visual studio"],
      body: "The `dotnet` CLI creates, builds, and runs projects. Project files are XML (.csproj); modern SDK-style projects are short and clear. NuGet is the package manager. Visual Studio (Windows) and Rider (cross-platform) are the premier IDEs; VS Code with the C# DevKit works everywhere.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent issues: blocking on async code with `.Result` causing deadlocks; boxing when passing structs to methods taking `object`; capturing loop variables in closures (fixed in C# 5+ for `foreach`); disposing IDisposable by forgetting `using`; mis-using async `void` (only valid for event handlers); mutable default struct values.",
    },
    {
      id: "where-cs-shines",
      title: "Where C# shines",
      keywords: ["use", "when", "strength", "good"],
      body: "C# is ideal for enterprise back-ends (ASP.NET Core performs near the top of web framework benchmarks), game development (Unity), Windows desktop apps (WPF, WinUI), cross-platform mobile (MAUI), and data-heavy services (with EF Core + LINQ). It's a great default if you want Java-like enterprise ergonomics with a more modern language.",
    },
  ],
};
