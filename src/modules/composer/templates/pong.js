// Classic Pong on a canvas.

export const pongTemplate = {
  id: "pong",
  name: "Pong",
  tagline: "Classic 2-paddle Pong with an AI opponent and a bouncing ball.",
  intents: [/\bpong\b/, /\bpaddle\s*game\b/],
  keywords: ["pong","paddle","arcade","game","classic"],
  render() { return CODE; },
};

const CODE = `// Pong — W/S (or up/down) to move your paddle. First to 7 wins.

const W=800, H=500;
const cnv = document.createElement("canvas");
cnv.width = W; cnv.height = H;
cnv.tabIndex = 0;
cnv.style.cssText = "background:#0b1220;border-radius:8px;display:block;margin:0 auto";
$root.appendChild(cnv); cnv.focus();
const ctx = cnv.getContext("2d");

const paddle = { w: 12, h: 90 };
const player = { x: 20,    y: H/2 - paddle.h/2, score: 0 };
const ai     = { x: W-32,  y: H/2 - paddle.h/2, score: 0 };
let ball = reset(1);
let keys = {};

window.addEventListener("keydown", e => { keys[e.key.toLowerCase()] = true; if (e.key.startsWith("Arrow")) e.preventDefault(); });
window.addEventListener("keyup",   e => { keys[e.key.toLowerCase()] = false; });

function reset(dir){
  return { x: W/2, y: H/2, vx: dir * 5, vy: (Math.random()*4 - 2), r: 8 };
}

function step(){
  if (keys["w"] || keys["arrowup"])   player.y -= 6;
  if (keys["s"] || keys["arrowdown"]) player.y += 6;
  player.y = Math.max(0, Math.min(H - paddle.h, player.y));

  // AI tracks the ball with a small reaction delay
  const target = ball.y - paddle.h/2;
  ai.y += (target - ai.y) * 0.08;
  ai.y = Math.max(0, Math.min(H - paddle.h, ai.y));

  ball.x += ball.vx; ball.y += ball.vy;
  if (ball.y - ball.r < 0){ ball.y = ball.r; ball.vy = -ball.vy; }
  if (ball.y + ball.r > H){ ball.y = H - ball.r; ball.vy = -ball.vy; }

  // Paddle collisions
  if (ball.x - ball.r < player.x + paddle.w && ball.y > player.y && ball.y < player.y + paddle.h && ball.vx < 0){
    ball.vx = -ball.vx * 1.05;
    ball.vy += ((ball.y - (player.y + paddle.h/2)) / (paddle.h/2)) * 3;
  }
  if (ball.x + ball.r > ai.x && ball.y > ai.y && ball.y < ai.y + paddle.h && ball.vx > 0){
    ball.vx = -ball.vx * 1.05;
    ball.vy += ((ball.y - (ai.y + paddle.h/2)) / (paddle.h/2)) * 3;
  }
  if (ball.x < 0){ ai.score++; ball = reset(1); }
  if (ball.x > W){ player.score++; ball = reset(-1); }
}

function draw(){
  ctx.fillStyle = "#0b1220"; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#334155"; ctx.setLineDash([8, 12]);
  ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#22d3ee"; ctx.fillRect(player.x, player.y, paddle.w, paddle.h);
  ctx.fillStyle = "#f43f5e"; ctx.fillRect(ai.x,     ai.y,     paddle.w, paddle.h);
  ctx.fillStyle = "#e2e8f0";
  ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
  ctx.font = "bold 40px system-ui"; ctx.textAlign = "center";
  ctx.fillText(String(player.score), W/2 - 60, 50);
  ctx.fillText(String(ai.score),     W/2 + 60, 50);
  ctx.textAlign = "left";
  const winner = player.score >= 7 ? "You win!" : ai.score >= 7 ? "AI wins!" : null;
  if (winner){
    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff"; ctx.font = "bold 36px system-ui"; ctx.textAlign = "center";
    ctx.fillText(winner, W/2, H/2);
    ctx.textAlign = "left";
  }
}

(function loop(){
  if (player.score < 7 && ai.score < 7) step();
  draw();
  requestAnimationFrame(loop);
})();
`;
