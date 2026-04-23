// Classic Breakout/Brick-breaker on a canvas.

export const breakoutTemplate = {
  id: "breakout",
  name: "Breakout",
  tagline: "Paddle-and-ball brick-breaker with power-up physics.",
  intents: [/\bbreakout\b/, /\bbrick\s*break(er)?\b/, /\barkanoid\b/],
  keywords: ["breakout","brick","paddle","arcade","game"],
  render() { return CODE; },
};

const CODE = `// Breakout — move paddle with mouse or arrows. Clear the bricks.

const W=800, H=520;
const cnv = document.createElement("canvas");
cnv.width = W; cnv.height = H;
cnv.tabIndex = 0;
cnv.style.cssText = "background:#0b1220;border-radius:8px;display:block;margin:0 auto";
$root.appendChild(cnv); cnv.focus();
const ctx = cnv.getContext("2d");

const paddle = { w: 110, h: 12, x: W/2 - 55, y: H - 30, vx: 0 };
let ball = { x: W/2, y: H - 60, vx: 4, vy: -4, r: 8 };
const ROWS=5, COLS=10, BW=66, BH=22, PAD=8, TOP=40;
const COLORS = ["#f43f5e","#fb923c","#facc15","#34d399","#22d3ee"];
let bricks = [];
for (let r=0; r<ROWS; r++) for (let c=0; c<COLS; c++)
  bricks.push({ x: PAD + c*(BW+PAD) + 5, y: TOP + r*(BH+PAD), alive: true, color: COLORS[r] });
let lives = 3, won = false, lost = false, keys = {};

window.addEventListener("keydown", e => { keys[e.key] = true; if (e.key.startsWith("Arrow")) e.preventDefault(); if ((won||lost) && e.key===" ") reset(); });
window.addEventListener("keyup",   e => { keys[e.key] = false; });
cnv.addEventListener("mousemove", e => {
  const rect = cnv.getBoundingClientRect();
  paddle.x = Math.max(0, Math.min(W - paddle.w, e.clientX - rect.left - paddle.w/2));
});

function reset(){
  bricks.forEach(b => b.alive = true);
  ball = { x: W/2, y: H - 60, vx: 4, vy: -4, r: 8 };
  paddle.x = W/2 - paddle.w/2;
  lives = 3; won = false; lost = false;
}

function step(){
  if (keys["ArrowLeft"])  paddle.x -= 8;
  if (keys["ArrowRight"]) paddle.x += 8;
  paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));

  ball.x += ball.vx; ball.y += ball.vy;
  if (ball.x - ball.r < 0){ ball.x = ball.r; ball.vx = -ball.vx; }
  if (ball.x + ball.r > W){ ball.x = W - ball.r; ball.vx = -ball.vx; }
  if (ball.y - ball.r < 0){ ball.y = ball.r; ball.vy = -ball.vy; }
  if (ball.y > H + 40){
    lives--;
    if (lives <= 0) lost = true;
    else { ball.x = W/2; ball.y = H - 60; ball.vx = 4; ball.vy = -4; }
  }

  // paddle
  if (ball.y + ball.r > paddle.y && ball.y - ball.r < paddle.y + paddle.h &&
      ball.x > paddle.x && ball.x < paddle.x + paddle.w && ball.vy > 0){
    ball.vy = -Math.abs(ball.vy);
    ball.vx += ((ball.x - (paddle.x + paddle.w/2)) / (paddle.w/2)) * 3;
  }

  // bricks
  let alive = 0;
  for (const b of bricks){
    if (!b.alive) continue;
    alive++;
    if (ball.x + ball.r > b.x && ball.x - ball.r < b.x + BW &&
        ball.y + ball.r > b.y && ball.y - ball.r < b.y + BH){
      b.alive = false;
      const overlapX = Math.min(ball.x + ball.r - b.x, b.x + BW - (ball.x - ball.r));
      const overlapY = Math.min(ball.y + ball.r - b.y, b.y + BH - (ball.y - ball.r));
      if (overlapX < overlapY) ball.vx = -ball.vx; else ball.vy = -ball.vy;
    }
  }
  if (alive === 0) won = true;
}

function draw(){
  ctx.fillStyle = "#0b1220"; ctx.fillRect(0, 0, W, H);
  for (const b of bricks) if (b.alive){ ctx.fillStyle = b.color; ctx.fillRect(b.x, b.y, BW, BH); }
  ctx.fillStyle = "#22d3ee"; ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#e2e8f0"; ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
  ctx.font = "14px system-ui"; ctx.fillText("lives: " + lives, 10, 20);
  if (won || lost){
    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff"; ctx.font = "bold 32px system-ui"; ctx.textAlign = "center";
    ctx.fillText(won ? "You cleared it!" : "Game Over", W/2, H/2);
    ctx.font = "14px system-ui";
    ctx.fillText("space to restart", W/2, H/2 + 26);
    ctx.textAlign = "left";
  }
}

(function loop(){
  if (!won && !lost) step();
  draw();
  requestAnimationFrame(loop);
})();
`;
