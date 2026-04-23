// Classic Tetris on a canvas.

export const tetrisTemplate = {
  id: "tetris",
  name: "Tetris",
  tagline: "Classic falling-block puzzle with 7 tetrominoes and line clears.",
  intents: [/\btetris\b/, /\bfalling\s*block(s)?\b/, /\btetromino\b/],
  keywords: ["tetris","puzzle","blocks","game","arcade"],
  render() { return CODE; },
};

const CODE = `// Tetris — left/right to move, up to rotate, down to soft drop, space to hard drop.

const COLS=10, ROWS=20, CELL=28;
const cnv = document.createElement("canvas");
cnv.width = COLS*CELL + 120; cnv.height = ROWS*CELL;
cnv.tabIndex = 0;
cnv.style.cssText = "background:#0b1220;border-radius:8px;display:block;margin:0 auto";
$root.appendChild(cnv);
cnv.focus();
const ctx = cnv.getContext("2d");

const SHAPES = {
  I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
  O: [[1,1],[1,1]],
  T: [[0,1,0],[1,1,1],[0,0,0]],
  S: [[0,1,1],[1,1,0],[0,0,0]],
  Z: [[1,1,0],[0,1,1],[0,0,0]],
  J: [[1,0,0],[1,1,1],[0,0,0]],
  L: [[0,0,1],[1,1,1],[0,0,0]],
};
const COLORS = { I:"#22d3ee", O:"#facc15", T:"#c084fc", S:"#34d399", Z:"#f87171", J:"#60a5fa", L:"#fb923c" };
const KEYS = Object.keys(SHAPES);

let grid = Array.from({length: ROWS}, () => Array(COLS).fill(null));
let piece = spawn(), score = 0, lines = 0, dropTick = 0, gameOver = false;

function spawn(){
  const k = KEYS[Math.floor(Math.random() * KEYS.length)];
  return { shape: SHAPES[k].map(r => r.slice()), key: k, x: Math.floor((COLS - SHAPES[k][0].length)/2), y: 0 };
}

function collide(p, nx, ny, shape){
  shape = shape || p.shape;
  for (let y=0; y<shape.length; y++)
    for (let x=0; x<shape[y].length; x++){
      if (!shape[y][x]) continue;
      const gx = nx + x, gy = ny + y;
      if (gx<0 || gx>=COLS || gy>=ROWS) return true;
      if (gy>=0 && grid[gy][gx]) return true;
    }
  return false;
}

function merge(){
  for (let y=0; y<piece.shape.length; y++)
    for (let x=0; x<piece.shape[y].length; x++)
      if (piece.shape[y][x]){
        const gy = piece.y + y, gx = piece.x + x;
        if (gy < 0) { gameOver = true; return; }
        grid[gy][gx] = piece.key;
      }
}

function clearLines(){
  let cleared = 0;
  for (let y=ROWS-1; y>=0; y--){
    if (grid[y].every(c => c)){
      grid.splice(y, 1); grid.unshift(Array(COLS).fill(null));
      cleared++; y++;
    }
  }
  if (cleared){ lines += cleared; score += [0,100,300,500,800][cleared]; }
}

function rotate(m){
  const n = m.length;
  const r = Array.from({length: n}, () => Array(n).fill(0));
  for (let y=0; y<n; y++) for (let x=0; x<n; x++) r[x][n-1-y] = m[y][x];
  return r;
}

window.addEventListener("keydown", e => {
  if (gameOver){ if (e.key === " ") reset(); return; }
  if (e.key === "ArrowLeft"  && !collide(piece, piece.x-1, piece.y)) piece.x--;
  if (e.key === "ArrowRight" && !collide(piece, piece.x+1, piece.y)) piece.x++;
  if (e.key === "ArrowDown"  && !collide(piece, piece.x, piece.y+1)) piece.y++;
  if (e.key === "ArrowUp"){
    const r = rotate(piece.shape);
    if (!collide(piece, piece.x, piece.y, r)) piece.shape = r;
  }
  if (e.key === " "){
    while (!collide(piece, piece.x, piece.y+1)) piece.y++;
    merge(); clearLines(); piece = spawn();
    if (collide(piece, piece.x, piece.y)) gameOver = true;
  }
  e.preventDefault();
});

function reset(){
  grid = Array.from({length: ROWS}, () => Array(COLS).fill(null));
  piece = spawn(); score=0; lines=0; gameOver=false;
}

function draw(){
  ctx.fillStyle = "#0b1220"; ctx.fillRect(0, 0, cnv.width, cnv.height);
  // play field
  for (let y=0; y<ROWS; y++)
    for (let x=0; x<COLS; x++){
      ctx.fillStyle = grid[y][x] ? COLORS[grid[y][x]] : "#1e293b";
      ctx.fillRect(x*CELL+1, y*CELL+1, CELL-2, CELL-2);
    }
  // current piece
  ctx.fillStyle = COLORS[piece.key];
  for (let y=0; y<piece.shape.length; y++)
    for (let x=0; x<piece.shape[y].length; x++)
      if (piece.shape[y][x])
        ctx.fillRect((piece.x+x)*CELL+1, (piece.y+y)*CELL+1, CELL-2, CELL-2);
  // sidebar
  ctx.fillStyle = "#e2e8f0"; ctx.font = "16px system-ui";
  ctx.fillText("score", COLS*CELL + 16, 22);
  ctx.fillText(String(score), COLS*CELL + 16, 44);
  ctx.fillText("lines", COLS*CELL + 16, 80);
  ctx.fillText(String(lines), COLS*CELL + 16, 102);
  if (gameOver){
    ctx.fillStyle = "rgba(0,0,0,.7)"; ctx.fillRect(0, 0, COLS*CELL, ROWS*CELL);
    ctx.fillStyle = "#fff"; ctx.font = "bold 30px system-ui"; ctx.textAlign = "center";
    ctx.fillText("Game Over", COLS*CELL/2, ROWS*CELL/2 - 8);
    ctx.font = "14px system-ui";
    ctx.fillText("space to restart", COLS*CELL/2, ROWS*CELL/2 + 18);
    ctx.textAlign = "left";
  }
}

(function loop(){
  dropTick++;
  if (!gameOver && dropTick % 30 === 0){
    if (!collide(piece, piece.x, piece.y+1)) piece.y++;
    else { merge(); clearLines(); piece = spawn(); if (collide(piece, piece.x, piece.y)) gameOver = true; }
  }
  draw();
  requestAnimationFrame(loop);
})();
`;
