// SQL reference article for the offline knowledge base.

export const sqlArticle = {
  id: "sql",
  title: "SQL",
  keywords: [
    "sql", "query", "database", "rdbms", "relational", "select", "join",
    "insert", "update", "delete", "table", "schema", "index", "transaction",
    "acid", "postgres", "mysql", "sqlite", "mssql", "oracle",
  ],
  summary:
    "SQL (Structured Query Language) is a domain-specific language for managing and querying data held in relational databases.",
  sections: [
    {
      id: "overview",
      title: "What is SQL",
      keywords: ["sql", "what", "language", "relational", "database"],
      body: "SQL is a standardized language for interacting with relational databases. It lets you define data (DDL), manipulate it (DML), query it (DQL), and control access (DCL). Most database engines — PostgreSQL, MySQL, SQLite, SQL Server, Oracle — implement SQL with their own dialect extensions.",
    },
    {
      id: "history",
      title: "History of SQL",
      keywords: ["history", "origin", "chamberlin", "boyce", "ibm", "system r", "1970"],
      body: "SQL was developed at IBM by Donald Chamberlin and Raymond Boyce in the early 1970s, originally called SEQUEL. It was built to query IBM's System R, the first implementation of Edgar F. Codd's relational model (1970). Oracle shipped the first commercial SQL database in 1979, and it became an ANSI standard in 1986.",
    },
    {
      id: "standards",
      title: "SQL standards",
      keywords: ["standard", "ansi", "iso", "sql-92", "sql-99", "sql-2003"],
      body: "SQL has gone through many standard revisions: SQL-86, SQL-92, SQL:1999 (recursive queries, triggers), SQL:2003 (XML, window functions), SQL:2008, SQL:2016 (JSON, row pattern matching). In practice, every database vendor extends the standard, so writing portable SQL requires sticking to a common subset.",
    },
    {
      id: "ddl",
      title: "DDL — Data Definition Language",
      keywords: ["ddl", "create", "alter", "drop", "truncate", "schema"],
      body: "DDL statements define database structure. CREATE TABLE builds a table, ALTER TABLE modifies it, DROP TABLE removes it, and TRUNCATE empties it quickly without logging each row. CREATE INDEX, CREATE VIEW, and CREATE SCHEMA also belong here.",
    },
    {
      id: "dml",
      title: "DML — Data Manipulation Language",
      keywords: ["dml", "insert", "update", "delete", "merge"],
      body: "DML statements change data inside tables: INSERT adds rows, UPDATE modifies existing rows, DELETE removes them, and MERGE (or UPSERT) inserts or updates depending on whether a row already matches.",
    },
    {
      id: "dql",
      title: "DQL — querying with SELECT",
      keywords: ["dql", "select", "from", "query"],
      body: "SELECT is the core read statement. A full SELECT has clauses: SELECT (columns), FROM (tables), WHERE (row filter), GROUP BY (grouping), HAVING (group filter), ORDER BY (sort), LIMIT (row cap). The engine processes them in a specific order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.",
    },
    {
      id: "dcl",
      title: "DCL — access control",
      keywords: ["dcl", "grant", "revoke", "permission", "role"],
      body: "DCL covers GRANT and REVOKE, which assign or remove privileges (SELECT, INSERT, UPDATE, DELETE, EXECUTE) on objects for users or roles.",
    },
    {
      id: "select-basics",
      title: "SELECT basics (practical)",
      keywords: ["select", "basic", "where", "example", "query"],
      body: "A simple query: `SELECT id, name FROM users WHERE active = true ORDER BY name LIMIT 20;`. Always list columns explicitly rather than `SELECT *` in production code — it prevents surprises when schemas evolve and it's faster when you don't need every column.",
    },
    {
      id: "joins",
      title: "JOINs",
      keywords: ["join", "inner", "left", "right", "outer", "cross"],
      body: "JOIN combines rows from multiple tables. INNER JOIN keeps only matching rows. LEFT JOIN keeps every row from the left table, NULL-filling unmatched right side. RIGHT JOIN is the mirror. FULL OUTER JOIN keeps unmatched rows from both sides. CROSS JOIN is the cartesian product. Always specify the join condition with ON.",
    },
    {
      id: "where",
      title: "WHERE clause",
      keywords: ["where", "filter", "condition", "and", "or", "in", "like"],
      body: "WHERE filters rows before grouping. Operators: `=, <>, <, <=, >, >=, BETWEEN, IN (...), LIKE 'a%', IS NULL, IS NOT NULL`. Combine with AND/OR, and use parentheses to make precedence explicit. NULL comparisons use IS, not =.",
    },
    {
      id: "group-by",
      title: "GROUP BY and HAVING",
      keywords: ["group", "group by", "aggregate", "having", "sum", "count"],
      body: "GROUP BY collapses rows that share column values into one row per group. Aggregate functions (COUNT, SUM, AVG, MIN, MAX) then operate per group. HAVING filters groups after aggregation — use WHERE for row filters, HAVING for aggregate filters.",
    },
    {
      id: "aggregates",
      title: "Aggregate functions",
      keywords: ["aggregate", "count", "sum", "avg", "min", "max"],
      body: "COUNT(*) counts rows; COUNT(col) counts non-NULL values. SUM, AVG, MIN, MAX operate on numeric columns. STRING_AGG / GROUP_CONCAT joins text per group. All ignore NULLs except COUNT(*).",
    },
    {
      id: "subqueries",
      title: "Subqueries",
      keywords: ["subquery", "nested", "exists", "in", "scalar"],
      body: "A subquery is a SELECT inside another statement. Scalar subqueries return one value. IN/NOT IN and EXISTS/NOT EXISTS test row membership. Correlated subqueries reference the outer query's rows — readable but usually slower than an equivalent JOIN.",
    },
    {
      id: "cte",
      title: "CTEs and window functions",
      keywords: ["cte", "with", "window", "partition", "row_number", "rank"],
      body: "WITH ... AS (...) defines a CTE (common table expression) — a named, reusable subquery. Recursive CTEs handle hierarchies. Window functions (ROW_NUMBER, RANK, LAG, LEAD, running totals) compute across rows related to the current one via OVER (PARTITION BY ... ORDER BY ...) — powerful for analytics without collapsing rows.",
    },
    {
      id: "transactions",
      title: "Transactions and ACID",
      keywords: ["transaction", "acid", "commit", "rollback", "isolation"],
      body: "A transaction is a group of statements that succeed or fail together: BEGIN, work, COMMIT (persist) or ROLLBACK (discard). ACID stands for Atomicity, Consistency, Isolation, Durability. Isolation levels (READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE) trade off concurrency vs anomalies like dirty reads and phantom reads.",
    },
    {
      id: "indexes",
      title: "Indexes",
      keywords: ["index", "btree", "hash", "performance", "primary key"],
      body: "An index is a data structure (usually a B-tree) that speeds up WHERE, JOIN, and ORDER BY on indexed columns. Every write must update every index, so more indexes = slower writes. Composite indexes must match the leading column order in queries. PRIMARY KEY creates a unique clustered index on most engines.",
    },
    {
      id: "constraints",
      title: "Constraints",
      keywords: ["constraint", "primary key", "foreign key", "unique", "check", "not null"],
      body: "Constraints enforce data integrity at the schema level: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY (references another table), CHECK (arbitrary condition), DEFAULT (value when none given). The engine rejects writes that violate them.",
    },
    {
      id: "null",
      title: "NULL semantics",
      keywords: ["null", "unknown", "is null", "coalesce"],
      body: "NULL means 'unknown,' not 'empty.' Any comparison with NULL yields NULL (treated as false). Use IS NULL / IS NOT NULL, never = NULL. COALESCE(a, b, c) returns the first non-NULL argument. NULL + number = NULL; string concatenation with NULL often yields NULL (depends on engine).",
    },
    {
      id: "data-types",
      title: "Common data types",
      keywords: ["data type", "integer", "varchar", "text", "timestamp", "json"],
      body: "Core types: INTEGER/BIGINT, DECIMAL/NUMERIC (exact), REAL/DOUBLE (floating), VARCHAR(n)/TEXT, BOOLEAN, DATE, TIME, TIMESTAMP, UUID, JSON/JSONB. Prefer DECIMAL for money, TIMESTAMP WITH TIME ZONE for absolute time, and native JSON types over stringly-encoded JSON.",
    },
    {
      id: "vendor-differences",
      title: "Vendor differences",
      keywords: ["postgres", "mysql", "sqlite", "mssql", "oracle", "dialect"],
      body: "Postgres has the most complete standard support plus rich types (arrays, JSONB, ranges). MySQL is ubiquitous and fast, but historically looser with data validation. SQLite is embedded and serverless. SQL Server and Oracle have their own procedural dialects (T-SQL, PL/SQL). Identifier quoting, LIMIT vs TOP, and auto-increment syntax all differ.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "n+1", "bug", "gotcha"],
      body: "Frequent SQL bugs: SELECT * causing broken app code after schema changes; LEFT JOIN + WHERE on the right table (converts to INNER JOIN silently); GROUP BY missing non-aggregated columns; comparing to NULL with =; implicit type coercion hiding logic errors; and the N+1 query pattern in ORMs. Always inspect with EXPLAIN/EXPLAIN ANALYZE on real data.",
    },
    {
      id: "injection",
      title: "SQL injection and security",
      keywords: ["injection", "security", "parameter", "prepared statement", "sanitize"],
      body: "SQL injection happens when user input is concatenated into a query string, letting attackers append `; DROP TABLE users; --` or extract data. The fix is parameterized queries / prepared statements — the driver sends the query and values separately, so values can never be parsed as SQL. Never build queries via string concatenation, and grant the app role only the privileges it actually needs.",
    },
  ],
};
