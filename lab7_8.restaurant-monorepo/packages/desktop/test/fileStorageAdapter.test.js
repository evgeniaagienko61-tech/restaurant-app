import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { FileStorageAdapter } from "../fileStorageAdapter.js";

test("FileStorageAdapter повертає [] якщо файлу не існує або він пошкоджений", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "restaurant-test-"));
  const filePath = path.join(tmpDir, "nested", "menu.json");
  const adapter = new FileStorageAdapter(filePath);

  assert.deepEqual(adapter.load(), []);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, "NOT_JSON", "utf8");
  assert.deepEqual(adapter.load(), []);
});

test("FileStorageAdapter створює теку та зберігає страви у JSON-файл", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "restaurant-test-"));
  const filePath = path.join(tmpDir, "data", "menu.json");
  const adapter = new FileStorageAdapter(filePath);

  const sample = [{ id: 1, name: "Паста Карбонара", price: 210, category: "Основні страви", createdAt: "2026-11-14T12:00:00.000Z" }];
  adapter.save(sample);

  assert.deepEqual(adapter.load(), sample);
});