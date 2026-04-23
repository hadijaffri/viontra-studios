// Procedural music visualizer (no audio input — synthetic frequency data).

export const musicVisualizerTemplate = {
  id: "music-visualizer",
  name: "Music visualizer",
  tagline: "Bars + circular waveform with synthetic audio-style data.",
  intents: [/\bmusic\s*(viz|visualizer|visualiser)\b/, /\baudio\s*viz\b/, /\bwaveform\s*viz\b/],
  keywords: ["music","visualizer","visualiser","viz","waveform","audio","bars"],
  render() { return CODE; },
};

const CODE = `// Synthetic music visualizer — animates procedurally without real audio.

const W=800, H=500;
const cnv = document.createElement("canvas");
cnv.width=W; cnv.height=H;
cnv.style.cssText="background:#0b1220;border-radius:8px;display:block;margin:0 auto";
$root.appendChild(cnv);
const ctx = cnv.getContext("2d");

const BARS = 64;
const phase = Array.from({length: BARS}, () => Math.random() * Math.PI * 2);
let t = 0;

(function loop(){
  t += 0.03;
  ctx.fillStyle = "rgba(11,18,32,0.2)"; ctx.fillRect(0, 0, W, H);

  // Bars bottom
  for (let i=0; i<BARS; i++){
    const v = (Math.sin(t * 1.2 + phase[i]) + Math.sin(t * 2.7 + i) * 0.5 + Math.sin(t * 0.6 + i * 0.3) * 0.6);
    const h = 40 + (v + 2) * 60;
    const x = i * (W / BARS);
    const hue = (i / BARS) * 300;
    const g = ctx.createLinearGradient(0, H, 0, H - h);
    g.addColorStop(0, "hsl(" + hue + ", 90%, 40%)");
    g.addColorStop(1, "hsl(" + hue + ", 90%, 65%)");
    ctx.fillStyle = g;
    ctx.fillRect(x + 2, H - h, W / BARS - 4, h);
  }

  // Circle waveform
  const cx = W/2, cy = H/2 - 40, R = 90;
  ctx.beginPath();
  for (let i=0; i<=120; i++){
    const a = (i / 120) * Math.PI * 2;
    const r = R + Math.sin(a * 5 + t * 2) * 20 + Math.cos(a * 8 + t * 3) * 10;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#f472b6"; ctx.lineWidth = 2.5; ctx.stroke();

  requestAnimationFrame(loop);
})();
`;
