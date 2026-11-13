import { validateDish } from "./dishValidation.js";
import {
  createDish,
  sortDishesByDate,
  filterDishesByQuery,
  sanitizeDishes
} from "./dishUtils.js";

export class MenuService {
  constructor(adapter) {
    if (!adapter) {
      throw new Error("Потрібно передати адаптер сховища.");
    }
    this.adapter = adapter;
    this.lastId = 0;
  }

  _nextId() {
    const now = Date.now();
    this.lastId = now > this.lastId ? now : this.lastId + 1;
    return this.lastId;
  }

  list(query = "") {
    const raw = this.adapter.load();
    const clean = sanitizeDishes(raw);
    const filtered = filterDishesByQuery(clean, query);
    return sortDishesByDate(filtered);
  }

  add({ name, price, category }) {
    const validation = validateDish({ name, price, category });
    if (!validation.isValid) {
      return { ok: false, error: validation.error };
    }

    const current = sanitizeDishes(this.adapter.load());
    const dish = createDish({
      id: this._nextId(),
      name,
      price,
      category
    });

    current.push(dish);
    this.adapter.save(current);

    return { ok: true, dish };
  }

  remove(id) {
    const current = sanitizeDishes(this.adapter.load());
    const next = current.filter((item) => item.id !== id);
    if (next.length === current.length) {
      return { ok: false, error: "Страву не знайдено." };
    }
    this.adapter.save(next);
    return { ok: true };
  }
}