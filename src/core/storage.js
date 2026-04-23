// Tiny wrapper over cookies + localStorage. Use cookies for small flags we
// want to read even with storage disabled (first-visit detection); use
// localStorage for structured data.

const NS = "viontra";

// --- cookies ---------------------------------------------------------------
export function setCookie(name, value, { days = 365 } = {}) {
  const d = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${NS}.${name}=${encodeURIComponent(value)}; expires=${d}; path=/; SameSite=Lax`;
}

export function getCookie(name) {
  const pairs = document.cookie ? document.cookie.split("; ") : [];
  for (const p of pairs) {
    const [k, v] = p.split("=");
    if (k === `${NS}.${name}`) return decodeURIComponent(v || "");
  }
  return null;
}

// --- localStorage ----------------------------------------------------------
export function saveJSON(key, value) {
  try { localStorage.setItem(`${NS}.${key}`, JSON.stringify(value)); } catch {}
}

export function loadJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(`${NS}.${key}`);
    return raw == null ? fallback : JSON.parse(raw);
  } catch { return fallback; }
}

// --- first-visit detection --------------------------------------------------
// A cookie is set the first time the app boots. Callers can check `isFirstVisit()`
// to decide whether to show the tutorial.
const VISIT_COOKIE = "visited";

export function isFirstVisit() { return getCookie(VISIT_COOKIE) !== "1"; }
export function markVisited()  { setCookie(VISIT_COOKIE, "1"); }
