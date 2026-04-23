// Knowledge article: Python. Distilled from the Wikipedia article on
// Python, plus extra sections of practical Python knowledge (list/dict
// comprehensions, decorators, context managers, dataclasses, f-strings,
// common pitfalls) that the Wikipedia article covers lightly.

export const pythonArticle = {
  id: "python",
  title: "Python",
  keywords: ["python", "py", "cpython", "guido", "pypi", "pip", "interpreted", "scripting"],
  summary:
    "Python is a high-level, general-purpose programming language that emphasizes code readability, 'plain English' naming, an extensive standard library, and significant indentation. Created by Guido van Rossum in the late 1980s as a successor to ABC. Dynamic typing, garbage-collected, and multi-paradigm (OO, functional, procedural).",

  sections: [
    {
      id: "overview",
      title: "What Python is",
      keywords: ["what", "overview", "about", "definition", "summary"],
      body:
        "Python is a high-level, dynamically typed, garbage-collected, general-purpose programming language. It emphasizes readability using significant indentation instead of braces. It is multi-paradigm but especially strong in OOP, with first-class support for functional-programming idioms (map, filter, comprehensions, generators). Widely used in scripting, automation, web backends, data science, machine learning, and teaching.",
    },

    {
      id: "history",
      title: "History and creators",
      keywords: ["history", "created", "creation", "guido", "van rossum", "abc", "cwi", "1989", "1991"],
      body:
        "Python was conceived in the late 1980s by Guido van Rossum at CWI (Netherlands) as a successor to the ABC language. Implementation began in December 1989. Van Rossum released Python 0.9.0 in 1991. Python 2.0 arrived in October 2000 with list comprehensions, cycle-detecting GC, and Unicode. Python 3.0 (December 2008) was a major revision and not fully backward-compatible. Python 2.7 was the last of 2.x; it reached end-of-life in 2020. Van Rossum was the 'Benevolent Dictator for Life' until July 2018; governance is now a five-member Steering Council elected annually.",
    },

    {
      id: "naming",
      title: "Where the name comes from",
      keywords: ["name", "monty python", "spam", "eggs"],
      body:
        "Python is named after the British comedy group Monty Python, not the snake. Monty Python references appear throughout Python code and culture: metasyntactic variables are 'spam' and 'eggs' rather than 'foo' and 'bar'. The official documentation contains assorted Monty Python jokes.",
    },

    {
      id: "zen-of-python",
      title: "The Zen of Python",
      keywords: ["zen", "pep 20", "philosophy", "design", "tim peters"],
      body:
        "PEP 20, 'The Zen of Python' by Tim Peters, is a set of aphorisms summarizing the language's design philosophy. A few:\n- Beautiful is better than ugly.\n- Explicit is better than implicit.\n- Simple is better than complex.\n- Readability counts.\n- Errors should never pass silently, unless explicitly silenced.\n- There should be one — and preferably only one — obvious way to do it.\nRun `import this` in a Python REPL to see the full list.",
    },

    {
      id: "indentation",
      title: "Significant indentation",
      keywords: ["indentation", "whitespace", "block", "off-side"],
      body:
        "Python uses indentation (not braces) to delimit blocks. The statement that begins a block ends with a colon, and all lines that belong to the block share the same indent. Four spaces per level is the recommended indent (PEP 8). Mixing tabs and spaces in the same block is a syntax error. Known as the 'off-side rule'.",
    },

    {
      id: "typing",
      title: "Typing: dynamic, strong, duck-typed",
      keywords: ["typing", "dynamic", "duck", "strong", "type hint", "mypy", "annotation"],
      body:
        "Python is dynamically typed: types belong to values, not names. It is also strongly typed: 1 + '2' is an error, not a silent coercion. Objects are checked by behavior (duck typing): if it walks like a duck and quacks like a duck, it's a duck. Since Python 3.5, you can add optional type hints that the interpreter ignores but external checkers like mypy can verify:\n\ndef greet(name: str) -> str:\n    return f'Hello, {name}'",
    },

    {
      id: "variables-statements",
      title: "Variables and statements",
      keywords: ["variable", "assignment", "statement", "if", "for", "while", "def", "class"],
      body:
        "Assignment uses a single =. Variables are references — `x = y` makes x refer to the same object as y. Core statements:\n- if / elif / else\n- for x in iterable: / else (runs if loop finished without break)\n- while cond: / else\n- try / except / else / finally — exception handling\n- with ctx as name: — context managers\n- def name(args): — function\n- class Name(Base): — class\n- match value: case pattern: — structural pattern matching (3.10+)\n- return, yield, raise, break, continue, pass, import, from, global, nonlocal, del, assert, async, await.",
    },

    {
      id: "built-in-types",
      title: "Built-in data types",
      keywords: ["type", "int", "float", "str", "bool", "list", "tuple", "dict", "set", "none"],
      body:
        "Core built-in types:\n- int: unlimited precision.\n- float: 64-bit IEEE 754.\n- complex: 3+2j.\n- bool: True/False (subclass of int).\n- str: immutable Unicode text.\n- bytes / bytearray: raw bytes.\n- list: mutable ordered sequence — [1, 2, 3].\n- tuple: immutable ordered sequence — (1, 2, 3).\n- dict: mutable key→value map — {'a': 1}.\n- set / frozenset: unordered unique collection — {1, 2, 3}.\n- NoneType: the single value None.",
    },

    {
      id: "lists-tuples",
      title: "Lists vs. tuples",
      keywords: ["list", "tuple", "mutable", "immutable"],
      body:
        "Lists [1, 2, 3] are mutable — you can append, remove, sort, reverse. Tuples (1, 2, 3) are immutable and therefore hashable (can be dict keys or set members). Use tuples for heterogeneous fixed-size records (coordinates, RGB colors) and lists for homogeneous resizable collections. Single-element tuple requires a trailing comma: (1,).",
    },

    {
      id: "dicts-sets",
      title: "Dicts and sets",
      keywords: ["dict", "dictionary", "set", "hash", "map", "associative"],
      body:
        "A dict maps hashable keys to values: {'name': 'Ada', 'age': 36}. Since Python 3.7, dicts preserve insertion order. Common patterns: d.get(key, default), d.setdefault(key, []), {**a, **b} to merge, d | other (3.9+). Sets {1, 2, 3} hold unique hashable values with fast membership testing; support union |, intersection &, difference -, symmetric difference ^.",
    },

    {
      id: "strings",
      title: "Strings and f-strings",
      keywords: ["string", "str", "f-string", "format", "concatenate", "interpolation"],
      body:
        "Strings are immutable sequences of Unicode code points. Quote with ' or \" (equivalent), or ''' / \"\"\" for multi-line. Three ways to format:\n- % formatting (old): 'hi %s' % name\n- str.format: 'hi {}'.format(name)\n- f-strings (3.6+, preferred): f'hi {name}, age {age + 1}'\nf-strings can also format values: f'{price:.2f}', f'{name!r}'. Raw strings disable backslash escapes: r'C:\\path'.",
    },

    {
      id: "comprehensions",
      title: "List, dict, set, and generator comprehensions",
      keywords: ["comprehension", "list comprehension", "dict comprehension", "generator", "generator expression"],
      body:
        "Comprehensions build collections in one expression:\n- List: [x*x for x in range(10) if x % 2 == 0]\n- Dict: {name: len(name) for name in names}\n- Set: {x % 5 for x in data}\n- Generator: (x*x for x in range(10)) — lazy, no memory allocation until consumed.\nNested comprehensions are read left-to-right: [cell for row in grid for cell in row]. They are usually clearer than map/filter chains.",
    },

    {
      id: "functions",
      title: "Functions: def, default args, *args, **kwargs",
      keywords: ["function", "def", "args", "kwargs", "default", "lambda", "argument"],
      body:
        "Functions are defined with def. Arguments can have defaults, and extra positional/keyword arguments are collected with *args and **kwargs:\n\ndef greet(name, greeting='Hello', *args, **kwargs):\n    ...\n\nCall with keyword args to skip optional positionals: greet('Ada', greeting='Hi'). Lambdas are one-expression anonymous functions: sorted(items, key=lambda x: x.name). Common gotcha: default arguments are evaluated once at def time — never use a mutable default like def f(x=[]): — use None and create inside.",
    },

    {
      id: "classes",
      title: "Classes and OOP",
      keywords: ["class", "object", "method", "self", "inheritance", "__init__", "dunder"],
      body:
        "Classes define types:\n\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def distance(self, other):\n        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5\n\nself is the instance; methods always take it as the first argument. Inherit with class Child(Parent): and call super().__init__(...). Special methods ('dunders') customize operator behavior — __str__, __repr__, __eq__, __hash__, __lt__, __len__, __iter__, __enter__/__exit__, __add__, etc.",
    },

    {
      id: "dataclasses",
      title: "@dataclass — boilerplate-free classes",
      keywords: ["dataclass", "@dataclass", "record", "struct"],
      body:
        "dataclasses.dataclass (3.7+) auto-generates __init__, __repr__, and __eq__ from field annotations:\n\nfrom dataclasses import dataclass\n@dataclass\nclass Point:\n    x: float\n    y: float\n\nOptions: frozen=True (immutable), order=True (adds comparison methods), slots=True (saves memory, 3.10+). For more validation, use pydantic or attrs instead.",
    },

    {
      id: "decorators",
      title: "Decorators (@)",
      keywords: ["decorator", "@", "wrap", "wrapper", "functools"],
      body:
        "A decorator is a function that takes a function and returns a new function. Applied with @:\n\ndef log(fn):\n    def wrapper(*args, **kwargs):\n        print(f'calling {fn.__name__}')\n        return fn(*args, **kwargs)\n    return wrapper\n\n@log\ndef add(a, b): return a + b\n\nUseful built-ins: @staticmethod, @classmethod, @property, @functools.lru_cache, @dataclass. Use functools.wraps inside your own decorators to preserve metadata.",
    },

    {
      id: "context-managers",
      title: "Context managers (with)",
      keywords: ["context manager", "with", "open", "contextlib", "enter", "exit"],
      body:
        "The with statement acquires a resource and guarantees cleanup:\n\nwith open('file.txt') as f:\n    data = f.read()\n\nThe file closes automatically, even if an exception is raised. Any object with __enter__ and __exit__ works. For ad-hoc ones, use contextlib.contextmanager:\n\n@contextmanager\ndef timing():\n    start = time.time()\n    yield\n    print(time.time() - start)",
    },

    {
      id: "generators",
      title: "Generators and iterators",
      keywords: ["generator", "iterator", "yield", "next", "iter", "lazy"],
      body:
        "A function that uses yield is a generator: calling it returns an iterator that produces values one at a time:\n\ndef count_up(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\nIterators are memory-efficient because they compute on demand. Use them for large files, streams, or infinite sequences. Any object defining __iter__ and __next__ is an iterator.",
    },

    {
      id: "exceptions",
      title: "Exceptions",
      keywords: ["exception", "try", "except", "raise", "finally", "error"],
      body:
        "try/except/else/finally handles errors:\n\ntry:\n    n = int(user_input)\nexcept ValueError as e:\n    print(f'bad input: {e}')\nelse:\n    # runs only if no exception\n    print(n)\nfinally:\n    # always runs\n    cleanup()\n\nCatch specific exceptions — bare `except:` catches everything including KeyboardInterrupt, which is almost always wrong. Raise with `raise ValueError('bad')` or `raise` (re-raise inside except).",
    },

    {
      id: "async",
      title: "async / await",
      keywords: ["async", "await", "asyncio", "coroutine", "asynchronous"],
      body:
        "Python supports cooperative concurrency with async/await:\n\nimport asyncio\nasync def fetch(url):\n    ...\nasync def main():\n    results = await asyncio.gather(fetch('a'), fetch('b'))\nasyncio.run(main())\n\nCalling an async function returns a coroutine; await schedules it and yields control to the event loop. asyncio is best for I/O-bound workloads (many network calls). For CPU-bound work, use multiprocessing or a compiled language instead — the GIL prevents real parallel CPU use with threads.",
    },

    {
      id: "modules-packages",
      title: "Modules, packages, and imports",
      keywords: ["module", "package", "import", "from", "__init__", "pip", "pypi"],
      body:
        "A module is a .py file; a package is a directory containing __init__.py (optional in 3.3+) and submodules. Import styles:\n- import math — then math.sqrt(9).\n- from math import sqrt, pi — imports names directly.\n- import numpy as np — alias.\nThe `if __name__ == '__main__':` guard distinguishes 'run as script' from 'imported as module'.",
    },

    {
      id: "standard-library",
      title: "The standard library and PyPI",
      keywords: ["standard library", "stdlib", "pypi", "pip", "package"],
      body:
        "Python's 'batteries-included' standard library covers files and paths (os, pathlib), data formats (json, csv, xml, pickle), networking (urllib, socket, http), concurrency (threading, multiprocessing, asyncio), testing (unittest), math (math, statistics, decimal, fractions), collections (collections, heapq, bisect, itertools, functools), and much more. Third-party packages live on PyPI (pypi.org) and install with pip: `pip install requests`. As of 2025 PyPI has over 600,000 packages.",
    },

    {
      id: "implementations",
      title: "CPython and alternative implementations",
      keywords: ["cpython", "pypy", "jython", "micropython", "implementation", "interpreter"],
      body:
        "CPython, written in C, is the reference implementation — this is what you run when you type `python`. It compiles source to bytecode (.pyc) then executes it on a stack-based virtual machine. Alternatives: PyPy (JIT-compiled, often much faster), Jython (runs on the JVM, Python 2.7), IronPython (.NET), MicroPython and CircuitPython (microcontrollers), Cython (compiles a typed superset to C), Nuitka (compiles Python to C).",
    },

    {
      id: "gil",
      title: "The GIL (Global Interpreter Lock)",
      keywords: ["gil", "global interpreter lock", "thread", "concurrency", "parallelism"],
      body:
        "CPython's GIL allows only one thread to execute Python bytecode at a time, even on multi-core machines. Threads still help for I/O-bound tasks (they release the GIL while waiting). For CPU-bound parallelism, use multiprocessing, a C extension that releases the GIL, or a library like NumPy. Python 3.13 added an experimental 'no-GIL' build (PEP 703).",
    },

    {
      id: "pep8",
      title: "PEP 8 style guide",
      keywords: ["pep 8", "style", "pep8", "formatting", "lint"],
      body:
        "PEP 8 is the official style guide:\n- 4 spaces per indent, no tabs.\n- Lines ≤ 79 chars (or ≤ 99, per project).\n- snake_case for functions and variables, PascalCase for classes, UPPER_SNAKE for constants.\n- Two blank lines between top-level definitions, one between methods.\n- Imports at the top, one per line, grouped stdlib → third-party → local.\nAutomated tools: `black` (formatter), `ruff` (fast linter + formatter), `isort` (import sorter), `flake8`, `pylint`.",
    },

    {
      id: "common-pitfalls",
      title: "Common Python pitfalls",
      keywords: ["mistake", "gotcha", "pitfall", "bug", "wrong"],
      body:
        "Classics that bite beginners:\n- Mutable default argument: def f(x=[]): shares the same list across calls. Use None and create inside.\n- `is` vs `==`: use `==` for value equality; reserve `is` for singletons like None, True, False.\n- Late-binding closures in loops: lambdas in list/for bind the variable, not its value — use a default arg to capture.\n- Integer truthiness and `if x:` — 0, '', [], {}, None are all falsy.\n- Circular imports — usually a sign a module is doing too much.\n- Forgetting `self` in a method signature.\n- Shadowing a built-in name (list, str, id, type) — harmless until it breaks.",
    },

    {
      id: "where-python-shines",
      title: "What Python is used for",
      keywords: ["use", "usage", "data science", "machine learning", "web", "scripting"],
      body:
        "Python's strongest niches:\n- Data science and machine learning — NumPy, pandas, scikit-learn, PyTorch, TensorFlow, Jupyter.\n- Automation and scripting — glue across systems, filesystem tasks, config management (Ansible).\n- Web backends — Django, Flask, FastAPI.\n- DevOps and infrastructure — AWS CLI, SaltStack, OpenStack.\n- Scientific computing and research — SciPy, Astropy, Biopython.\n- Teaching — the most widely-taught first language.\nNot its strongest niche: real-time graphics, high-frequency trading, OS kernels, or anywhere CPU performance with low memory is critical.",
    },
  ],
};
