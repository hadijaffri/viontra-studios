// PHP reference article for the offline knowledge base.

export const phpArticle = {
  id: "php",
  title: "PHP",
  keywords: [
    "php", "lerdorf", "hypertext preprocessor", "web", "wordpress",
    "laravel", "composer", "server", "apache", "fpm",
  ],
  summary:
    "PHP (PHP: Hypertext Preprocessor) is a dynamically typed, server-side scripting language created by Rasmus Lerdorf in 1994, specialized for web development and embedded directly in HTML.",
  sections: [
    {
      id: "overview",
      title: "What is PHP",
      keywords: ["php", "what", "language", "server", "web"],
      body: "PHP is a server-side scripting language primarily used for web development. Code runs on the server; the output (usually HTML) is sent to the browser. PHP powers a huge share of the web — WordPress alone runs roughly 40% of all websites, and it's the backbone of frameworks like Laravel and Symfony.",
    },
    {
      id: "history",
      title: "History of PHP",
      keywords: ["history", "origin", "lerdorf", "1994", "personal home page"],
      body: "PHP was created by Rasmus Lerdorf in 1994 as a set of Perl scripts called Personal Home Page Tools. It was rewritten in C and released as PHP/FI in 1995. PHP 3 (1998) rewrote it again; PHP 4 (2000) introduced the Zend Engine; PHP 5 (2004) added proper OOP; PHP 7 (2015) doubled performance; PHP 8 (2020) added the JIT and many language improvements.",
    },
    {
      id: "how-it-runs",
      title: "How PHP runs",
      keywords: ["runtime", "apache", "fpm", "sapi", "request"],
      body: "PHP typically runs per-request: the web server (Apache with mod_php, or Nginx via PHP-FPM) invokes PHP, which processes the script and returns output, then tears down. Modern alternatives like Swoole and RoadRunner keep PHP resident to avoid the bootstrap cost. The shared-nothing model makes PHP easy to scale horizontally.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "tag", "variable", "dollar sign"],
      body: "PHP code lives in `<?php ... ?>` tags (closing tag optional in pure PHP files). Variables start with `$`: `$name = \"Ada\";`. Semicolons end statements. Strings use single or double quotes — double quotes interpolate variables (`\"hello $name\"`), single quotes don't. Concatenation uses `.`, not `+`.",
    },
    {
      id: "types",
      title: "Type system",
      keywords: ["type", "dynamic", "scalar", "hint"],
      body: "PHP is dynamically typed but has gained rich static type hints over the versions: scalar types (int, float, string, bool), union types (`int|string`), intersection types, nullable (`?string`), readonly properties, enums (PHP 8.1), and return types. `declare(strict_types=1);` at the top of a file enforces exact type matching.",
    },
    {
      id: "variables",
      title: "Variables and scope",
      keywords: ["variable", "scope", "global", "static"],
      body: "Variables are function-scoped by default. Global variables need `global $x;` or `$GLOBALS['x']` to be visible inside functions — most codebases avoid this and pass dependencies explicitly. Static variables persist across calls of the same function. `$$var` is variable-variables — rarely useful, usually a smell.",
    },
    {
      id: "arrays",
      title: "Arrays (and associative arrays)",
      keywords: ["array", "associative", "hash", "map"],
      body: "PHP has one built-in collection: the array, which is both a sequential list and a hashmap. `$list = [1, 2, 3];` indexed, `$map = ['name' => 'Ada', 'age' => 36];` associative. Order is preserved. Hundreds of array_ functions (array_map, array_filter, array_merge, array_reduce) power most data manipulation.",
    },
    {
      id: "strings",
      title: "Strings",
      keywords: ["string", "interpolation", "concat", "heredoc"],
      body: "Double-quoted strings interpolate (`\"hello $name\"`) and recognize escapes (\\n, \\t). Single-quoted are literal. Heredoc (`<<<EOT ... EOT`) behaves like double-quoted across lines; nowdoc (`<<<'EOT' ... EOT`) like single-quoted. Multibyte text needs the mb_ functions, not the classic string functions, to be correct.",
    },
    {
      id: "oop",
      title: "Object-oriented PHP",
      keywords: ["oop", "class", "interface", "trait"],
      body: "PHP has classes, interfaces, abstract classes, and traits (horizontal code reuse without inheritance). Access modifiers: public, protected, private. Constructor property promotion (PHP 8) lets you declare and assign in one line: `public function __construct(private string $name) {}`. Namespaces (`namespace App\\Model;`) organize code.",
    },
    {
      id: "superglobals",
      title: "Superglobals",
      keywords: ["superglobal", "get", "post", "session", "server"],
      body: "Superglobals are auto-populated per request: `$_GET` (query string), `$_POST` (form body), `$_REQUEST` (both, plus cookies), `$_SERVER` (headers and env), `$_SESSION` (per-user state), `$_COOKIE`, `$_FILES`. Treat all user input as untrusted — filter, validate, and use prepared statements.",
    },
    {
      id: "database",
      title: "Databases — PDO",
      keywords: ["database", "pdo", "mysql", "prepared statement"],
      body: "PDO is the modern, unified database API — same interface across MySQL, PostgreSQL, SQLite, SQL Server. Always use prepared statements: `$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?'); $stmt->execute([$id]);`. Avoid the older mysql_/mysqli_ procedural APIs and never string-concatenate values into SQL.",
    },
    {
      id: "composer",
      title: "Composer and packages",
      keywords: ["composer", "package", "autoload", "dependency"],
      body: "Composer is PHP's package manager. `composer.json` declares dependencies; `composer install` fetches them into `vendor/`. Composer also generates a PSR-4 autoloader so you don't have to `require` files manually — just `use App\\Model\\User;` and it loads on demand. Packagist is the default package registry.",
    },
    {
      id: "frameworks",
      title: "Frameworks",
      keywords: ["framework", "laravel", "symfony", "wordpress"],
      body: "Laravel is the dominant modern PHP framework — batteries-included with Eloquent ORM, routing, queues, and more. Symfony is more modular, powering many other projects. WordPress is a separate world — not really a framework but the biggest PHP application by far. Other players: Yii, CodeIgniter, Phalcon, Slim (micro).",
    },
    {
      id: "error-handling",
      title: "Errors and exceptions",
      keywords: ["error", "exception", "try", "catch"],
      body: "Modern PHP treats most failures as exceptions: `try { } catch (\\PDOException $e) { } finally { }`. PHP 7 added throwable types and converted many fatal errors into catchable exceptions. Use `set_error_handler` to turn warnings/notices into exceptions in your own code. Never display raw errors in production — log them.",
    },
    {
      id: "security",
      title: "Common security concerns",
      keywords: ["security", "xss", "csrf", "injection", "sanitize"],
      body: "Top concerns: SQL injection (fix: prepared statements), XSS (fix: escape output with htmlspecialchars), CSRF (fix: CSRF tokens on forms), session hijacking (fix: HTTPS + HttpOnly + SameSite cookies), file upload abuse (validate type, store outside web root). Never trust `$_GET`/`$_POST` without validation.",
    },
    {
      id: "testing",
      title: "Testing",
      keywords: ["test", "phpunit", "pest"],
      body: "PHPUnit is the long-standing test framework. Pest is a newer, more ergonomic wrapper on top of PHPUnit. Both integrate with Composer. Laravel ships excellent test helpers for HTTP, database, and queues. Mocking uses PHPUnit's built-in facilities or Mockery.",
    },
    {
      id: "modern-php",
      title: "Modern PHP (8.x)",
      keywords: ["php 8", "modern", "jit", "attribute", "enum"],
      body: "PHP 8 is a real leap: JIT compilation, named arguments, attributes (annotations), match expressions, enums, readonly properties, first-class callable syntax (`strlen(...)`), nullsafe operator (`$obj?->method()`). If you still remember PHP 5, the language has changed dramatically — try modern PHP before writing it off.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Classic traps: loose comparison `==` (`0 == 'abc'` was true before PHP 8); array vs object confusion; mutable default args (arrays passed by value though); date timezone defaults silently wrong; `empty()` and `isset()` having subtly different semantics; floating-point equality. Enable `declare(strict_types=1)` and use `===` everywhere.",
    },
    {
      id: "where-php-shines",
      title: "Where PHP shines",
      keywords: ["use", "when", "strength", "web"],
      body: "PHP is excellent for web apps of nearly any scale when you want fast iteration and cheap hosting. Shared-nothing per-request execution makes it simple to reason about. Laravel + MySQL + queues is a fast path for CRUD apps and dashboards. WordPress dominates content sites. Major PHP apps include Slack (early), Facebook (moved to Hack), Wikipedia (MediaWiki), and Etsy.",
    },
  ],
};
