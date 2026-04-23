// Scratch reference article for the offline knowledge base.

export const scratchArticle = {
  id: "scratch",
  title: "Scratch",
  keywords: [
    "scratch", "mit", "lifelong kindergarten", "block", "visual programming",
    "sprite", "stage", "event", "broadcast", "scratchjr", "snap",
  ],
  summary:
    "Scratch is a free, block-based visual programming language and online community developed by the MIT Media Lab's Lifelong Kindergarten group, designed to help kids (ages 8–16) learn to code by snapping together color-coded blocks to animate sprites, make games, and tell stories.",
  sections: [
    {
      id: "overview",
      title: "What is Scratch",
      keywords: ["scratch", "what", "visual", "block", "kids"],
      body: "Scratch is a graphical, block-based programming environment where programs are built by dragging interlocking blocks instead of typing text. It's designed for beginners — especially kids — to create interactive stories, games, and animations without wrestling syntax errors.",
    },
    {
      id: "history",
      title: "History of Scratch",
      keywords: ["history", "2007", "mit", "resnick", "lifelong kindergarten"],
      body: "Scratch was developed by the Lifelong Kindergarten group at the MIT Media Lab, led by Mitchel Resnick, and released publicly in 2007. Scratch 2.0 (2013) added cloud variables and moved editing online in Flash. Scratch 3.0 (January 2019) rebuilt the editor in JavaScript/HTML5, making it work on tablets and without Flash.",
    },
    {
      id: "philosophy",
      title: "Design philosophy",
      keywords: ["philosophy", "low floor", "high ceiling", "wide walls"],
      body: "Scratch is built on Seymour Papert's ideas and Resnick's goals: 'low floor' (easy to start), 'high ceiling' (advanced projects are possible), 'wide walls' (many different kinds of projects). The focus is on creative expression and tinkering, not programming fluency as an end in itself.",
    },
    {
      id: "editor",
      title: "The Scratch editor",
      keywords: ["editor", "stage", "sprite", "block palette"],
      body: "The editor has four main areas: a stage (top right) where projects run; a sprite list (bottom right) for actors and their costumes; a block palette (left) grouped into categories (Motion, Looks, Sound, Events, Control, Sensing, Operators, Variables, My Blocks, extensions); and a script area where you snap blocks together.",
    },
    {
      id: "blocks",
      title: "Block categories",
      keywords: ["block", "category", "motion", "looks", "control"],
      body: "Blocks are shape-coded: hat blocks (rounded top) start scripts on an event; stack blocks (rectangular with notches) execute actions; boolean blocks (hexagonal) return true/false; reporter blocks (rounded) return a value; C-blocks wrap other blocks (loops, if); cap blocks end a script. Shape prevents illegal combinations.",
    },
    {
      id: "sprites",
      title: "Sprites and costumes",
      keywords: ["sprite", "costume", "actor", "backdrop"],
      body: "A sprite is a programmable character with one or more costumes (images). Switching costumes is the main animation technique. The stage has backdrops (full-screen images) and can also run scripts. Sprites are drawn in the built-in bitmap or vector editor, or imported from the library.",
    },
    {
      id: "events",
      title: "Events and broadcasts",
      keywords: ["event", "when", "flag", "broadcast", "message"],
      body: "Scripts start from hat blocks like 'when green flag clicked,' 'when key pressed,' 'when this sprite clicked.' Sprites coordinate by broadcasting messages: one script 'broadcast Level2,' and any sprite with a 'when I receive Level2' hat runs. Broadcasts are Scratch's inter-sprite event bus.",
    },
    {
      id: "variables",
      title: "Variables and lists",
      keywords: ["variable", "list", "cloud", "data"],
      body: "Variables can be for all sprites (global) or for one sprite (local). Lists are ordered collections you can add/remove items from. Cloud variables (prefixed with ☁) persist on Scratch's servers and are shared across everyone viewing the project — but only numeric values, to limit abuse.",
    },
    {
      id: "control",
      title: "Control and loops",
      keywords: ["control", "forever", "repeat", "if", "wait"],
      body: "Control blocks include `forever`, `repeat N`, `repeat until`, `if then`, `if then else`, `wait N seconds`, `stop all`. Scratch uses a single-threaded cooperative model per sprite — long-running blocks yield each frame, so `forever` loops don't freeze the stage.",
    },
    {
      id: "my-blocks",
      title: "My Blocks (custom blocks)",
      keywords: ["custom", "my blocks", "procedure", "function"],
      body: "'My Blocks' let you define your own reusable block with parameters — like defining a function. A 'run without screen refresh' option executes the whole block in one frame, useful for heavy math that shouldn't visibly pause. It's how Scratchers build reusable abstractions.",
    },
    {
      id: "extensions",
      title: "Extensions",
      keywords: ["extension", "pen", "music", "translate", "micro:bit"],
      body: "Scratch 3.0 introduced extensions: Pen (draw trails), Music, Video sensing, Text-to-Speech, Translate, plus hardware (micro:bit, LEGO WeDo/Mindstorms/Spike, Makey Makey) and TurboWarp / forks adding even more. Extensions appear as their own block category when added.",
    },
    {
      id: "community",
      title: "The Scratch community",
      keywords: ["community", "share", "remix", "studio"],
      body: "Projects are shared on scratch.mit.edu, where anyone can play, comment, 'love,' favorite, and — crucially — remix (fork) them. Remixing is central to Scratch culture: you take someone's project, change it, and publish the result with automatic attribution. Studios group related projects.",
    },
    {
      id: "turbowarp",
      title: "TurboWarp and forks",
      keywords: ["turbowarp", "fork", "compiler", "performance"],
      body: "TurboWarp is a popular third-party Scratch project runner that compiles projects to JavaScript for huge speedups, and offers advanced features like unlimited fps and custom stage sizes. Forks like PenguinMod add blocks and features Scratch itself keeps out for simplicity. Official Scratch is deliberately feature-conservative.",
    },
    {
      id: "scratchjr",
      title: "ScratchJr",
      keywords: ["scratchjr", "junior", "5", "7", "ipad"],
      body: "ScratchJr, released in 2014, is a simpler iOS/Android app for ages 5–7 based on Scratch ideas — horizontal block-snapping, picture-based blocks (no reading required), fewer features. It's made by the Lifelong Kindergarten group plus DevTech at Tufts. Separate product, same lineage.",
    },
    {
      id: "snap",
      title: "Snap! and other descendants",
      keywords: ["snap", "byob", "berkeley", "first class"],
      body: "Snap! (formerly BYOB — Build Your Own Blocks) is a Scratch-inspired language from UC Berkeley that adds first-class functions, lists, and continuations — bringing real CS concepts into a block environment. Other descendants: Pyonkee (iPad port), Catrobat (mobile), MIT App Inventor (Android apps via blocks).",
    },
    {
      id: "pedagogy",
      title: "Using Scratch to teach",
      keywords: ["teach", "education", "csed", "classroom"],
      body: "Scratch is the most widely used introductory programming environment in schools worldwide. It's used to teach CS concepts, computational thinking, math, art, and cross-curricular projects. The free ScratchEd resources and Teacher Accounts provide classroom tools. It's often the on-ramp to text languages like Python or JavaScript.",
    },
    {
      id: "limitations",
      title: "Limitations and trade-offs",
      keywords: ["limitation", "limit", "trade off", "performance"],
      body: "Scratch deliberately omits features that would make it closer to a real general-purpose language: no file I/O, no networking (except cloud vars), limited math (e.g., no bitwise ops by default), no real multithreading. These keep it safe and simple but mean serious projects migrate to TurboWarp forks or rewrite in JS/Python.",
    },
    {
      id: "under-the-hood",
      title: "Under the hood",
      keywords: ["vm", "javascript", "blockly", "internals"],
      body: "Scratch 3.0's core is open-source: `scratch-gui` (the React UI), `scratch-blocks` (a fork of Google's Blockly for the block editor), `scratch-vm` (the JavaScript runtime that executes projects), `scratch-render` (WebGL stage rendering), `scratch-audio` (sound). All on GitHub under @LLK / @scratchfoundation.",
    },
    {
      id: "pitfalls",
      title: "Common pitfalls",
      keywords: ["pitfall", "mistake", "beginner", "bug"],
      body: "Frequent traps: race conditions between broadcasts (scripts run 'when I receive X' in undefined order); forgetting that `forever` loops run forever (infinite loop warnings rare); using global vars for per-sprite state; the 'stack drop' where blocks visually detach; not using `run without screen refresh` for heavy custom blocks; performance collapsing once you clone hundreds of sprites.",
    },
    {
      id: "where-scratch-shines",
      title: "Where Scratch shines",
      keywords: ["use", "strength", "kids", "games", "stories"],
      body: "Scratch is unmatched for: a first programming experience, quick interactive storytelling, classroom creative coding, remixing other projects as a learning technique, and simple 2D games. The combination of 'no syntax errors' + 'press green flag to run' + 'millions of shared projects to learn from' is uniquely approachable.",
    },
  ],
};
