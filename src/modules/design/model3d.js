// Tiny 3D modeler — software-rendered wireframe so we don't need any library.
// Supports primitives (cube, pyramid, plane), per-object transform, and a
// draggable camera. Saved to localStorage.

import { saveJSON, loadJSON } from "../../core/storage.js";

const KEY = "design.model3d";

export function mountModel3D(host) {
  host.innerHTML = `
    <div class="dsg-toolbar">
      <button data-act="cube">Cube</button>
      <button data-act="pyramid">Pyramid</button>
      <button data-act="plane">Plane</button>
      <button data-act="clear">Clear</button>
    </div>
    <div class="dsg-stage">
      <canvas width="640" height="420"></canvas>
      <div class="dsg-hint">Drag to orbit · scroll to zoom</div>
    </div>
  `;
  const cv = host.querySelector("canvas");
  const ctx = cv.getContext("2d");
  let scene = loadJSON(KEY, { objects: [] });
  let cam = { yaw: 0.6, pitch: 0.3, dist: 6 };

  host.querySelector(".dsg-toolbar").addEventListener("click", e => {
    const act = e.target.dataset.act;
    if (act === "cube")    scene.objects.push(primitive("cube"));
    if (act === "pyramid") scene.objects.push(primitive("pyramid"));
    if (act === "plane")   scene.objects.push(primitive("plane"));
    if (act === "clear")   scene.objects = [];
    persist(); draw();
  });

  let dragging = false, lastX = 0, lastY = 0;
  cv.addEventListener("pointerdown", e => { dragging = true; lastX = e.clientX; lastY = e.clientY; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener("pointerup",   e => { dragging = false; cv.releasePointerCapture(e.pointerId); });
  cv.addEventListener("pointermove", e => {
    if (!dragging) return;
    cam.yaw   += (e.clientX - lastX) * 0.01;
    cam.pitch += (e.clientY - lastY) * 0.01;
    cam.pitch = Math.max(-1.4, Math.min(1.4, cam.pitch));
    lastX = e.clientX; lastY = e.clientY;
    draw();
  });
  cv.addEventListener("wheel", e => {
    e.preventDefault();
    cam.dist = Math.max(2, Math.min(20, cam.dist + Math.sign(e.deltaY) * 0.4));
    draw();
  }, { passive: false });

  function persist() { saveJSON(KEY, scene); }

  function primitive(kind) {
    const o = { kind, x: (Math.random() - 0.5) * 2, y: 0, z: (Math.random() - 0.5) * 2, color: randColor() };
    return o;
  }

  function draw() {
    ctx.fillStyle = "#0b0c11";
    ctx.fillRect(0, 0, cv.width, cv.height);

    // ground grid
    ctx.strokeStyle = "#1b1e29";
    for (let g = -5; g <= 5; g++) {
      drawLine(project({ x: g, y: 0, z: -5 }), project({ x: g, y: 0, z: 5 }));
      drawLine(project({ x: -5, y: 0, z: g }), project({ x: 5, y: 0, z: g }));
    }

    for (const o of scene.objects) {
      const verts = geom(o.kind).verts.map(v => ({ x: v.x + o.x, y: v.y + o.y, z: v.z + o.z }));
      const p2 = verts.map(project);
      ctx.strokeStyle = o.color;
      ctx.lineWidth = 1.4;
      for (const [a, b] of geom(o.kind).edges) drawLine(p2[a], p2[b]);
    }
  }

  function drawLine(a, b) {
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  }

  function project(v) {
    const cy = Math.cos(cam.yaw),   sy = Math.sin(cam.yaw);
    const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const x1 =  v.x * cy - v.z * sy;
    const z1 =  v.x * sy + v.z * cy;
    const y1 =  v.y * cp - z1 * sp;
    const z2 =  v.y * sp + z1 * cp + cam.dist;
    const f  = 320 / Math.max(0.5, z2);
    return [cv.width / 2 + x1 * f, cv.height / 2 - y1 * f];
  }

  draw();
}

// --- tiny primitive library ------------------------------------------------
const GEOM = {
  cube: {
    verts: [
      { x:-.5,y:-.5,z:-.5 },{ x: .5,y:-.5,z:-.5 },{ x: .5,y: .5,z:-.5 },{ x:-.5,y: .5,z:-.5 },
      { x:-.5,y:-.5,z: .5 },{ x: .5,y:-.5,z: .5 },{ x: .5,y: .5,z: .5 },{ x:-.5,y: .5,z: .5 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],
  },
  pyramid: {
    verts: [
      { x:-.5,y:0,z:-.5 },{ x: .5,y:0,z:-.5 },{ x: .5,y:0,z: .5 },{ x:-.5,y:0,z: .5 },
      { x:  0,y:1,z:  0 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]],
  },
  plane: {
    verts: [{ x:-1,y:0,z:-1 },{ x:1,y:0,z:-1 },{ x:1,y:0,z:1 },{ x:-1,y:0,z:1 }],
    edges: [[0,1],[1,2],[2,3],[3,0]],
  },
};
function geom(k) { return GEOM[k] || GEOM.cube; }

function randColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h} 80% 65%)`;
}
