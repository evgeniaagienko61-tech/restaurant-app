import { useState } from "react";

function OrderForm({ onAdd }) {
  const [dishName, setDishName] = useState("");
  const [category, setCategory] = useState("Основні страви");
  const [price, setPrice] = useState("");
  const [tableNumber, setTableNumber] = useState("1");

  const handleSubmit = (event) => {
    event.preventDefault();
    const isAdded = onAdd({
      dishName,
      category,
      price: Number(price),
      tableNumber,
    });

    if (isAdded) {
      setDishName("");
      setPrice("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3 rounded-xl bg-amber-50/70 p-4 border border-amber-200">
      <div className="flex gap-3 max-sm:flex-col">
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          placeholder="Назва страви (напр. Борщ український)"
          aria-label="Назва страви"
          className="flex-2 rounded-lg border border-amber-300 bg-white px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Категорія страви"
          className="flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="Перші страви">Перші страви</option>
          <option value="Основні страви">Основні страви</option>
          <option value="Салати">Салати</option>
          <option value="Десерти">Десерти</option>
          <option value="Напої">Напої</option>
        </select>
      </div>

      <div className="flex gap-3 max-sm:flex-col">
        <input
          type="number"
          min="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ціна (грн)"
          aria-label="Ціна страви"
          className="flex-1 rounded-lg border border-amber-300 bg-white px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <select
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          aria-label="Номер столика"
          className="flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="1">Столик №1</option>
          <option value="2">Столик №2</option>
          <option value="3">Столик №3</option>
          <option value="4">Столик №4</option>
          <option value="VIP">VIP-зал</option>
        </select>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-amber-600 px-6 py-2.5 text-base font-medium text-white transition hover:bg-amber-700"
        >
          Додати замовлення
        </button>
      </div>
    </form>
  );
}

export default OrderForm;