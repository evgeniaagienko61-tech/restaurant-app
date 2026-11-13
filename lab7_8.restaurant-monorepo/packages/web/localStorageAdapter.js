import { MenuStorageAdapter } from "@restaurant/core";

export class LocalStorageAdapter extends MenuStorageAdapter {
  constructor(storage = globalThis.localStorage, key = "restaurant-menu") {
    super();
    this.storage = storage;
    this.key = key;
  }

  load() {
    try {
      const raw = this.storage.getItem(this.key);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  save(dishes) {
    this.storage.setItem(this.key, JSON.stringify(dishes));
  }
}