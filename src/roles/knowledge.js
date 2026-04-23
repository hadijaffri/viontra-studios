// Knowledge role — answers "what is X", "explain X", etc. by looking up
// the best-matching section in the knowledge base and quoting it. No real
// "understanding" — weighted keyword search over a curated corpus.

import { knowledgeBase } from "../modules/knowledge/knowledge.js";

export const knowledgeRole = {
  id: "knowledge",
  label: "Knowledge",

  async handle(text) {
    const hits = knowledgeBase.search(text, { limit: 3 });

    if (!hits.length) {
      const topics = knowledgeBase.list().map(a => a.title).join(", ") || "(none loaded)";
      return {
        text:
          `I don't have an article that matches that. ` +
          `Loaded articles: ${topics}.`,
      };
    }

    const best = hits[0];
    const body = best.section.body;
    const cite = `${best.article.title} › ${best.section.title}`;
    const related = hits.slice(1).map(h => `${h.article.title} › ${h.section.title}`);

    return {
      text: `${body}\n\nSource: ${cite}`,
      citation: cite,
      related,
    };
  },
};
