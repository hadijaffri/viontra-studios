// Testing role — generates a tiny assert-based test harness that runs in the
// sandbox and prints results to the console.

export const testerRole = {
  id: "tester",
  label: "Testing",

  async handle(text) {
    const code = buildTest(text);
    return {
      text: "Generated a test scaffold — runs assertions in the sandbox and reports pass/fail.",
      code,
      action: { kind: "load-editor", code },
    };
  },
};

function buildTest(prompt) {
  return [
    "// minimal test harness — runs in the sandbox",
    "const results = [];",
    "function test(name, fn) {",
    "  try { fn(); results.push({ name, ok: true }); }",
    "  catch (err) { results.push({ name, ok: false, err: String(err) }); }",
    "}",
    "function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }",
    "function eq(a, b) { assert(Object.is(a, b), `${JSON.stringify(a)} !== ${JSON.stringify(b)}`); }",
    "",
    "// --- your tests below ---",
    `test(${JSON.stringify("sanity: " + (prompt || "true is truthy"))}, () => assert(true));`,
    "test('math works', () => eq(1 + 1, 2));",
    "",
    "// --- render results ---",
    "const ul = document.createElement('ul');",
    "for (const r of results) {",
    "  const li = document.createElement('li');",
    "  li.textContent = (r.ok ? '✓ ' : '✗ ') + r.name + (r.err ? ' — ' + r.err : '');",
    "  li.style.color = r.ok ? 'green' : 'crimson';",
    "  ul.appendChild(li);",
    "}",
    "$root.appendChild(ul);",
    "console.log(results.filter(r => r.ok).length + '/' + results.length + ' passed');",
  ].join("\n");
}
