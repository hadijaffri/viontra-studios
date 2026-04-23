// Game AI — builds mechanics and systems on top of modules/game/*.

export const gameRole = {
  id: "game",
  label: "Game AI",

  async handle(text) {
    const code = demoScene(text);
    return {
      text: "Here's a minimal playable scene (move with WASD or arrow keys). Hit Run.",
      code,
      action: { kind: "load-editor", code },
    };
  },
};

function demoScene() {
  return [
    "// Game AI demo — a player moving in a canvas, uses simple physics.",
    "const cv = document.createElement('canvas');",
    "cv.width = 480; cv.height = 300;",
    "cv.style.background = '#111'; cv.style.borderRadius = '8px';",
    "$root.appendChild(cv);",
    "const ctx = cv.getContext('2d');",
    "",
    "const keys = Object.create(null);",
    "addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);",
    "addEventListener('keyup',   e => keys[e.key.toLowerCase()] = false);",
    "",
    "const player = { x: 60, y: 60, vx: 0, vy: 0, r: 12 };",
    "const obstacles = [{ x: 200, y: 140, w: 80, h: 20 }];",
    "const SPEED = 220, FRICTION = 0.86;",
    "",
    "let last = performance.now();",
    "function tick(t){",
    "  const dt = Math.min(0.05, (t - last)/1000); last = t;",
    "  // input -> velocity",
    "  const ax = (keys.d||keys.arrowright?1:0) - (keys.a||keys.arrowleft?1:0);",
    "  const ay = (keys.s||keys.arrowdown?1:0)  - (keys.w||keys.arrowup?1:0);",
    "  player.vx = (player.vx + ax * SPEED * dt) * FRICTION;",
    "  player.vy = (player.vy + ay * SPEED * dt) * FRICTION;",
    "  player.x += player.vx * dt; player.y += player.vy * dt;",
    "  // clamp to canvas",
    "  player.x = Math.max(player.r, Math.min(cv.width  - player.r, player.x));",
    "  player.y = Math.max(player.r, Math.min(cv.height - player.r, player.y));",
    "",
    "  ctx.clearRect(0,0,cv.width,cv.height);",
    "  ctx.fillStyle = '#a06aff';",
    "  obstacles.forEach(o => ctx.fillRect(o.x,o.y,o.w,o.h));",
    "  ctx.fillStyle = '#6aa6ff';",
    "  ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI*2); ctx.fill();",
    "  requestAnimationFrame(tick);",
    "}",
    "requestAnimationFrame(tick);",
    "cv.tabIndex = 0; cv.focus();",
  ].join("\n");
}
