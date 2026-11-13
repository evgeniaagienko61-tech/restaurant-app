export const MAX_DISH_NAME_LENGTH = 80;
export const MIN_DISH_PRICE = 1;
export const MAX_DISH_PRICE = 50000;

export const ALLOWED_CATEGORIES = [
  "Перші страви",
  "Основні страви",
  "Десерти",
  "Напої"
];

export const ERROR_EMPTY_NAME = "Назва страви не може бути порожньою.";
export const ERROR_TOO_LONG_NAME = `Назва страви не повинна перевищувати ${MAX_DISH_NAME_LENGTH} символів.`;
export const ERROR_INVALID_PRICE = `Ціна повинна бути числом від ${MIN_DISH_PRICE} до ${MAX_DISH_PRICE} грн.`;
export const ERROR_INVALID_CATEGORY = "Некоректна категорія страви.";

export function validateDish({ name, price, category }) {
  if (typeof name !== "string" || name.trim().length === 0) {
    return { isValid: false, error: ERROR_EMPTY_NAME };
  }

  if (name.trim().length > MAX_DISH_NAME_LENGTH) {
    return { isValid: false, error: ERROR_TOO_LONG_NAME };
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < MIN_DISH_PRICE || numericPrice > MAX_DISH_PRICE) {
    return { isValid: false, error: ERROR_INVALID_PRICE };
  }

  if (!ALLOWED_CATEGORIES.includes(category)) {
    return { isValid: false, error: ERROR_INVALID_CATEGORY };
  }

  return { isValid: true, error: null };
}