import { test } from "node:test";
import assert from "node:assert/strict";
import { MenuService } from "@restaurant/core";
import { LocalStorageAdapter } from "../localStorageAdapter.js";

function createMockStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    }
  };
}

test("LocalStorageAdapter повертає порожній масив для порожнього сховища або битого JSON", () => {
  const mock = createMockStorage();
  const adapter = new LocalStorageAdapter(mock, "test-menu");

  assert.deepEqual(adapter.load(), []);
  mock.setItem("test-menu", "{broken-json");
  assert.deepEqual(adapter.load(), []);
});

test("LocalStorageAdapter зберігає та зчитує дані разом із MenuService", () => {
  const mock = createMockStorage();
  const adapter = new LocalStorageAdapter(mock, "test-menu");
  const service = new MenuService(adapter);

  service.add({ name: "Солянка", price: 155, category: "Перші страви" });
  const reloadedService = new MenuService(new LocalStorageAdapter(mock, "test-menu"));

  assert.equal(reloadedService.list().length, 1);
  assert.equal(reloadedService.list()[0].name, "Солянка");
});