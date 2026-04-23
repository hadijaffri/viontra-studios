// Flight simulator template — Three.js plane over procedural terrain.

export const flightSimTemplate = {
  id: "flight-sim",
  name: "Flight simulator",
  tagline: "3D plane over heightmap terrain with WASD/QE flight controls.",
  intents: [
    /\bflight\s*sim(ulator)?\b/, /\bplane\s*(game|sim)\b/,
    /\bfly\s+a\s+plane\b/, /\bairplane\s+(game|sim)\b/, /\baviation\s+sim\b/,
  ],
  keywords: ["flight","plane","airplane","aviation","fly","simulator","3d","sim"],
  render() { return CODE; },
};

const CODE = `// Flight simulator — Three.js loaded from CDN.
// Controls: W/S pitch · A/D yaw · Q/E roll · Shift throttle up · Ctrl throttle down.

(function boot(){
  if (window.THREE) return start();
  const s = document.createElement("script");
  s.src = "https://unpkg.com/three@0.160.0/build/three.min.js";
  s.onload = start;
  s.onerror = () => { $root.textContent = "Couldn't load Three.js (sandbox network blocked)."; };
  document.head.appendChild(s);
})();

function start(){
  const THREE = window.THREE;
  $root.style.position = "relative";
  $root.style.height = "560px";
  $root.style.overflow = "hidden";

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);
  scene.fog = new THREE.Fog(0x87CEEB, 300, 2200);

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 5000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize($root.clientWidth || 800, $root.clientHeight || 560);
  $root.appendChild(renderer.domElement);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.focus();

  function resize(){
    const w = $root.clientWidth || 800, h = $root.clientHeight || 560;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 1);
  sun.position.set(200, 400, 200);
  scene.add(sun);

  // Terrain: bumpy heightmap
  const TS = 4000, SEG = 120;
  const terrainGeo = new THREE.PlaneGeometry(TS, TS, SEG, SEG);
  terrainGeo.rotateX(-Math.PI / 2);
  const pos = terrainGeo.attributes.position;
  for (let i=0; i<pos.count; i++){
    const x = pos.getX(i), z = pos.getZ(i);
    const y =
      Math.sin(x*0.006) * Math.cos(z*0.006) * 40 +
      Math.sin(x*0.02 + z*0.015) * 10;
    pos.setY(i, y);
  }
  terrainGeo.computeVertexNormals();
  scene.add(new THREE.Mesh(terrainGeo, new THREE.MeshLambertMaterial({ color: 0x3E8E41 })));

  // Plane: fuselage + wing + tail
  const plane = new THREE.Group();
  const mat = c => new THREE.MeshLambertMaterial({ color: c });
  plane.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 4.5), mat(0xF5F5F5)));
  const wing = new THREE.Mesh(new THREE.BoxGeometry(8, 0.2, 1.2), mat(0x1976D2));
  wing.position.set(0, 0, 0.3);
  plane.add(wing);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 0.8), mat(0x1976D2));
  tail.position.set(0, 0.3, -2);
  plane.add(tail);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.9, 0.7), mat(0x1976D2));
  fin.position.set(0, 0.6, -2);
  plane.add(fin);
  plane.position.set(0, 80, 0);
  scene.add(plane);

  const keys = {};
  const listen = el => {
    el.addEventListener("keydown", e => { keys[e.key.toLowerCase()] = true; e.preventDefault(); });
    el.addEventListener("keyup",   e => { keys[e.key.toLowerCase()] = false; });
  };
  listen(renderer.domElement);
  listen(window);

  const hud = document.createElement("div");
  hud.style.cssText = "position:absolute;top:8px;left:8px;color:#fff;font:13px monospace;background:rgba(0,0,0,.4);padding:8px 10px;border-radius:6px;pointer-events:none;line-height:1.45";
  $root.appendChild(hud);

  const state = { pitch:0, yaw:0, roll:0, speed:1.3 };
  const forward = new THREE.Vector3();

  function tick(){
    if (keys["w"]) state.pitch += 0.012;
    if (keys["s"]) state.pitch -= 0.012;
    if (keys["a"]) state.yaw   += 0.012;
    if (keys["d"]) state.yaw   -= 0.012;
    if (keys["q"]) state.roll  += 0.012;
    if (keys["e"]) state.roll  -= 0.012;
    if (keys["shift"])   state.speed = Math.min(5, state.speed + 0.025);
    if (keys["control"]) state.speed = Math.max(0.25, state.speed - 0.025);
    state.pitch *= 0.97; state.roll *= 0.97;

    plane.rotateY(state.yaw * 0.04);
    plane.rotation.x = state.pitch * 2;
    plane.rotation.z = state.roll * 2;
    state.yaw *= 0.88;

    forward.set(0, 0, -1).applyQuaternion(plane.quaternion);
    plane.position.addScaledVector(forward, state.speed);
    if (plane.position.y < 2) plane.position.y = 2;

    const behind = forward.clone().multiplyScalar(-18);
    camera.position.copy(plane.position).add(behind);
    camera.position.y += 6;
    camera.lookAt(plane.position);

    hud.innerHTML =
      "SPEED " + state.speed.toFixed(2) + "<br>" +
      "ALT " + plane.position.y.toFixed(0) + "<br>" +
      "W/S pitch · A/D yaw · Q/E roll · Shift/Ctrl throttle";

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  resize();
  requestAnimationFrame(tick);
}
`;
