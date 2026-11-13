import { MenuService, ALLOWED_CATEGORIES, formatDishDate } from "@restaurant/core";
import { LocalStorageAdapter } from "./localStorageAdapter.js";

const service = new MenuService(new LocalStorageAdapter());

const form = document.getElementById("dish-form");
const nameInput = document.getElementById("dish-name");
const priceInput = document.getElementById("dish-price");
const categorySelect = document.getElementById("dish-category");
const searchInput = document.getElementById("search-input");
const errorBox = document.getElementById("error-message");
const listEl = document.getElementById("dish-list");

for (const cat of ALLOWED_CATEGORIES) {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categorySelect.append(option);
}

function render() {
  const dishes = service.list(searchInput.value);
  listEl.innerHTML = "";

  if (dishes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Страв не знайдено.";
    listEl.append(empty);
    return;
  }

  for (const dish of dishes) {
    const li = document.createElement("li");
    li.className = "dish-item";

    const content = document.createElement("div");
    content.className = "dish-content";
    content.innerHTML = `
      <strong>${dish.name}</strong> — <span>${dish.price.toFixed(2)} грн</span>
      <span class="badge">${dish.category}</span>
      <div class="dish-date">Додано: ${formatDishDate(dish.createdAt)}</div>
    `;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "delete-btn";
    delBtn.textContent = "Видалити";
    delBtn.addEventListener("click", () => {
      service.remove(dish.id);
      render();
    });

    li.append(content, delBtn);
    listEl.append(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorBox.textContent = "";

  const result = service.add({
    name: nameInput.value,
    price: priceInput.value,
    category: categorySelect.value
  });

  if (!result.ok) {
    errorBox.textContent = result.error;
    return;
  }

  nameInput.value = "";
  priceInput.value = "";
  render();
});

searchInput.addEventListener("input", render);

render();