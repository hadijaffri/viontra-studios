// Extended thinking — returns the reasoning trace alongside the final answer.
// Offline stub: produces a deterministic step list from the prompt.

export const thinkingRole = {
  id: "thinking",
  label: "Extended Thinking",

  async handle(text) {
    const steps = [
      `Understand the request: "${text}".`,
      "Identify the key constraints (inputs, outputs, edge cases).",
      "Consider the simplest approach first — is it enough?",
      "If not, pick one abstraction that removes duplication without over-engineering.",
      "Draft a single clean version, then review it against the constraints.",
    ];
    const answer = `Best path: ${summarize(text)}`;
    return {
      text: answer,
      thinking: steps,
    };
  },
};

function summarize(t) {
  if (!t) return "clarify what you're trying to accomplish before writing code.";
  return t.length < 60 ? `treat "${t}" as a spike — prototype, then refactor.`
                       : "break the task into two halves and solve the data flow first.";
}
