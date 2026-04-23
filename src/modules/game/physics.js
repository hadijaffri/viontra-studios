// Simple axis-aligned physics helpers — reusable by any Game AI scene.
// Pure functions, no DOM, no globals. Safe to import from the sandbox.

export function step(body, dt, { friction = 0.9, gravity = 0 } = {}) {
  body.vy += gravity * dt;
  body.vx *= friction;
  body.vy *= friction;
  body.x += body.vx * dt;
  body.y += body.vy * dt;
  return body;
}

export function aabb(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}

export function clamp(body, bounds) {
  if (body.x < bounds.x) { body.x = bounds.x; body.vx = 0; }
  if (body.y < bounds.y) { body.y = bounds.y; body.vy = 0; }
  if (body.x + body.w > bounds.x + bounds.w) { body.x = bounds.x + bounds.w - body.w; body.vx = 0; }
  if (body.y + body.h > bounds.y + bounds.h) { body.y = bounds.y + bounds.h - body.h; body.vy = 0; }
  return body;
}
