import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MAX_DISH_NAME_LENGTH,
  ERROR_EMPTY_NAME,
  ERROR_TOO_LONG_NAME,
  ERROR_INVALID_PRICE,
  ERROR_INVALID_CATEGORY,
  validateDish
} from "../index.js";

test("validateDish приймає коректну страву", () => {
  const res = validateDish({ name: "Борщ український", price: 145, category: "Перші страви" });
  assert.equal(res.isValid, true);
  assert.equal(res.error, null);
});

test("validateDish відхиляє порожню назву або лише пробіли", () => {
  assert.deepEqual(
    validateDish({ name: "   ", price: 100, category: "Напої" }),
    { isValid: false, error: ERROR_EMPTY_NAME }
  );
  assert.deepEqual(
    validateDish({ name: null, price: 100, category: "Напої" }),
    { isValid: false, error: ERROR_EMPTY_NAME }
  );
});

test("validateDish перевіряє межу MAX_DISH_NAME_LENGTH та MAX_DISH_NAME_LENGTH + 1", () => {
  const exactName = "А".repeat(MAX_DISH_NAME_LENGTH);
  const longName = "А".repeat(MAX_DISH_NAME_LENGTH + 1);

  assert.equal(validateDish({ name: exactName, price: 90, category: "Десерти" }).isValid, true);
  assert.deepEqual(
    validateDish({ name: longName, price: 90, category: "Десерти" }),
    { isValid: false, error: ERROR_TOO_LONG_NAME }
  );
});

test("validateDish відхиляє некоректну ціну та невідому категорію", () => {
  assert.deepEqual(
    validateDish({ name: "Кава", price: 0, category: "Напої" }),
    { isValid: false, error: ERROR_INVALID_PRICE }
  );
  assert.deepEqual(
    validateDish({ name: "Кава", price: 50, category: "Суші" }),
    { isValid: false, error: ERROR_INVALID_CATEGORY }
  );
});