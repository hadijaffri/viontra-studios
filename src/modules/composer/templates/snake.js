// Classic Snake game on a canvas.

export const snakeTemplate = {
  id: "snake",
  name: "Snake",
  tagline: "Classic snake game on a grid canvas with arrow-key controls.",
  intents: [/\bsnake\b/, /\bsnake\s*game\b/],
  keywords: ["snake","arcade","classic","game"],
  render() { return CODE; },
};

const CODE = `// Snake — arrow keys to steer. Eat the red square, don't hit yourself.

const CELL = 20, COLS = 30, ROWS = 22;
const W = CELL * COLS, H = CELL * ROWS;
const cnv = document.createElement("canvas");
cnv.width = W; cnv.height = H;
cnv.style.cssText = "background:#0b1220;border-radius:8px;display:block;margin:0 auto";
cnv.tabIndex = 0;
$root.appendChild(cnv);
cnv.focus();
const ctx = cnv.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let dir = { x: 1, y: 0 }, nextDir = dir;
let food = randomFood();
let alive = true, score = 0, tick = 0;

function randomFood(){
  while (true){
    const f = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) };
    if (!snake.some(s => s.x===f.x && s.y===f.y)) return f;
  }
}

function keyToDir(k){
  if (k==="ArrowUp"   || k==="w") return { x: 0, y:-1 };
  if (k==="ArrowDown" || k==="s") return { x: 0, y: 1 };
  if (k==="ArrowLeft" || k==="a") return { x:-1, y: 0 };
  if (k==="ArrowRight"|| k==="d") return { x: 1, y: 0 };
}

window.addEventListener("keydown", e => {
  const d = keyToDir(e.key);
  if (!d) return;
  e.preventDefault();
  if (d.x === -dir.x && d.y === -dir.y) return; // no 180s
  nextDir = d;
  if (!alive && e.key === " ") reset();
});

function reset(){
  snake = [{ x: 10, y: 10 }];
  dir = { x: 1, y: 0 }; nextDir = dir;
  food = randomFood();
  alive = true; score = 0;
}

function step(){
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS) { alive = false; return; }
  if (snake.some(s => s.x === head.x && s.y === head.y)) { alive = false; return; }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y){
    score++;
    food = randomFood();
  } else {
    snake.pop();
  }
}

function draw(){
  ctx.fillStyle = "#0b1220"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x*CELL+2, food.y*CELL+2, CELL-4, CELL-4);
  for (let i=0; i<snake.length; i++){
    ctx.fillStyle = i === 0 ? "#22d3ee" : "#0ea5e9";
    ctx.fillRect(snake[i].x*CELL+1, snake[i].y*CELL+1, CELL-2, CELL-2);
  }
  ctx.fillStyle = "#e2e8f0"; ctx.font = "16px system-ui";
  ctx.fillText("score: " + score, 10, 22);
  if (!alive){
    ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff"; ctx.font = "bold 36px system-ui"; ctx.textAlign = "center";
    ctx.fillText("Game Over — score " + score, W/2, H/2 - 10);
    ctx.font = "16px system-ui";
    ctx.fillText("press space to restart", W/2, H/2 + 22);
    ctx.textAlign = "left";
  }
}

(function loop(){
  tick++;
  if (alive && tick % 6 === 0) step();
  draw();
  requestAnimationFrame(loop);
})();
`;
