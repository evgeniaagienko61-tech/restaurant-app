import { ALLOWED_CATEGORIES, formatDishDate } from "@restaurant/core";

export function createHandlers(service) {
  return {
    getMeta() {
      return { categories: ALLOWED_CATEGORIES };
    },

    list(query = "") {
      if (typeof query !== "string") {
        return [];
      }
      return service.list(query).map((dish) => ({
        ...dish,
        dateLabel: formatDishDate(dish.createdAt)
      }));
    },

    add(payload) {
      if (!payload || typeof payload !== "object") {
        return { ok: false, error: "Некоректні дані запиту." };
      }
      const { name, price, category } = payload;
      if (typeof name !== "string" || typeof category !== "string") {
        return { ok: false, error: "Некоректний тип полів страви." };
      }
      const res = service.add({ name, price, category });
      if (!res.ok) {
        return res;
      }
      return {
        ok: true,
        dish: {
          ...res.dish,
          dateLabel: formatDishDate(res.dish.createdAt)
        }
      };
    },

    remove(id) {
      if (typeof id !== "number") {
        return { ok: false, error: "Некоректний ідентифікатор." };
      }
      return service.remove(id);
    }
  };
}