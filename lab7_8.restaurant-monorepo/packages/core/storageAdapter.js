export class MenuStorageAdapter {
  load() {
    throw new Error("Метод load() не реалізовано.");
  }

  save(_dishes) {
    throw new Error("Метод save() не реалізовано.");
  }
}

export class MemoryStorageAdapter extends MenuStorageAdapter {
  constructor(initialDishes = []) {
    super();
    this.dishes = [...initialDishes];
  }

  load() {
    return [...this.dishes];
  }

  save(dishes) {
    this.dishes = [...dishes];
  }
}