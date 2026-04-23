// Fortran reference article for the offline knowledge base.

export const fortranArticle = {
  id: "fortran",
  title: "Fortran",
  keywords: [
    "fortran", "formula translation", "backus", "ibm", "1957",
    "scientific", "hpc", "array", "modules", "coarray", "fixed form", "free form",
  ],
  summary:
    "Fortran (from 'Formula Translation') is a compiled, statically typed, general-purpose language created by John Backus's team at IBM in 1957. It's the oldest high-level language still in widespread use, and remains dominant in scientific computing, numerical methods, and high-performance computing (HPC) thanks to strong array support and aggressive compiler optimization.",
  sections: [
    {
      id: "overview",
      title: "What is Fortran",
      keywords: ["fortran", "what", "language", "scientific", "hpc"],
      body: "Fortran is a compiled, statically typed language designed from the start for numerical and scientific computing. It has excellent array syntax, whole-array operations, a module system, and a long tradition of producing fast machine code — compilers have had 60+ years to learn how to vectorize and parallelize Fortran code.",
    },
    {
      id: "history",
      title: "History of Fortran",
      keywords: ["history", "1957", "backus", "ibm", "704"],
      body: "Fortran was developed by John Backus and team at IBM starting in 1954; the first compiler shipped in 1957 for the IBM 704. It was the first widely used high-level language. Key standards: FORTRAN 66, FORTRAN 77, Fortran 90 (the big modernization), Fortran 95, Fortran 2003 (OOP), 2008 (coarrays), 2018, and Fortran 2023.",
    },
    {
      id: "fortran-77",
      title: "FORTRAN 77",
      keywords: ["fortran 77", "fixed form", "column", "legacy"],
      body: "FORTRAN 77 is the version many scientists and much legacy code was written in. Fixed-form source: column 1 = comment marker `C` or `*`, columns 1–5 = statement label, column 6 = continuation, columns 7–72 = code, 73–80 = ignored. All-uppercase names, 6-char limits, SUBROUTINE/FUNCTION, COMMON blocks for globals.",
    },
    {
      id: "fortran-90",
      title: "Fortran 90 — the modernization",
      keywords: ["fortran 90", "free form", "module", "array"],
      body: "Fortran 90 was a major overhaul: free-form source (no column rules), lowercase allowed, long identifiers, modules replacing COMMON blocks, derived types (structs), whole-array operations (`A = B + C` where A, B, C are arrays), dynamic allocation with `allocatable`, pointers, and a cleaner `do`/`end do` loop form.",
    },
    {
      id: "syntax",
      title: "Modern syntax basics",
      keywords: ["syntax", "program", "do", "end do", "print"],
      body: "Hello world:\n\n    program hello\n      print *, 'Hello, world!'\n    end program hello\n\nVariables must be declared (preferably with `implicit none` at the top to disable the default 'I-N means integer' rule). Loops: `do i = 1, 10 \\n ... \\n end do`. Conditionals: `if (cond) then ... else ... end if`.",
    },
    {
      id: "types",
      title: "Types",
      keywords: ["type", "integer", "real", "complex", "kind"],
      body: "Intrinsic types: `integer`, `real`, `complex`, `logical`, `character`. Numeric types take a `kind` parameter controlling precision: `real(kind=8)` is a 64-bit double, `integer(kind=4)` a 32-bit int. Modern idiom uses `selected_real_kind(15)` etc. for portability. Derived types (records) with `type :: Point ... end type`.",
    },
    {
      id: "arrays",
      title: "Arrays",
      keywords: ["array", "slice", "whole array", "rank"],
      body: "Fortran's array support is its superpower. Declare: `real :: A(100, 100)` (2D), `real, allocatable :: B(:,:)` (dynamic). Whole-array ops: `A = B + C * 2.0`. Slicing: `A(2:10, :)`. Intrinsics: `sum(A)`, `matmul(A, B)`, `transpose(A)`, `reshape(x, [3, 4])`, `maxval`, `minloc`. Arrays are 1-indexed by default but any lower bound works.",
    },
    {
      id: "modules",
      title: "Modules",
      keywords: ["module", "use", "public", "private"],
      body: "Modules replace old COMMON blocks and hold types, parameters, and procedures: `module geometry \\n implicit none \\n type :: Vec3 ... end type \\n contains \\n subroutine scale(...) ... end subroutine \\n end module`. Client code: `use geometry`. Access control: `public` / `private`. Modules have proper interfaces the compiler uses to check calls.",
    },
    {
      id: "procedures",
      title: "Subroutines and functions",
      keywords: ["subroutine", "function", "intent", "argument"],
      body: "`subroutine foo(...)` does not return a value; `function foo(...) result(res)` does. Argument intent declares direction: `intent(in)` (read-only), `intent(out)` (must be assigned), `intent(inout)` (both). The compiler and reader both use these to reason about argument semantics — Fortran is unusually explicit about this.",
    },
    {
      id: "oop",
      title: "Object-oriented Fortran",
      keywords: ["oop", "class", "type", "extends", "2003"],
      body: "Fortran 2003 added OOP: derived types can `extend` other types, methods are `procedure`s bound to types with `type-bound` syntax, there's `polymorphism` via `class(Base)` pointers. It's not as slick as Java or C#, but real OOP in the same language that crunches matrices isn't bad. Most scientific code barely uses it.",
    },
    {
      id: "pointers",
      title: "Pointers and allocatable",
      keywords: ["pointer", "allocatable", "allocate", "deallocate"],
      body: "Fortran pointers are *targets*: `real, pointer :: p(:)`. `allocate(p(100))` creates an array. Separately, `real, allocatable :: a(:)` is preferred for owned dynamic arrays — it's automatically deallocated at end of scope and harder to leak. Rule of thumb: use `allocatable` for data you own, `pointer` only when you need aliasing.",
    },
    {
      id: "io",
      title: "Input and output",
      keywords: ["io", "print", "write", "read", "format"],
      body: "Classic I/O uses format strings: `write(*, '(A, I5, F10.3)') 'n=', n, x`. `*` unit means stdout/stdin. File I/O: `open(unit=10, file='data.txt')`, `read(10, *) x, y`, `close(10)`. `*` format means list-directed (auto). NAMELIST I/O writes and reads structured key=value data.",
    },
    {
      id: "parallelism",
      title: "Parallelism — OpenMP, MPI, coarrays",
      keywords: ["parallel", "openmp", "mpi", "coarray", "hpc"],
      body: "Three common paths: OpenMP pragmas for shared-memory threading; MPI for distributed-memory message passing on clusters; coarrays (since Fortran 2008) for partitioned global address space — `real :: A(100)[*]` gives every image its own A and lets you access `A(i)[q]` on image q. Fortran is a workhorse on the world's top supercomputers.",
    },
    {
      id: "compilers",
      title: "Compilers",
      keywords: ["compiler", "gfortran", "ifx", "nvfortran", "flang"],
      body: "Major compilers: gfortran (GCC, free, widely available); Intel oneAPI Fortran (ifx, and legacy ifort — top performance on Intel CPUs); NVIDIA HPC SDK (nvfortran — GPU offload); LLVM's Flang (flang-new, the modern LLVM Fortran). Cray, AMD AOCC, and others have their own. All support modern Fortran standards.",
    },
    {
      id: "usage",
      title: "Where Fortran is used today",
      keywords: ["use", "scientific", "climate", "physics"],
      body: "Fortran dominates: climate and weather models (WRF, MPAS, CESM, ECMWF's IFS), computational fluid dynamics, finite element analysis, quantum chemistry (VASP, Quantum ESPRESSO, Gaussian), astrophysics, seismology, and core HPC benchmarks (LINPACK, HPL). Many numerical libraries (LAPACK, BLAS reference) are written in Fortran.",
    },
    {
      id: "vs-c",
      title: "Fortran vs C/C++",
      keywords: ["vs", "c", "cpp", "comparison", "performance"],
      body: "Fortran compilers can alias-analyze better than C — arguments are assumed not to alias by default, which lets them vectorize harder. Array operations are first-class, not library-level. On the other hand, C/C++ has richer abstractions, more modern tooling, and broader ecosystems. Scientists often keep the number-crunching kernel in Fortran and wrap it from Python or C++.",
    },
    {
      id: "interop",
      title: "C interoperability",
      keywords: ["interop", "c interop", "bind c", "iso_c_binding"],
      body: "Fortran 2003's `iso_c_binding` module and `bind(C)` attributes formalize calling conventions so Fortran and C can interoperate without compiler-specific hacks: `subroutine foo(x) bind(C, name='foo') \\n use iso_c_binding \\n real(c_double), value :: x`. This is how Python's NumPy/SciPy, Julia, and R call Fortran libraries.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent traps: forgetting `implicit none` and getting silent implicit typing; array bound mismatches (off-by-one since Fortran is 1-indexed); column-major storage order (opposite of C's row-major — matters for interop and performance); mutable module-level state acting like globals; old FORTRAN 77 fixed-form conventions leaking into new code; allocating in a loop and fragmenting memory.",
    },
    {
      id: "where-fortran-shines",
      title: "Where Fortran shines",
      keywords: ["use", "strength", "numerical", "hpc", "legacy"],
      body: "Fortran shines for dense numerical array code — scientific simulations, linear algebra kernels, anything that needs maximum floating-point throughput with minimal ceremony. When you need to run a model on 10,000 cores and every cycle counts, Fortran + MPI + OpenMP is still the path of least resistance in many fields.",
    },
  ],
};
