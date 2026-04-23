// Object system — entity store keyed by id, with tag-based queries.

export class ObjectSystem {
  constructor() { this.byId = new Map(); this._id = 0; }

  add(obj = {}) {
    const id = obj.id ?? `e${++this._id}`;
    const entity = { id, tags: new Set(obj.tags || []), ...obj };
    this.byId.set(id, entity);
    return entity;
  }

  remove(id) { this.byId.delete(id); }
  get(id)    { return this.byId.get(id); }
  all()      { return [...this.byId.values()]; }

  withTag(tag) {
    const out = [];
    for (const e of this.byId.values()) if (e.tags?.has(tag)) out.push(e);
    return out;
  }

  update(fn) { for (const e of this.byId.values()) fn(e); }
}
