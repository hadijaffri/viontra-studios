// Java reference article for the offline knowledge base.

export const javaArticle = {
  id: "java",
  title: "Java",
  keywords: [
    "java", "jvm", "jdk", "jre", "oracle", "sun microsystems", "gosling",
    "bytecode", "class", "object", "oop", "android", "spring",
  ],
  summary:
    "Java is a class-based, object-oriented, statically typed language designed to run on the Java Virtual Machine (JVM), emphasizing portability via the 'write once, run anywhere' promise.",
  sections: [
    {
      id: "overview",
      title: "What is Java",
      keywords: ["java", "what", "language", "jvm", "oop"],
      body: "Java is a general-purpose, class-based, object-oriented programming language that compiles to bytecode executed by the Java Virtual Machine. It's statically typed, garbage-collected, and one of the most widely used languages for enterprise back-ends, Android apps, and large-scale systems.",
    },
    {
      id: "history",
      title: "History of Java",
      keywords: ["history", "origin", "gosling", "sun", "1995", "oak"],
      body: "Java was created by James Gosling at Sun Microsystems, first released in 1995. It was originally called Oak, designed for set-top boxes. Oracle acquired Sun in 2010 and now stewards the language. Major versions introduced generics (Java 5), lambdas and streams (Java 8), modules (Java 9), var (Java 10), and records/sealed classes (Java 14–17).",
    },
    {
      id: "jvm",
      title: "The JVM",
      keywords: ["jvm", "virtual machine", "bytecode", "jit"],
      body: "The Java Virtual Machine executes platform-independent bytecode. A JIT compiler translates hot bytecode to native machine code at runtime. The JVM also runs other languages: Kotlin, Scala, Clojure, Groovy. This gives Java's ecosystem huge reach — any JVM language can call Java libraries.",
    },
    {
      id: "jdk-jre",
      title: "JDK vs JRE",
      keywords: ["jdk", "jre", "java development kit", "runtime"],
      body: "The JDK (Java Development Kit) is for developers — it includes the compiler (javac), tools, and the JRE. The JRE (Java Runtime Environment) is just what you need to run compiled Java programs. Since Java 11, Oracle ships only a combined JDK; separate JREs are no longer produced for modern versions.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "class", "main", "method", "variable"],
      body: "Everything in Java lives inside a class. An entry point: `public class Hello { public static void main(String[] args) { System.out.println(\"hi\"); } }`. Statements end with semicolons; blocks use braces. Primitive types (int, long, double, boolean, char) and reference types (objects) are distinct.",
    },
    {
      id: "oop",
      title: "Object-oriented programming",
      keywords: ["oop", "class", "object", "inheritance", "polymorphism", "encapsulation"],
      body: "Java is strictly OOP: classes define blueprints, objects are instances. Inheritance uses `extends` (single class inheritance) and `implements` for interfaces. Polymorphism lets subclass instances stand in for base class types. Encapsulation is enforced with private fields + public getters/setters. Abstraction uses interfaces and abstract classes.",
    },
    {
      id: "types",
      title: "Type system",
      keywords: ["type", "static", "primitive", "reference", "generics"],
      body: "Java is statically typed — every variable has a declared type checked at compile time. Primitives (int, double, boolean, char) live on the stack; objects live on the heap. Generics (List<String>) give compile-time type safety. Type erasure means generics don't exist at runtime, which has subtle consequences (no `new T()`).",
    },
    {
      id: "collections",
      title: "Collections framework",
      keywords: ["collection", "list", "set", "map", "arraylist", "hashmap"],
      body: "The java.util collections framework provides List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap, LinkedHashMap), and Queue/Deque. Programs should code to interfaces (`List<T>`) rather than concrete classes. Since Java 8, `List.of(...)` creates immutable lists.",
    },
    {
      id: "streams",
      title: "Streams and lambdas (Java 8+)",
      keywords: ["stream", "lambda", "functional", "filter", "map", "collect"],
      body: "Java 8 added lambda expressions (`x -> x * 2`) and the Stream API for data pipelines: `list.stream().filter(x -> x > 0).map(x -> x * 2).collect(Collectors.toList())`. Streams are lazy and support parallel evaluation via `.parallelStream()`. Functional interfaces (Function, Predicate, Consumer) power the API.",
    },
    {
      id: "exceptions",
      title: "Exceptions",
      keywords: ["exception", "throw", "try", "catch", "checked"],
      body: "Java distinguishes checked exceptions (must be declared or caught, e.g. IOException) from unchecked (RuntimeException subclasses — NullPointerException, IllegalArgumentException). Use `try { } catch (IOException e) { } finally { }` for cleanup, or `try-with-resources` to auto-close AutoCloseable resources.",
    },
    {
      id: "memory",
      title: "Memory and garbage collection",
      keywords: ["memory", "gc", "garbage collection", "heap", "stack"],
      body: "Java manages memory automatically via a garbage collector. The heap holds objects; the stack holds method frames and primitives. Modern GCs (G1, ZGC, Shenandoah) are concurrent and low-pause. You never call `free`, but you can cause leaks by holding references (static maps, listeners) longer than needed.",
    },
    {
      id: "threads",
      title: "Threads and concurrency",
      keywords: ["thread", "concurrency", "synchronized", "executor", "future"],
      body: "Threads are first-class: `new Thread(runnable).start()`. Prefer the higher-level java.util.concurrent APIs — ExecutorService for thread pools, CompletableFuture for async chains, ConcurrentHashMap for lock-free maps. Use `synchronized` or `java.util.concurrent.locks` for critical sections. Java 21 added virtual threads for lightweight concurrency.",
    },
    {
      id: "build-tools",
      title: "Build tools and packaging",
      keywords: ["maven", "gradle", "build", "jar", "pom"],
      body: "Maven and Gradle are the dominant build tools. Maven uses declarative pom.xml; Gradle uses Groovy or Kotlin DSL and is more flexible. Java compiles to .class files packaged into .jar archives; runnable apps are often shipped as fat/uber JARs or as native images via GraalVM.",
    },
    {
      id: "spring",
      title: "Spring ecosystem",
      keywords: ["spring", "spring boot", "dependency injection", "framework"],
      body: "Spring is the dominant Java application framework. Spring Boot gives opinionated autoconfiguration for web services, data access, and messaging. Core concepts: dependency injection (@Autowired / constructor injection), annotations for wiring (@Service, @Repository, @Controller), and Spring Data / Spring Security for common concerns.",
    },
    {
      id: "android",
      title: "Java and Android",
      keywords: ["android", "mobile", "dalvik", "art"],
      body: "Android was Java's biggest consumer app platform. Android compiles Java (or Kotlin) to DEX bytecode run on the ART runtime (not the JVM). Google now recommends Kotlin first, but Java remains fully supported. Java 8 language features are available on Android via desugaring.",
    },
    {
      id: "records-sealed",
      title: "Records, sealed classes, pattern matching",
      keywords: ["record", "sealed", "pattern matching", "switch"],
      body: "Modern Java reduces boilerplate: `record Point(int x, int y) {}` auto-generates constructor, accessors, equals, hashCode. Sealed classes restrict which classes may extend them. Pattern matching works in `instanceof` and `switch` expressions for type-safe destructuring.",
    },
    {
      id: "null-safety",
      title: "Null and Optional",
      keywords: ["null", "nullpointerexception", "optional", "safety"],
      body: "Java has no native null safety, so NullPointerException is infamous. Mitigations: Optional<T> for API return values (never as fields), @Nullable/@NonNull annotations with tools like SpotBugs or IntelliJ's inspector, and defensive `Objects.requireNonNull`. Java 14+ gives helpful NPE messages naming the null subject.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent bugs: using == to compare Strings (use .equals); autoboxing causing NullPointerException on unboxing null Integer; mutable default values shared across instances; catching and swallowing Exception; inheriting ArrayList instead of wrapping it; mixing `Date`/`Calendar` instead of java.time. Use java.time (Instant, LocalDate) over legacy Date APIs.",
    },
    {
      id: "where-java-shines",
      title: "Where Java shines",
      keywords: ["use", "when", "good", "strength", "enterprise"],
      body: "Java excels at long-running server workloads (web services, big-data pipelines, financial systems), Android apps, and any scenario needing mature tooling and a huge ecosystem. It's a safe default for large teams — the static typing, tooling, and IDE support scale well across millions of lines of code.",
    },
  ],
};
