// Go reference article for the offline knowledge base.

export const goArticle = {
  id: "go",
  title: "Go",
  keywords: [
    "go", "golang", "google", "griesemer", "pike", "thompson", "goroutine",
    "channel", "gofmt", "interface", "structural typing", "concurrency",
  ],
  summary:
    "Go (or Golang) is a statically typed, compiled, garbage-collected language designed at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson for simple, fast, concurrent systems programming.",
  sections: [
    {
      id: "overview",
      title: "What is Go",
      keywords: ["go", "golang", "what", "language", "simple"],
      body: "Go is a general-purpose language emphasizing simplicity, fast compilation, and first-class concurrency. It has C-like syntax, garbage collection, structural typing, and CSP-style concurrency via goroutines and channels. Programs compile to statically linked native binaries — deployments are usually a single file.",
    },
    {
      id: "history",
      title: "History of Go",
      keywords: ["history", "origin", "google", "2007", "2009", "1.0"],
      body: "Go was designed at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson as a reaction to complexity in C++ and slow builds in large codebases. It was publicly announced in November 2009; version 1.0 shipped in March 2012. Generics arrived in Go 1.18 (March 2022).",
    },
    {
      id: "philosophy",
      title: "Design philosophy",
      keywords: ["philosophy", "simple", "orthogonal", "minimal", "less is more"],
      body: "Go deliberately omits features common elsewhere: inheritance, exceptions (in favor of explicit error returns), generics until 1.18, ternary operators, implicit conversions, and more. The design goal is a language small enough to hold in your head, with tooling (build, test, fmt, vet) that enforces one style across large teams.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "package", "main", "import", "func"],
      body: "Hello world: `package main\\nimport \"fmt\"\\nfunc main() { fmt.Println(\"hi\") }`. Every file starts with a `package` declaration. `:=` declares and initializes with type inference. Semicolons are implicit. Public names are capitalized (exported); lowercase is package-private.",
    },
    {
      id: "types",
      title: "Types",
      keywords: ["type", "int", "struct", "slice", "map"],
      body: "Built-in types: bool, string, numeric (int, int64, float64, etc.), and the composite types array ([n]T), slice ([]T), map (map[K]V), struct, and pointer (*T). There's no pointer arithmetic. `rune` is an int32 alias for a Unicode code point; `byte` is a uint8.",
    },
    {
      id: "slices",
      title: "Slices and maps",
      keywords: ["slice", "map", "array", "append", "make"],
      body: "Slices are the primary sequence type — a header of {pointer, length, capacity} over an underlying array. Grow with `append(s, x)`, which may reallocate. Maps are built-in hash tables: `m := map[string]int{}; m[\"a\"] = 1`. Check presence with `v, ok := m[\"a\"]`. Both are reference-ish (they carry internal pointers).",
    },
    {
      id: "structs",
      title: "Structs",
      keywords: ["struct", "field", "record", "embedding"],
      body: "`type Point struct { X, Y int }` defines a record. Create with `Point{X: 1, Y: 2}`. Methods attach by receiver: `func (p Point) Distance() float64 { ... }`. Value vs pointer receivers matter — pointer receivers can mutate; value receivers get a copy. Struct embedding gives composition-based reuse (no inheritance).",
    },
    {
      id: "interfaces",
      title: "Interfaces (structural typing)",
      keywords: ["interface", "structural", "duck typing", "implement"],
      body: "Go interfaces are satisfied implicitly — no `implements` keyword. If a type has the required methods, it automatically satisfies the interface. Example: `type Reader interface { Read(p []byte) (n int, err error) }`. Small interfaces (often one method) are idiomatic. `interface{}` (now `any`) matches anything.",
    },
    {
      id: "goroutines",
      title: "Goroutines",
      keywords: ["goroutine", "concurrency", "go", "green thread"],
      body: "A goroutine is a lightweight thread managed by the Go runtime. Prefix any function call with `go`: `go doWork()`. The scheduler multiplexes thousands of goroutines onto a small pool of OS threads. Goroutines don't provide data-race safety on shared memory — coordinate via channels or sync primitives.",
    },
    {
      id: "channels",
      title: "Channels",
      keywords: ["channel", "chan", "send", "receive", "select"],
      body: "Channels are typed conduits for values between goroutines: `ch := make(chan int)`. Send with `ch <- 42`; receive with `x := <-ch`. Unbuffered channels synchronize sender and receiver; buffered channels queue. `select { case x := <-ch1: ...; case ch2 <- y: ...; }` waits on multiple channels. Slogan: 'don't communicate by sharing memory; share memory by communicating.'",
    },
    {
      id: "errors",
      title: "Error handling",
      keywords: ["error", "err", "errors.is", "panic", "recover"],
      body: "Errors are values: functions return `(result, error)` and callers check `if err != nil`. The `errors` package provides `errors.Is`, `errors.As`, and wrapping via `fmt.Errorf(\"...: %w\", err)`. `panic`/`recover` exists but is reserved for truly exceptional unrecoverable conditions, not normal flow.",
    },
    {
      id: "generics",
      title: "Generics (Go 1.18+)",
      keywords: ["generic", "type parameter", "1.18", "constraint"],
      body: "Generics use bracketed type parameters: `func Map[T, U any](xs []T, f func(T) U) []U { ... }`. Constraints are interfaces listing allowed types, often unions: `type Number interface { ~int | ~float64 }` — the `~` means 'any type whose underlying type is.' Used sparingly in idiomatic Go; interfaces still cover many cases.",
    },
    {
      id: "packages-modules",
      title: "Packages and modules",
      keywords: ["package", "module", "go mod", "import"],
      body: "Every Go file belongs to a package. A module is a collection of packages versioned together, declared in `go.mod`. `go mod init example.com/app` starts a module; `go get example.com/pkg@v1.2.3` adds a dependency. Import paths are URLs (usually a repo path); exported names must start with a capital letter.",
    },
    {
      id: "toolchain",
      title: "Toolchain",
      keywords: ["toolchain", "go build", "go test", "gofmt", "go vet"],
      body: "The `go` command is the whole toolchain: `go build` compiles, `go run` builds and runs, `go test` runs tests (files ending in _test.go), `go fmt` formats (non-negotiable — there's one style), `go vet` catches suspicious constructs, `go mod tidy` cleans dependencies. Built-in race detector: `go test -race`.",
    },
    {
      id: "testing",
      title: "Testing",
      keywords: ["test", "testing", "benchmark", "t.run"],
      body: "Tests live in `xxx_test.go` files using the standard `testing` package: `func TestAdd(t *testing.T) { if add(2,2) != 4 { t.Errorf(\"...\") } }`. Subtests via `t.Run(name, func(t *testing.T) { ... })`. Benchmarks: `func BenchmarkX(b *testing.B) { for i := 0; i < b.N; i++ { ... } }`. Fuzzing since Go 1.18.",
    },
    {
      id: "concurrency-patterns",
      title: "Concurrency patterns",
      keywords: ["pattern", "worker pool", "fan out", "pipeline", "context"],
      body: "Common idioms: worker pool (N goroutines reading from a job channel), pipeline (stages connected by channels), fan-out/fan-in, timeout with `context.WithTimeout`, cancellation propagation via `context.Context`. `sync.WaitGroup` waits for goroutines to finish; `sync.Mutex` protects shared state when channels don't fit.",
    },
    {
      id: "context",
      title: "context package",
      keywords: ["context", "cancel", "deadline", "timeout"],
      body: "`context.Context` carries deadlines, cancellation, and request-scoped values across API boundaries. `ctx, cancel := context.WithCancel(parent)` or `WithTimeout`. Pass ctx as the first argument to functions doing I/O; call `cancel()` to release resources. The standard library (net/http, database/sql) honors context cancellation.",
    },
    {
      id: "binaries",
      title: "Static binaries and deployment",
      keywords: ["binary", "static", "deploy", "cross compile"],
      body: "`go build` produces a single statically linked executable (no Go runtime needed on the target). Cross-compile easily: `GOOS=linux GOARCH=amd64 go build`. This simplicity (one file, no libc dependency when CGO is off) made Go a natural fit for Docker, Kubernetes, CLI tools, and cloud services.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent traps: nil maps (writing to a map declared but not `make`'d panics); loop variable capture in goroutines (until Go 1.22); forgetting to close channels; data races on shared slices/maps; shadowing `err` in `if err := ...; err != nil`; comparing interface values where one side is typed-nil. Run `go vet` and `-race` regularly.",
    },
    {
      id: "where-go-shines",
      title: "Where Go shines",
      keywords: ["use", "when", "strength", "cloud", "server"],
      body: "Go is ideal for cloud infrastructure (Docker, Kubernetes, Terraform, etcd, CockroachDB are all Go), CLI tools, network services, and anywhere you want fast compilation, easy deployment, and built-in concurrency. It trades expressiveness for readability — a strength in teams where hundreds of engineers touch the same codebase.",
    },
  ],
};
