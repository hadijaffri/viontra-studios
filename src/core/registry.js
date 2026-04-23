// Expansion System — central registry for AI roles, tools, and modules.
// Anything pluggable is registered here so the UI and router can discover it.

export class Registry {
  constructor() {
    this.roles   = new Map(); // id -> { id, label, handle(input, ctx) -> Promise<reply> }
    this.tools   = new Map(); // id -> { id, label, run(ctx) }
    this.modules = new Map(); // id -> { id, label, mount(host, ctx), unmount? }
  }

  registerRole(role)     { this._add(this.roles,   role); }
  registerTool(tool)     { this._add(this.tools,   tool); }
  registerModule(module) { this._add(this.modules, module); }

  _add(map, entry) {
    if (!entry?.id) throw new Error("registry entry needs an id");
    if (map.has(entry.id)) throw new Error(`duplicate id: ${entry.id}`);
    map.set(entry.id, entry);
  }

  role(id)   { return this.roles.get(id); }
  tool(id)   { return this.tools.get(id); }
  module(id) { return this.modules.get(id); }

  listRoles()   { return [...this.roles.values()]; }
  listTools()   { return [...this.tools.values()]; }
  listModules() { return [...this.modules.values()]; }
}

export const registry = new Registry();
