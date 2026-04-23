// Logo design role — AI capability that suggests an SVG logo based on the prompt.

export const logoDesignRole = {
  id: "logo",
  label: "Logo Design",

  async handle(text) {
    const initials = (text.match(/\b[A-Za-z]/g) || ["V"]).slice(0, 2).join("").toUpperCase();
    const hue = Math.abs(hash(text)) % 360;
    const code = [
      "// AI-suggested logo — tweak in the Design tab afterwards.",
      "const w = 240;",
      "const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');",
      "svg.setAttribute('viewBox','0 0 100 100'); svg.setAttribute('width', w); svg.setAttribute('height', w);",
      `const fill = 'hsl(${hue} 85% 60%)';`,
      "svg.innerHTML = `",
      `  <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>`,
      `    <stop offset='0' stop-color='hsl(${hue} 85% 65%)' />`,
      `    <stop offset='1' stop-color='hsl(${(hue + 60) % 360} 85% 55%)' />`,
      "  </linearGradient></defs>",
      "  <rect x='4' y='4' width='92' height='92' rx='20' fill='url(#g)' />",
      `  <text x='50' y='62' font-family='system-ui' font-size='44' font-weight='800' text-anchor='middle' fill='white'>${initials}</text>`,
      "`;",
      "$root.appendChild(svg);",
    ].join("\n");
    return { text: `Drafted a logo for "${text}". Initials: ${initials}.`, code, action: { kind: "load-editor", code } };
  },
};

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return h;
}
