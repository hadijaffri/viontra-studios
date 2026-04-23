// Voice chat — browser-native SpeechRecognition + SpeechSynthesis.
// No external service. Degrades gracefully when APIs are missing.

export const voiceRole = {
  id: "voice",
  label: "Voice Chat",

  async handle(text) {
    const ok = typeof window !== "undefined" &&
               (window.SpeechSynthesisUtterance != null);
    if (!ok) return { text: "This browser doesn't expose the Speech API; voice chat is unavailable." };

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1; u.pitch = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return { text: `🔊 spoken: ${text}` };
  },
};

// Helper the UI can call to start listening. Returns a promise with transcript.
export function listenOnce() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return Promise.reject(new Error("SpeechRecognition not supported"));
  const rec = new SR();
  rec.interimResults = false; rec.lang = "en-US";
  return new Promise((resolve, reject) => {
    rec.onresult = e => resolve(e.results[0][0].transcript);
    rec.onerror  = e => reject(new Error(e.error));
    rec.onend    = () => {};
    rec.start();
  });
}
