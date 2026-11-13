const form = document.getElementById("dish-form");
const nameInput = document.getElementById("dish-name");
const priceInput = document.getElementById("dish-price");
const categorySelect = document.getElementById("dish-category");
const searchInput = document.getElementById("search-input");
const errorBox = document.getElementById("error-message");
const listEl = document.getElementById("dish-list");

async function initCategories() {
  const { categories } = await window.menuAPI.getMeta();
  for (const cat of categories) {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.append(option);
  }
}

async function render() {
  const dishes = await window.menuAPI.list(searchInput.value);
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
      <div class="dish-date">Додано: ${dish.dateLabel}</div>
    `;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "delete-btn";
    delBtn.textContent = "Видалити";
    delBtn.addEventListener("click", async () => {
      await window.menuAPI.remove(dish.id);
      await render();
    });

    li.append(content, delBtn);
    listEl.append(li);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.textContent = "";

  const result = await window.menuAPI.add({
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
  await render();
});

searchInput.addEventListener("input", render);

await initCategories();
await render();