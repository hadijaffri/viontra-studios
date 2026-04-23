// 2D platformer with gravity, jumping, and tile-based level.

export const platformer2dTemplate = {
  id: "platformer-2d",
  name: "2D platformer",
  tagline: "Side-scrolling platformer with gravity, jumping, and a tile level.",
  intents: [/\bplatformer\b/, /\bside\s*scroller\b/, /\bmario(-like)?\b/, /\bjump\s+and\s+run\b/],
  keywords: ["platformer","jump","scroller","mario","game","2d"],
  render() { return CODE; },
};

const CODE = `// 2D platformer — arrow keys / WASD to move, space to jump.

const W=800, H=480, TILE=32;
const cnv = document.createElement("canvas");
cnv.width=W; cnv.height=H; cnv.tabIndex=0;
cnv.style.cssText="background:#60a5fa;border-radius:8px;display:block;margin:0 auto";
$root.appendChild(cnv); cnv.focus();
const ctx = cnv.getContext("2d");

const LEVEL = [
  "                                                         ",
  "                                                         ",
  "                         ====                            ",
  "                                                         ",
  "              ===                                        ",
  "                                         ==              ",
  "                                                         ",
  "      ===                                                ",
  "                     ==========          =====          =",
  "                                                         ",
  "==========     ============     =========       ========",
  "==========     ============     =========       ========",
  "==========     ============     =========       ========",
  "==========     ============     =========       ========",
  "==========     ============     =========       ========",
].map(r => r.split(""));
const LW = LEVEL[0].length, LH = LEVEL.length;

const player = { x: 50, y: 300, w: 24, h: 32, vx: 0, vy: 0, onGround: false };
const keys = {};
window.addEventListener("keydown", e => { keys[e.key.toLowerCase()] = true; if (e.key === " ") e.preventDefault(); });
window.addEventListener("keyup",   e => { keys[e.key.toLowerCase()] = false; });

let camX = 0;

function solid(tx, ty){
  if (tx<0 || ty<0 || tx>=LW || ty>=LH) return tx<0 || ty>=LH;
  return LEVEL[ty][tx] === "=";
}

function step(){
  const ax = (keys["arrowright"] || keys["d"] ? 1 : 0) - (keys["arrowleft"] || keys["a"] ? 1 : 0);
  player.vx = ax * 4;
  if ((keys[" "] || keys["arrowup"] || keys["w"]) && player.onGround){ player.vy = -10; player.onGround = false; }
  player.vy += 0.5; if (player.vy > 12) player.vy = 12;

  // X
  player.x += player.vx;
  const tlX = Math.floor(player.x / TILE), trX = Math.floor((player.x + player.w - 1) / TILE);
  const tT  = Math.floor(player.y / TILE), tB  = Math.floor((player.y + player.h - 1) / TILE);
  if (player.vx > 0 && (solid(trX, tT) || solid(trX, tB))) player.x = trX * TILE - player.w;
  if (player.vx < 0 && (solid(tlX, tT) || solid(tlX, tB))) player.x = (tlX + 1) * TILE;

  // Y
  player.y += player.vy;
  const tlX2 = Math.floor(player.x / TILE), trX2 = Math.floor((player.x + player.w - 1) / TILE);
  const tT2  = Math.floor(player.y / TILE), tB2  = Math.floor((player.y + player.h - 1) / TILE);
  player.onGround = false;
  if (player.vy > 0 && (solid(tlX2, tB2) || solid(trX2, tB2))){ player.y = tB2 * TILE - player.h; player.vy = 0; player.onGround = true; }
  if (player.vy < 0 && (solid(tlX2, tT2) || solid(trX2, tT2))){ player.y = (tT2 + 1) * TILE; player.vy = 0; }

  if (player.y > LH * TILE + 100){ player.x = 50; player.y = 300; player.vx = player.vy = 0; }

  camX = Math.max(0, Math.min(LW * TILE - W, player.x - W/2));
}

function draw(){
  ctx.fillStyle = "#60a5fa"; ctx.fillRect(0, 0, W, H);
  const startX = Math.floor(camX / TILE), endX = startX + Math.ceil(W / TILE) + 1;
  for (let y=0; y<LH; y++)
    for (let x=startX; x<endX; x++){
      if (LEVEL[y] && LEVEL[y][x] === "="){
        ctx.fillStyle = "#166534";
        ctx.fillRect(x*TILE - camX, y*TILE, TILE, TILE);
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(x*TILE - camX, y*TILE, TILE, 4);
      }
    }
  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(player.x - camX, player.y, player.w, player.h);
  ctx.fillStyle = "#fff"; ctx.font = "13px system-ui";
  ctx.fillText("arrows/WASD move · space jump", 10, 20);
}

(function loop(){ step(); draw(); requestAnimationFrame(loop); })();
`;
