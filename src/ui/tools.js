// Tool panel — shows registered tools + AI roles. Clicking runs them.

import { bus } from "../core/bus.js";
import { registry } from "../core/registry.js";

export function mountTools(host) {
  host.innerHTML = `<h3>Tools</h3><div class="tool-list" id="tool-list"></div>`;
  const list = host.querySelector("#tool-list");

  function render() {
    list.innerHTML = "";

    // Section: roles (prompt shortcuts)
    for (const role of registry.listRoles()) {
      const btn = document.createElement("button");
      btn.className = "tool";
      btn.textContent = `${role.label}`;
      btn.title = `Ask ${role.label} for a starting scaffold`;
      btn.addEventListener("click", async () => {
        const reply = await bus.request("ai.prompt", { text: `${role.id} scaffold` });
        if (reply.code) bus.emit("editor.load", { code: reply.code });
      });
      list.appendChild(btn);
    }

    // Section: tools
    for (const tool of registry.listTools()) {
      const btn = document.createElement("button");
      btn.className = "tool";
      btn.textContent = tool.label;
      btn.addEventListener("click", () => tool.run?.({ bus, registry }));
      list.appendChild(btn);
    }
  }

  render();
  bus.on("registry.changed", render);
}
