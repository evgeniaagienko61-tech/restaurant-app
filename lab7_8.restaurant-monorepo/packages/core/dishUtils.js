import { ALLOWED_CATEGORIES, MAX_DISH_NAME_LENGTH, MIN_DISH_PRICE, MAX_DISH_PRICE } from "./dishValidation.js";

export function createDish({ id = Date.now(), name, price, category, createdAt = new Date().toISOString() }) {
  return {
    id,
    name: name.trim(),
    price: Number(Number(price).toFixed(2)),
    category,
    createdAt
  };
}

export function formatDishDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function sortDishesByDate(dishes) {
  return [...dishes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function filterDishesByQuery(dishes, query = "") {
  const normalized = typeof query === "string" ? query.trim().toLowerCase() : "";
  if (!normalized) {
    return [...dishes];
  }
  return dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(normalized) ||
      dish.category.toLowerCase().includes(normalized)
  );
}

export function sanitizeDishes(rawList) {
  if (!Array.isArray(rawList)) {
    return [];
  }
  return rawList.filter(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.id === "number" &&
      typeof item.name === "string" &&
      item.name.trim().length > 0 &&
      item.name.trim().length <= MAX_DISH_NAME_LENGTH &&
      typeof item.price === "number" &&
      item.price >= MIN_DISH_PRICE &&
      item.price <= MAX_DISH_PRICE &&
      ALLOWED_CATEGORIES.includes(item.category) &&
      typeof item.createdAt === "string" &&
      !Number.isNaN(new Date(item.createdAt).getTime())
  );
}