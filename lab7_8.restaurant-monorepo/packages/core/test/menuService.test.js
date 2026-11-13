import { test } from "node:test";
import assert from "node:assert/strict";
import { MenuService, MemoryStorageAdapter, ERROR_EMPTY_NAME } from "../index.js";

test("MenuService додає страву з унікальним id та повертає її у list()", () => {
  const service = new MenuService(new MemoryStorageAdapter());
  const first = service.add({ name: "Бограч", price: 180, category: "Перші страви" });
  const second = service.add({ name: "Банош", price: 160, category: "Основні страви" });

  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  assert.notEqual(first.dish.id, second.dish.id);
  assert.equal(service.list().length, 2);
});

test("MenuService відхиляє порожню назву страви", () => {
  const service = new MenuService(new MemoryStorageAdapter());
  const res = service.add({ name: "  ", price: 100, category: "Напої" });

  assert.equal(res.ok, false);
  assert.equal(res.error, ERROR_EMPTY_NAME);
  assert.equal(service.list().length, 0);
});

test("MenuService видаляє наявну страву і повертає помилку для відсутньої", () => {
  const service = new MenuService(new MemoryStorageAdapter());
  const added = service.add({ name: "Чизкейк", price: 130, category: "Десерти" });

  assert.deepEqual(service.remove(added.dish.id), { ok: true });
  assert.equal(service.list().length, 0);
  assert.deepEqual(service.remove(999999), { ok: false, error: "Страву не знайдено." });
});