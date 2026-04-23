// Code Engine — sandboxed JS execution with a live preview.
// Uses a sandboxed iframe: no same-origin, no parent access, no network by
// default. Console output is forwarded back via postMessage.

const FRAME_SANDBOX = "allow-scripts"; // intentionally no allow-same-origin
const HANDSHAKE = "viontra:sandbox:v1";

const RUNTIME = `
<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;height:100%;font:14px system-ui,sans-serif;color:#111}
  #root{padding:12px}
</style></head><body><div id="root"></div><script>
(function(){
  var parentPort = null;
  function send(kind, data){ parent.postMessage({ __viontra:true, kind:kind, data:data }, "*"); }
  ["log","info","warn","error"].forEach(function(level){
    var orig = console[level].bind(console);
    console[level] = function(){
      var args = Array.prototype.slice.call(arguments).map(function(a){
        try { return typeof a === "string" ? a : JSON.stringify(a); } catch(e){ return String(a); }
      });
      send("log", { level: level, text: args.join(" ") });
      orig.apply(null, arguments);
    };
  });
  window.addEventListener("error", function(e){ send("log",{level:"error",text:e.message}); });
  window.addEventListener("message", function(ev){
    var m = ev.data;
    if(!m || m.__viontra !== true) return;
    if(m.kind === "run"){
      try {
        var root = document.getElementById("root");
        root.innerHTML = "";
        // expose a handy container
        window.$root = root;
        // eslint-disable-next-line no-new-func
        var fn = new Function(m.data.code);
        var result = fn();
        send("done", { ok:true, result: String(result === undefined ? "" : result) });
      } catch (err) {
        send("log", { level:"error", text: err && err.stack || String(err) });
        send("done", { ok:false });
      }
    }
  });
  send("ready", { version: "${HANDSHAKE}" });
})();
</script></body></html>
`;

export class Sandbox {
  constructor(host) {
    this.host = host;
    this.frame = null;
    this.ready = false;
    this.listeners = new Set();
    this._mount();
    window.addEventListener("message", (ev) => this._onMessage(ev));
  }

  _mount() {
    const frame = document.createElement("iframe");
    frame.id = "preview-frame";
    frame.setAttribute("sandbox", FRAME_SANDBOX);
    frame.srcdoc = RUNTIME;
    this.host.replaceChildren(frame);
    this.frame = frame;
  }

  _onMessage(ev) {
    const m = ev.data;
    if (!m || m.__viontra !== true) return;
    if (m.kind === "ready") { this.ready = true; this._emit({ kind: "ready" }); return; }
    this._emit(m);
  }

  on(handler) { this.listeners.add(handler); return () => this.listeners.delete(handler); }
  _emit(m)    { this.listeners.forEach(h => { try { h(m); } catch (e) { console.error(e); } }); }

  async run(code) {
    if (!this.ready) await new Promise(res => {
      const off = this.on(m => { if (m.kind === "ready") { off(); res(); } });
    });
    this.frame.contentWindow.postMessage({ __viontra: true, kind: "run", data: { code } }, "*");
  }

  reset() { this.ready = false; this._mount(); }
}
