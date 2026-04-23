// Knowledge base — article storage + keyword search.
// Articles are structured into sections so the AI can quote the one that
// best matches a question. Not "understanding" — it's weighted keyword
// retrieval. Good enough to answer "what is X" style questions from the
// curated corpus. Add more articles with addArticle().

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","of","to","in",
  "on","for","and","or","but","with","about","what","who","how","why","when",
  "where","which","that","this","these","those","it","its","do","does","did",
  "can","could","should","would","me","my","you","your","i","we","our","us",
  "tell","explain","describe","show","give","please",
]);

function tokenize(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .split(/\s+/)
    .filter(w => w && !STOPWORDS.has(w) && w.length > 1);
}

export class KnowledgeBase {
  constructor() {
    this.articles = new Map(); // id -> article
  }

  addArticle(article) {
    if (!article?.id) throw new Error("article needs an id");
    this.articles.set(article.id, article);
  }

  list() {
    return [...this.articles.values()].map(a => ({ id: a.id, title: a.title }));
  }

  // Score every section across every article; return the top N.
  search(query, { limit = 3 } = {}) {
    const tokens = tokenize(query);
    if (!tokens.length) return [];

    const hits = [];
    for (const article of this.articles.values()) {
      const aKeys = new Set((article.keywords || []).map(k => k.toLowerCase()));
      for (const section of article.sections || []) {
        const score = scoreSection(tokens, section, article, aKeys);
        if (score > 0) {
          hits.push({ score, article, section });
        }
      }
    }
    hits.sort((a, b) => b.score - a.score);
    return hits.slice(0, limit);
  }
}

function scoreSection(tokens, section, article, articleKeys) {
  const sKeys = new Set((section.keywords || []).map(k => k.toLowerCase()));
  const titleTokens = new Set(tokenize(section.title));
  const articleTitleTokens = new Set(tokenize(article.title));
  const bodyLower = String(section.body || "").toLowerCase();

  let score = 0;
  for (const t of tokens) {
    if (sKeys.has(t))            score += 5;
    if (articleKeys.has(t))      score += 3;
    if (titleTokens.has(t))      score += 3;
    if (articleTitleTokens.has(t)) score += 2;
    // Body match — count occurrences, cap so long bodies don't dominate.
    const occurrences = countOccurrences(bodyLower, t);
    if (occurrences > 0) score += Math.min(occurrences, 4);
  }
  return score;
}

function countOccurrences(haystack, needle) {
  if (!needle) return 0;
  let count = 0, i = 0;
  while ((i = haystack.indexOf(needle, i)) !== -1) { count++; i += needle.length; }
  return count;
}

export const knowledgeBase = new KnowledgeBase();
