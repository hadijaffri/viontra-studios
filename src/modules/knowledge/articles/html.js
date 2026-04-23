// Knowledge article: HTML. Distilled from the Wikipedia article on HTML,
// plus extra sections of practical/modern HTML knowledge (semantic tags,
// accessibility, meta, forms deep-dive, modern APIs) that the Wikipedia
// article doesn't cover well.

export const htmlArticle = {
  id: "html",
  title: "HTML",
  keywords: ["html", "hypertext", "markup", "web", "tag", "element", "webpage", "dom", "w3c", "whatwg"],
  summary:
    "HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of a web page. CSS handles look and layout; JavaScript handles behavior.",

  sections: [
    {
      id: "overview",
      title: "What HTML is",
      keywords: ["what", "overview", "about", "definition", "summary"],
      body:
        "HTML is a markup language that web browsers use to interpret text, images, and other material and render them as visible or audible web pages. A page is a tree of elements, delineated by tags written in angle brackets like <p>…</p>. Browsers don't display tags — they read them to understand the structure. HTML is usually paired with CSS (for styling) and JavaScript (for behavior).",
    },

    {
      id: "history-creation",
      title: "Creation of HTML (1989–1991)",
      keywords: ["history", "created", "creation", "cern", "berners-lee", "tim", "1989", "1991"],
      body:
        "Tim Berners-Lee, a physicist at CERN, prototyped ENQUIRE in 1980 and proposed an internet-based hypertext system in a 1989 memo. He specified HTML and wrote the first browser and server software in late 1990. The first public description, 'HTML Tags', was published in late 1991 and listed 18 elements influenced by CERN SGML. Eleven of those tags still existed in HTML 4. Berners-Lee and CERN engineer Robert Cailliau pushed for funding, though the project was never formally adopted by CERN.",
    },

    {
      id: "history-versions",
      title: "Version history",
      keywords: ["version", "history", "timeline", "html2", "html3", "html4", "html5", "xhtml"],
      body:
        "HTML 2.0 (RFC 1866) arrived in November 1995. HTML 3.2 (1997) was the first W3C recommendation and dropped math formulas. HTML 4.0 (1997) and 4.01 (1999) introduced Strict, Transitional, and Frameset variants and began phasing out presentational tags. ISO/IEC 15445:2000 made HTML an international standard. After HTML 4.01, work shifted to the XML-based XHTML. WHATWG began HTML5 in 2004; it was standardized on 28 October 2014. Since 28 May 2019, WHATWG is the sole publisher of the HTML Living Standard.",
    },

    {
      id: "html5",
      title: "HTML5 and the Living Standard",
      keywords: ["html5", "living standard", "whatwg", "canvas", "video", "audio"],
      body:
        "HTML5 was released as a stable W3C Recommendation on 28 October 2014. It abandoned SGML, defined its own serialization, and added native <video>, <audio>, <canvas>, semantic elements, local storage, and many APIs. WHATWG maintains it as a 'Living Standard' that never 'completes' — features get added but rarely removed. The W3C now periodically publishes snapshots of the WHATWG spec as W3C Recommendations.",
    },

    {
      id: "document-structure",
      title: "Document structure and doctype",
      keywords: ["doctype", "document", "structure", "html", "head", "body", "boilerplate"],
      body:
        "Every HTML document starts with a doctype declaration, which tells browsers to render in 'standards mode' rather than 'quirks mode'. Modern HTML5 uses the short form <!DOCTYPE html>. A minimal page:\n\n<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Page title</title>\n  </head>\n  <body>\n    <p>Hello world!</p>\n  </body>\n</html>\n\n<head> holds metadata (title, meta tags, stylesheet and script links). <body> holds everything the user sees.",
    },

    {
      id: "elements-tags",
      title: "Elements, tags, and nesting",
      keywords: ["element", "tag", "nested", "opening", "closing", "void", "empty"],
      body:
        "An HTML element is usually a start tag, content, and an end tag: <p>hello</p>. The start tag can carry attributes: <a href=\"/about\">about</a>. 'Void' or 'empty' elements have no content and no end tag: <br>, <hr>, <img>, <input>, <meta>, <link>. Elements nest to form a tree — <ul> contains <li>, <table> contains <tr> which contains <td>, and so on. Many closing tags are technically optional (like </p>), but explicitly closing every element is a safer habit.",
    },

    {
      id: "attributes",
      title: "Attributes",
      keywords: ["attribute", "id", "class", "style", "title", "lang", "dir", "data"],
      body:
        "Attributes go in the start tag as name=\"value\" pairs. Common attributes present on almost every element:\n- id: a unique identifier in the document (for CSS, JS, and URL fragments like #section).\n- class: space-separated list of classes for CSS/JS targeting.\n- style: inline CSS (use sparingly).\n- title: tooltip text on hover.\n- lang: natural language of the content.\n- dir: 'ltr' or 'rtl' for text direction.\n- data-*: custom data attributes read by JavaScript via dataset.\nQuote attribute values — unquoted values are considered unsafe.",
    },

    {
      id: "headings",
      title: "Headings: h1–h6",
      keywords: ["heading", "h1", "h2", "h3", "h4", "h5", "h6", "title"],
      body:
        "Headings are defined with <h1> through <h6>, where h1 is most important and h6 is least. Use one h1 per page (usually the page title), then h2 for section titles, h3 for subsections, and so on. Don't skip levels for visual size — pick by meaning and use CSS to style. Screen readers and search engines rely on heading order to understand page structure.",
    },

    {
      id: "paragraphs-breaks",
      title: "Paragraphs and line breaks",
      keywords: ["paragraph", "p", "br", "line break"],
      body:
        "<p>text</p> marks a paragraph. <br> forces a line break without starting a new paragraph — use it for addresses or poetry, not to add vertical space (use CSS margin for that). <hr> draws a horizontal rule, used as a thematic break between sections.",
    },

    {
      id: "links",
      title: "Links with <a>",
      keywords: ["link", "anchor", "href", "hyperlink", "url", "navigation"],
      body:
        "The anchor element <a href=\"...\">text</a> creates a hyperlink. Useful attributes:\n- href: the URL (absolute, relative, or a fragment like #section).\n- target=\"_blank\": opens in a new tab. Always pair with rel=\"noopener noreferrer\" for security.\n- download: prompts a download instead of navigation.\n- rel: relationship hints (noopener, nofollow, external).\nYou can wrap an image in an anchor to make the image a link: <a href=\"...\"><img src=\"...\" alt=\"...\"></a>.",
    },

    {
      id: "images",
      title: "Images with <img>",
      keywords: ["image", "img", "src", "alt", "picture", "srcset"],
      body:
        "<img src=\"photo.jpg\" alt=\"kitten on a windowsill\"> embeds an image. alt is required — it's the text shown if the image fails and the text spoken by screen readers. Use width and height (or CSS) to reserve layout space and avoid layout shift. For responsive images, use srcset (multiple candidate files at different sizes) or the <picture> element (to swap image formats or art direction by media query).",
    },

    {
      id: "lists",
      title: "Lists: ul, ol, dl",
      keywords: ["list", "ul", "ol", "li", "dl", "dt", "dd", "bullet", "numbered"],
      body:
        "Three list types:\n- <ul> for unordered (bullet) lists, each item in <li>.\n- <ol> for ordered (numbered) lists; type, start, reversed attributes control numbering.\n- <dl> for description lists: pairs of <dt> (term) and <dd> (description).\nLists can nest to any depth.",
    },

    {
      id: "tables",
      title: "Tables",
      keywords: ["table", "tr", "td", "th", "thead", "tbody", "tfoot", "colspan", "rowspan"],
      body:
        "Use <table> for tabular data (not layout). Structure:\n<table>\n  <thead><tr><th>Name</th><th>Age</th></tr></thead>\n  <tbody>\n    <tr><td>Ada</td><td>36</td></tr>\n  </tbody>\n</table>\n<th> marks header cells (read by screen readers as headers). colspan and rowspan merge cells. <caption> right after <table> gives the table a title.",
    },

    {
      id: "forms",
      title: "Forms and inputs",
      keywords: ["form", "input", "textarea", "select", "button", "submit", "validation"],
      body:
        "A <form> collects user input and submits it — usually by sending an HTTP request to action= using method= (GET or POST). Key controls:\n- <input type=\"text|email|password|number|date|file|checkbox|radio|range|color|tel|url\">\n- <textarea> for multi-line text.\n- <select> with nested <option> for drop-downs.\n- <button type=\"submit|button|reset\">.\nUse <label for=\"inputId\"> (or wrap the input in a label) for accessibility. Built-in validation attributes: required, minlength, maxlength, pattern, min, max.",
    },

    {
      id: "semantic-tags",
      title: "Semantic HTML5 elements",
      keywords: ["semantic", "header", "nav", "main", "article", "section", "aside", "footer", "figure"],
      body:
        "HTML5 added elements that describe a region's purpose, not its appearance:\n- <header>: intro content or navigation for a section.\n- <nav>: a block of navigation links.\n- <main>: the main content of the page (one per page).\n- <article>: a self-contained piece (blog post, comment).\n- <section>: a thematic grouping.\n- <aside>: related-but-separate content (sidebars, pull-quotes).\n- <footer>: footer for a section or the page.\n- <figure>/<figcaption>: an image or diagram with a caption.\nUsing these improves accessibility, SEO, and maintainability over generic <div>s.",
    },

    {
      id: "meta-tags",
      title: "The <meta> tag",
      keywords: ["meta", "charset", "viewport", "description", "head", "seo"],
      body:
        "<meta> tags live in <head> and carry metadata. The essentials:\n- <meta charset=\"UTF-8\">: character encoding — always first in <head>.\n- <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">: required for mobile-responsive pages.\n- <meta name=\"description\" content=\"...\">: the snippet many search engines display.\n- Open Graph tags like <meta property=\"og:title\" content=\"...\">: control link previews on social platforms.",
    },

    {
      id: "character-entities",
      title: "Character entities and escaping",
      keywords: ["entity", "escape", "amp", "lt", "gt", "quot", "apos", "character reference"],
      body:
        "Five characters have special meaning in HTML and must be escaped when used as content:\n- < → &lt;\n- > → &gt;\n- & → &amp;\n- \" → &quot;\n- ' → &apos; (or &#39;)\nYou can also use numeric references: &#169; or &#xA9; for ©. Common named entities: &nbsp; (non-breaking space), &copy; (©), &reg; (®), &trade; (™). With UTF-8 you can include most characters literally without escaping.",
    },

    {
      id: "xhtml",
      title: "XHTML",
      keywords: ["xhtml", "xml", "strict", "well-formed"],
      body:
        "XHTML is an XML-based reformulation of HTML 4.01. It requires strict well-formed syntax: every tag must be closed (including <br/>), attribute values must be quoted, and tag names are lowercase. XHTML 1.0 was published in 2000. XHTML 2.0 was abandoned in 2009 in favor of HTML5. XHTML is now considered the 'XML syntax for HTML' and is no longer developed as a separate standard.",
    },

    {
      id: "delivery",
      title: "Delivery: HTTP and MIME types",
      keywords: ["http", "mime", "text/html", "server", "delivery", "email"],
      body:
        "HTML documents are usually sent by HTTP from a web server to a browser. The server also sends a Content-Type header naming the MIME type — 'text/html' for HTML, 'application/xhtml+xml' for XHTML. A document served as XHTML must be well-formed XML or the browser will refuse to render it. HTML is also used in email, though many clients support only a restricted subset.",
    },

    {
      id: "accessibility",
      title: "Accessibility (a11y) and ARIA",
      keywords: ["accessibility", "a11y", "aria", "screen reader", "alt", "role", "wcag"],
      body:
        "Semantic HTML is the foundation of accessibility. Every <img> needs an alt attribute (empty alt=\"\" if purely decorative). Every form control needs a <label>. Use real buttons and links — not styled <div>s — because they get keyboard focus and screen-reader roles for free. ARIA attributes (role, aria-label, aria-expanded, aria-hidden, aria-live) fill gaps where HTML semantics aren't enough, especially for custom widgets. The Web Content Accessibility Guidelines (WCAG) are the standard target.",
    },

    {
      id: "comments",
      title: "Comments",
      keywords: ["comment", "notes"],
      body:
        "<!-- This is a comment --> — not rendered by the browser. Comments can span multiple lines but cannot contain the sequence '--' inside. They are still sent to the client, so don't put secrets there.",
    },

    {
      id: "class-vs-id",
      title: "class vs. id — when to use which",
      keywords: ["class", "id", "selector", "css", "difference"],
      body:
        "Use id when exactly one element in the document has that name (a unique landmark like #site-header or a form-label target). Use class for any element that shares styling or behavior — multiple elements can carry the same class, and an element can have many classes: <div class=\"card featured dark\">. CSS id selectors (#) have higher specificity than class selectors (.), which is why over-using id tends to cause specificity wars.",
    },

    {
      id: "common-mistakes",
      title: "Common HTML mistakes",
      keywords: ["mistake", "gotcha", "pitfall", "bug", "wrong"],
      body:
        "Things that quietly go wrong:\n- Missing <!DOCTYPE html> — puts the browser in quirks mode.\n- Missing alt on <img> — breaks screen readers and SEO.\n- Skipping heading levels (h1 → h3 with no h2) — breaks document outline.\n- Using <div> and <span> for everything — no semantics.\n- target=\"_blank\" without rel=\"noopener\" — security risk (reverse tabnabbing).\n- Writing invalid HTML and trusting browser correction — rendering differs across browsers.\n- Inline styles and event handlers — hard to maintain; prefer external CSS/JS.",
    },
  ],
};
