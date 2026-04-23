// 2D physics sim template — bouncing balls with gravity and collisions.

export const physicsSim2dTemplate = {
  id: "physics-sim-2d",
  name: "2D physics sim",
  tagline: "Bouncing balls with gravity, drag, and elastic collisions on a canvas.",
  intents: [
    /\bphysics\s*(sim|simulation|demo)\b/,
    /\bbouncing\s*balls?\b/,
    /\bgravity\s*(sim|demo)\b/,
    /\bparticle\s*(sim|system)\b/,
  ],
  keywords: ["physics","gravity","bounce","ball","particle","simulation","2d","canvas"],
  render() { return CODE; },
};

const CODE = `// 2D physics sim — bouncing balls with gravity, drag, collisions.
// Click the canvas to spawn a new ball.

const W = 800, H = 520;
const cnv = document.createElement("canvas");
cnv.width = W; cnv.height = H;
cnv.style.cssText = "background:#0f172a;border-radius:8px;display:block;margin:0 auto;cursor:crosshair";
$root.appendChild(cnv);
const ctx = cnv.getContext("2d");

const GRAV = 0.35, DRAG = 0.999, RESTITUTION = 0.85;
const balls = [];
const colors = ["#f43f5e","#22d3ee","#facc15","#a78bfa","#34d399","#fb923c"];

function spawn(x, y, vx, vy){
  const r = 10 + Math.random() * 20;
  balls.push({
    x, y, vx: vx ?? (Math.random()*6 - 3), vy: vy ?? (Math.random()*-6),
    r, m: r * r,
    color: colors[Math.floor(Math.random() * colors.length)],
  });
}
for (let i=0; i<12; i++) spawn(100 + Math.random() * (W-200), 100 + Math.random() * (H-200));

cnv.addEventListener("click", e => {
  const rect = cnv.getBoundingClientRect();
  spawn(e.clientX - rect.left, e.clientY - rect.top);
});

function resolveCollision(a, b){
  const dx = b.x - a.x, dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  if (d === 0 || d >= a.r + b.r) return;
  const overlap = a.r + b.r - d;
  const nx = dx / d, ny = dy / d;
  a.x -= nx * overlap/2; a.y -= ny * overlap/2;
  b.x += nx * overlap/2; b.y += ny * overlap/2;
  const rvx = b.vx - a.vx, rvy = b.vy - a.vy;
  const vn = rvx * nx + rvy * ny;
  if (vn > 0) return;
  const j = -(1 + RESTITUTION) * vn / (1/a.m + 1/b.m);
  const ix = j * nx, iy = j * ny;
  a.vx -= ix / a.m; a.vy -= iy / a.m;
  b.vx += ix / b.m; b.vy += iy / b.m;
}

function step(){
  for (const b of balls){
    b.vy += GRAV;
    b.vx *= DRAG; b.vy *= DRAG;
    b.x += b.vx; b.y += b.vy;
    if (b.x - b.r < 0){ b.x = b.r; b.vx = -b.vx * RESTITUTION; }
    if (b.x + b.r > W){ b.x = W - b.r; b.vx = -b.vx * RESTITUTION; }
    if (b.y - b.r < 0){ b.y = b.r; b.vy = -b.vy * RESTITUTION; }
    if (b.y + b.r > H){ b.y = H - b.r; b.vy = -b.vy * RESTITUTION; b.vx *= 0.98; }
  }
  for (let i=0; i<balls.length; i++)
    for (let j=i+1; j<balls.length; j++)
      resolveCollision(balls[i], balls[j]);
}

function draw(){
  ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, W, H);
  for (const b of balls){
    ctx.beginPath();
    ctx.fillStyle = b.color;
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "13px system-ui";
  ctx.fillText("click to spawn · " + balls.length + " balls", 12, 20);
}

(function loop(){
  step(); draw();
  requestAnimationFrame(loop);
})();
`;
