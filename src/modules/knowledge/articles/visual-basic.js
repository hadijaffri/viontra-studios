// Visual Basic reference article for the offline knowledge base.

export const visualBasicArticle = {
  id: "visual-basic",
  title: "Visual Basic",
  keywords: [
    "visual basic", "vb", "vb6", "vb.net", "microsoft", "event driven",
    "windows forms", "com", "rad", "access", "vba",
  ],
  summary:
    "Visual Basic (VB) is a family of Microsoft programming languages descended from BASIC: classic Visual Basic (1991–2008) for rapid Windows GUI development, and Visual Basic .NET (2002–present) which runs on the .NET platform. Related dialects include VBA (for Microsoft Office automation) and VBScript (used in classic ASP and Windows scripting).",
  sections: [
    {
      id: "overview",
      title: "What is Visual Basic",
      keywords: ["visual basic", "vb", "what", "language", "windows"],
      body: "Visual Basic is a Microsoft language built for fast Windows app development — you draw forms, double-click a control, and type event-handler code. 'Classic' VB (through VB6) ran on its own runtime and was the most widely used language in the 1990s. VB.NET is the modern incarnation targeting .NET, sharing the same compilation platform as C#.",
    },
    {
      id: "history-classic",
      title: "History — classic Visual Basic",
      keywords: ["history", "1991", "vb1", "vb6", "alan cooper"],
      body: "VB1 shipped in 1991 based on a drag-and-drop form designer prototype ('Ruby') Alan Cooper showed Bill Gates. VB2 (1992) added OOP-lite, VB3 (1993) added databases, VB4 (1995) added 32-bit and class modules, VB5 (1997) compiled to native code, VB6 (1998) was the peak. Microsoft ended mainstream support for VB6 in 2008.",
    },
    {
      id: "history-dotnet",
      title: "History — VB.NET",
      keywords: ["history", "vb.net", "2002", ".net", "microsoft"],
      body: "VB.NET (2002) was a ground-up rewrite on the .NET Framework, sharing the CLR with C#. It broke source compatibility with VB6 in exchange for managed code, full OOP, generics, and the full .NET BCL. VB.NET updates every few years (VB 14 in VS 2015, VB 16 aligned with C# 8). In 2020 Microsoft announced VB.NET would stop receiving new language features, though it remains supported on .NET.",
    },
    {
      id: "syntax",
      title: "Syntax basics",
      keywords: ["syntax", "dim", "sub", "end", "if", "then"],
      body: "VB reads like pseudocode: `Dim x As Integer = 5`, `If x > 0 Then Console.WriteLine(\"pos\") End If`. Statements don't need semicolons. Blocks close with `End Sub`, `End If`, `Next`, etc. Case-insensitive — `Dim` and `dim` are the same — and the editor auto-corrects capitalization to declarations.",
    },
    {
      id: "types",
      title: "Types (VB.NET)",
      keywords: ["type", "integer", "string", "double", "object"],
      body: "Core value types: `Integer` (Int32), `Long` (Int64), `Short` (Int16), `Byte`, `Single`, `Double`, `Decimal`, `Boolean`, `Char`, `Date`. `String` is a reference type. `Object` is the root type. `Nullable(Of T)` or `Integer?` allows null for value types. Arrays: `Dim xs(9) As Integer` is 10 ints.",
    },
    {
      id: "forms",
      title: "Windows Forms",
      keywords: ["form", "gui", "winforms", "event", "drag drop"],
      body: "The classic VB experience: drag controls (buttons, text boxes, grids) onto a Form, double-click to open a handler stub, write code inside. WinForms is still supported on .NET for desktop apps. The new hotness is WPF (XAML-based) and for modern/cross-platform, .NET MAUI — though VB has weaker templates here than C#.",
    },
    {
      id: "events",
      title: "Event-driven model",
      keywords: ["event", "handler", "handles", "raise"],
      body: "VB's paradigm is event-driven: the runtime dispatches UI events to handlers. In VB.NET: `Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click`. `Handles X.Y` wires the sub to the event. Custom events: `Public Event Changed(...)` / `RaiseEvent Changed(...)`.",
    },
    {
      id: "oop",
      title: "Object-oriented programming",
      keywords: ["oop", "class", "inherits", "interface"],
      body: "VB.NET is fully object-oriented: `Class Animal ... End Class`, inherit with `Inherits`, implement interfaces with `Implements`, override methods with `Overridable` / `Overrides`. Access modifiers: `Public`, `Private`, `Friend` (assembly-internal), `Protected`, `Protected Friend`. Properties have full getter/setter syntax.",
    },
    {
      id: "properties",
      title: "Properties",
      keywords: ["property", "get", "set", "auto"],
      body: "VB pioneered property syntax in mainstream OOP. Full form: `Public Property Name As String \\n Get ... End Get \\n Set(value As String) ... End Set \\n End Property`. Auto-properties: `Public Property Name As String` — backing field implicit. Read-only: `ReadOnly Property`. Cleaner on the call site than getter/setter method pairs.",
    },
    {
      id: "linq",
      title: "LINQ in VB",
      keywords: ["linq", "query", "from", "where", "select"],
      body: "VB has first-class LINQ query syntax, often prettier than C#'s. `Dim results = From c In customers Where c.City = \"NY\" Order By c.Name Select c.Name`. Lambdas: `Function(x) x * 2` for single-expression, `Function(x) \\n ... \\n End Function` for multi-statement. Works the same LINQ-to-Objects / EF Core patterns as C#.",
    },
    {
      id: "vba",
      title: "VBA — Visual Basic for Applications",
      keywords: ["vba", "macro", "excel", "word", "office"],
      body: "VBA is an embedded Visual Basic variant for automating Microsoft Office (Excel, Word, Access, Outlook, PowerPoint). It's derived from VB6 — same syntax, different host. Every Office doc can have a VBA project. Massive install base in enterprises still runs on Excel macros. Microsoft keeps supporting VBA despite pushing Office Scripts (TypeScript) as a successor.",
    },
    {
      id: "vbscript",
      title: "VBScript",
      keywords: ["vbscript", "classic asp", "wsh", "deprecated"],
      body: "VBScript is a lightweight VB subset for scripting: classic ASP pages, Windows Script Host (.vbs files), legacy IE scripting. Microsoft deprecated it for new work; Windows 11 plans to remove it from future builds. Considered legacy for almost anything new — use PowerShell or JavaScript instead.",
    },
    {
      id: "vs-csharp",
      title: "VB.NET vs C#",
      keywords: ["vs", "csharp", "comparison", "feature parity"],
      body: "Both compile to IL on .NET. Historically roughly at feature parity, though since 2020 C# has pulled ahead (records, nullable reference types, top-level programs, pattern matching). VB.NET emphasizes readability (`End If` vs `}`), has nicer XML literals, cleaner event syntax, and event-style `Handles` clauses. C# has broader tooling, templates, and community support.",
    },
    {
      id: "tooling",
      title: "Tooling",
      keywords: ["tooling", "visual studio", "ide", "msbuild"],
      body: "Visual Studio has first-class VB.NET support: IntelliSense, form designer, debugger, refactoring. MSBuild / `dotnet` CLI build VB projects the same way as C# (`dotnet new console -lang VB`). Visual Studio Code works too via the C#/VB extensions, though the form designer is VS-only.",
    },
    {
      id: "migration",
      title: "Migrating VB6 to VB.NET",
      keywords: ["migrate", "upgrade", "vb6", "wizard", "port"],
      body: "VB6 code does not run on .NET. Microsoft shipped an 'Upgrade Wizard' in early VS versions; results varied. Many enterprises kept VB6 apps running on a legacy VB6 runtime (still supported on Windows 10/11) while planning full rewrites — usually to C# + WinForms/WPF — rather than literal porting to VB.NET.",
    },
    {
      id: "status",
      title: "Current status",
      keywords: ["status", "2020", "maintenance", "future"],
      body: "In March 2020 Microsoft announced VB.NET would remain supported but no longer receive new language features — it stays at 'maintenance' parity. It still works on current .NET versions (8, 9), and Microsoft builds the BCL APIs consumable from VB. New Microsoft projects overwhelmingly start in C# or F#; VB.NET is typically chosen for continuity with existing VB codebases.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "bug", "gotcha"],
      body: "Frequent traps: case-insensitive identifiers colliding unexpectedly; `Option Strict Off` (the default) hiding type errors until runtime — always enable `Option Strict On`; `=` doing both assignment and comparison depending on context; old classic-VB habits (like `Variant`, `GoSub`) not existing on .NET; VBA-specific globals that don't exist outside Office.",
    },
    {
      id: "where-vb-shines",
      title: "Where Visual Basic shines",
      keywords: ["use", "strength", "rad", "office", "legacy"],
      body: "Visual Basic is still excellent for: rapid Windows Forms desktop apps, Office automation via VBA (the install base is enormous), and maintaining legacy VB6/VB.NET codebases at businesses where the original apps still make money. For greenfield work, most teams pick C# for better tooling and community momentum.",
    },
  ],
};
