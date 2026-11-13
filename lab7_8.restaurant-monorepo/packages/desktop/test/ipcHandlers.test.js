import { test } from "node:test";
import assert from "node:assert/strict";
import { MenuService, MemoryStorageAdapter } from "@restaurant/core";
import { createHandlers } from "../ipcHandlers.js";

test("ipcHandlers додає страву, додає dateLabel, шукає та видаляє", () => {
  const handlers = createHandlers(new MenuService(new MemoryStorageAdapter()));

  const added = handlers.add({ name: "Лимонад", price: 75, category: "Напої" });
  assert.equal(added.ok, true);
  assert.match(added.dish.dateLabel, /^\d{2}\.\d{2}\.\d{4}$/);

  const found = handlers.list("лимон");
  assert.equal(found.length, 1);

  assert.deepEqual(handlers.remove(added.dish.id), { ok: true });
  assert.equal(handlers.list().length, 0);
});

test("ipcHandlers відхиляє некоректні типи даних із рендер-процесу", () => {
  const handlers = createHandlers(new MenuService(new MemoryStorageAdapter()));

  assert.equal(handlers.add(null).ok, false);
  assert.equal(handlers.add({ name: 123, price: 50, category: "Напої" }).ok, false);
  assert.equal(handlers.remove("not-a-number").ok, false);
  assert.deepEqual(handlers.list(12345), []);
});