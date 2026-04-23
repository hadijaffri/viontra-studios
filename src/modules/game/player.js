// Player movement — small controller you can drop into any scene.

export function createPlayer({ x = 0, y = 0, w = 24, h = 24, speed = 220 } = {}) {
  return { x, y, w, h, vx: 0, vy: 0, speed, tags: new Set(["player"]) };
}

export function applyInput(player, keys, dt) {
  const k = (...names) => names.some(n => keys[n]);
  const ax = (k("d","arrowright") ? 1 : 0) - (k("a","arrowleft") ? 1 : 0);
  const ay = (k("s","arrowdown")  ? 1 : 0) - (k("w","arrowup")   ? 1 : 0);
  player.vx += ax * player.speed * dt;
  player.vy += ay * player.speed * dt;
  return player;
}

export function bindKeyboard(target = window) {
  const keys = Object.create(null);
  const down = e => { keys[e.key.toLowerCase()] = true; };
  const up   = e => { keys[e.key.toLowerCase()] = false; };
  target.addEventListener("keydown", down);
  target.addEventListener("keyup",   up);
  return { keys, dispose() { target.removeEventListener("keydown", down); target.removeEventListener("keyup", up); } };
}
