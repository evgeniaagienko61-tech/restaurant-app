import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatDishDate,
  sortDishesByDate,
  filterDishesByQuery,
  sanitizeDishes
} from "../index.js";

test("formatDishDate форматує дату у дд.мм.рррр і повертає порожній рядок для некоректної", () => {
  assert.equal(formatDishDate("2026-11-14T10:15:00.000Z"), "14.11.2026");
  assert.equal(formatDishDate("invalid-date"), "");
});

test("sortDishesByDate сортує від новіших до старіших без мутації вхідного масиву", () => {
  const input = [
    { id: 1, name: "Стара", createdAt: "2026-01-01T10:00:00.000Z" },
    { id: 2, name: "Нова", createdAt: "2026-05-01T10:00:00.000Z" }
  ];
  const sorted = sortDishesByDate(input);

  assert.equal(sorted[0].id, 2);
  assert.equal(input[0].id, 1);
});

test("filterDishesByQuery шукає за назвою та категорією без урахування регістру", () => {
  const dishes = [
    { id: 1, name: "Вареники з вишнею", category: "Основні страви" },
    { id: 2, name: "Узвар", category: "Напої" }
  ];

  assert.equal(filterDishesByQuery(dishes, "ВАРЕНИКИ").length, 1);
  assert.equal(filterDishesByQuery(dishes, "напої").length, 1);
  assert.equal(filterDishesByQuery(dishes, "").length, 2);
});

test("sanitizeDishes відкидає пошкоджені записи", () => {
  const raw = [
    null,
    { id: 1, name: "", price: 50, category: "Напої", createdAt: "2026-11-14T10:00:00.000Z" },
    { id: 2, name: "Тірамісу", price: 120, category: "Десерти", createdAt: "2026-11-14T10:00:00.000Z" }
  ];
  const clean = sanitizeDishes(raw);
  assert.equal(clean.length, 1);
  assert.equal(clean[0].name, "Тірамісу");
});