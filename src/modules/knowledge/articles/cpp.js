// C++ reference article for the offline knowledge base.

export const cppArticle = {
  id: "cpp",
  title: "C++",
  keywords: [
    "c++", "cpp", "stroustrup", "stl", "template", "pointer", "reference",
    "raii", "smart pointer", "systems", "bjarne", "compile",
  ],
  summary:
    "C++ is a statically typed, compiled, multi-paradigm systems programming language created by Bjarne Stroustrup as an extension of C, combining low-level control with high-level abstractions.",
  sections: [
    {
      id: "overview",
      title: "What is C++",
      keywords: ["c++", "cpp", "what", "language", "systems"],
      body: "C++ is a general-purpose programming language designed for systems programming with a strong emphasis on zero-cost abstractions. It extends C with classes, templates, exceptions, and a rich standard library (STL). It compiles to native machine code and gives fine control over memory and hardware.",
    },
    {
      id: "history",
      title: "History of C++",
      keywords: ["history", "origin", "stroustrup", "1979", "c with classes"],
      body: "C++ was created by Bjarne Stroustrup at Bell Labs in 1979, originally as 'C with Classes.' It was renamed C++ in 1983 and first standardized as C++98 by ISO. Major revisions: C++11 (move semantics, auto, lambdas, smart pointers), C++14, C++17 (optional, variant, structured bindings), C++20 (concepts, modules, ranges, coroutines), C++23.",
    },
    {
      id: "compilation",
      title: "Compilation model",
      keywords: ["compile", "compiler", "gcc", "clang", "msvc", "linker"],
      body: "C++ is compiled ahead of time to native code. Major compilers: GCC (g++), Clang (clang++), MSVC (Microsoft Visual C++). The build has two stages: compile each translation unit to object files, then link them together. Headers are included textually by the preprocessor — which is why builds are slow and why C++20 added modules.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "main", "include", "namespace"],
      body: "Hello world: `#include <iostream>\\nint main() { std::cout << \"hi\\\\n\"; return 0; }`. Code is organized into headers (.h/.hpp — declarations) and source files (.cpp — definitions). The `std` namespace holds the standard library; `using namespace std;` pulls it in (avoid in headers).",
    },
    {
      id: "types",
      title: "Types and values",
      keywords: ["type", "int", "auto", "const", "reference"],
      body: "Primitive types: bool, char, int, long, float, double, plus fixed-width (int32_t, uint64_t) in <cstdint>. `auto` (C++11) deduces type from initializer. `const` makes values immutable; `constexpr` makes them compile-time constants. References (`T&`) are aliases that cannot be null or reseated.",
    },
    {
      id: "pointers-references",
      title: "Pointers and references",
      keywords: ["pointer", "reference", "nullptr", "address"],
      body: "A pointer `T*` holds an address and can be null (`nullptr`) or reassigned. A reference `T&` is an alias — must be bound on creation, never null. Rule of thumb: use references for parameters you don't transfer ownership of, pointers when nullable, smart pointers when the function owns the memory.",
    },
    {
      id: "memory",
      title: "Memory management",
      keywords: ["memory", "new", "delete", "stack", "heap"],
      body: "C++ has no garbage collector. Stack-allocated objects are destroyed automatically when the scope exits. Heap allocation via `new` must be freed with `delete` (or `delete[]` for arrays). Modern C++ avoids raw `new`/`delete` almost entirely — prefer smart pointers and value types.",
    },
    {
      id: "raii",
      title: "RAII",
      keywords: ["raii", "resource", "destructor", "scope"],
      body: "RAII — Resource Acquisition Is Initialization — is C++'s central idiom. A resource (memory, file, lock, socket) is owned by an object; the constructor acquires it, the destructor releases it. When the object goes out of scope, cleanup is automatic. RAII makes exception safety natural and eliminates most leaks.",
    },
    {
      id: "smart-pointers",
      title: "Smart pointers",
      keywords: ["smart pointer", "unique_ptr", "shared_ptr", "weak_ptr"],
      body: "Smart pointers own heap memory and free it automatically. `std::unique_ptr<T>` — exclusive ownership, move-only, zero overhead. `std::shared_ptr<T>` — shared ownership via reference count, thread-safe but with atomic overhead. `std::weak_ptr<T>` — non-owning observer that breaks shared_ptr cycles. Create with `std::make_unique<T>(...)` / `std::make_shared<T>(...)`.",
    },
    {
      id: "move-semantics",
      title: "Move semantics (C++11)",
      keywords: ["move", "rvalue", "semantics", "std::move"],
      body: "Move semantics let you transfer ownership of resources without copying. `std::vector<T> v2 = std::move(v1);` leaves v1 empty and v2 owning the buffer. rvalue references (`T&&`) capture temporaries. Combined with RAII this gives C++ efficient value semantics — you can return a `std::vector` by value without worrying about copy cost.",
    },
    {
      id: "templates",
      title: "Templates and generic programming",
      keywords: ["template", "generic", "type parameter"],
      body: "Templates generate code from type parameters at compile time: `template<typename T> T add(T a, T b) { return a + b; }`. Instantiated per type, so there's zero runtime overhead. Template metaprogramming turns the compiler into a type-level evaluator. C++20 concepts (`template<std::integral T>`) constrain templates with readable error messages.",
    },
    {
      id: "stl",
      title: "Standard Template Library",
      keywords: ["stl", "standard library", "container", "algorithm", "iterator"],
      body: "The STL provides containers (vector, array, deque, list, map, unordered_map, set), algorithms (sort, find, transform, accumulate, copy), and iterators that connect them. Prefer `std::vector` for nearly all sequential storage — contiguous memory + amortized O(1) push_back beats linked lists in practice.",
    },
    {
      id: "classes",
      title: "Classes and the rule of 5",
      keywords: ["class", "constructor", "rule of five", "special members"],
      body: "Classes have six special members: default constructor, destructor, copy constructor, copy assignment, move constructor, move assignment. The 'rule of 5': if you define any of destructor/copy/move, define them all (or default/delete them). Better: follow the 'rule of 0' — rely on members that already manage themselves (smart pointers, vectors).",
    },
    {
      id: "inheritance",
      title: "Inheritance and polymorphism",
      keywords: ["inheritance", "virtual", "polymorphism", "override"],
      body: "Derive with `class Dog : public Animal`. Mark base methods `virtual` for dynamic dispatch; derived methods use `override` (C++11) for safety. Destructors in polymorphic base classes must be virtual or you leak derived members. Prefer composition + interfaces over deep hierarchies.",
    },
    {
      id: "lambdas",
      title: "Lambdas (C++11)",
      keywords: ["lambda", "closure", "capture"],
      body: "Lambdas are inline function objects: `auto add = [](int a, int b) { return a + b; };`. Capture clause `[x, &y]` captures x by value and y by reference. Generic lambdas `[](auto x)` (C++14) work like templates. Commonly passed to STL algorithms: `std::sort(v.begin(), v.end(), [](auto a, auto b){ return a.age < b.age; });`.",
    },
    {
      id: "exceptions",
      title: "Exceptions",
      keywords: ["exception", "throw", "try", "catch", "noexcept"],
      body: "`throw std::runtime_error(\"msg\");` throws; `try { } catch (const std::exception& e) { }` catches. Exception-safe code needs RAII to avoid leaks during stack unwinding. `noexcept` marks functions that won't throw, enabling optimizations. Some domains (game engines, embedded) disable exceptions entirely and use error codes or expected<T, E>.",
    },
    {
      id: "concurrency",
      title: "Concurrency",
      keywords: ["thread", "mutex", "atomic", "concurrency", "async"],
      body: "`<thread>` provides std::thread; `<mutex>` gives mutex, lock_guard, unique_lock; `<atomic>` gives lock-free primitives. `std::async` kicks off async work returning std::future<T>. C++20 added jthread (auto-joining), stop_token for cancellation, and semaphores/latches/barriers.",
    },
    {
      id: "build-systems",
      title: "Build systems",
      keywords: ["build", "cmake", "make", "meson", "conan"],
      body: "C++ has no official build system. CMake is the de facto standard, generating build files for make/Ninja/Visual Studio. Alternatives: Meson, Bazel, Build2. Package managers: Conan, vcpkg — both mature but younger than the language. Header-only libraries remain popular because they sidestep build-system pain.",
    },
    {
      id: "undefined-behavior",
      title: "Undefined behavior",
      keywords: ["undefined behavior", "ub", "bug", "safety"],
      body: "C++ has extensive undefined behavior: out-of-bounds access, signed integer overflow, use-after-free, null dereference, data races. The compiler is allowed to assume UB doesn't happen, which produces fast code but can manifest as bizarre behavior. Tools: ASan (AddressSanitizer), UBSan, TSan catch these at runtime.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent bugs: dangling references/pointers, iterator invalidation when a container reallocates, slicing when passing a derived class by value, missing virtual destructors, forgetting `const`, copying expensive objects accidentally, using `auto` with temporaries, static initialization order fiasco. Enable warnings (-Wall -Wextra -Wpedantic) and run sanitizers.",
    },
    {
      id: "where-cpp-shines",
      title: "Where C++ shines",
      keywords: ["use", "when", "strength", "performance"],
      body: "C++ dominates domains where performance and control matter: game engines (Unreal, Unity's engine core), browsers (Chromium, Firefox), databases, high-frequency trading, embedded systems, scientific computing, graphics, and OS kernels/drivers. Modern C++ (C++17/20) with RAII + smart pointers is a very different experience from 1990s C++.",
    },
  ],
};
