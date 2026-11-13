import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import OrderForm from "./components/OrderForm.jsx";
import OrderList from "./components/OrderList.jsx";

const STORAGE_KEY = "restaurant-orders-spa";

function loadOrders() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function App() {
  const [orders, setOrders] = useState(loadOrders);
  const [message, setMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Усі");

  // Збереження в localStorage при кожній зміні масиву orders
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = ({ dishName, category, price, tableNumber }) => {
    const trimmedName = dishName.trim();

    if (!trimmedName) {
      setMessage({ text: "Введіть назву страви.", type: "error" });
      return false;
    }

    if (!price || price <= 0) {
      setMessage({ text: "Вкажіть коректну ціну страви (більше 0 грн).", type: "error" });
      return false;
    }

    const newOrder = {
      id: Date.now(),
      dishName: trimmedName,
      category,
      price,
      tableNumber,
      done: false,
    };

    setOrders([...orders, newOrder]);
    setMessage({ text: `Страву «${trimmedName}» додано до замовлення.`, type: "success" });
    return true;
  };

  const toggleOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, done: !order.done } : order
      )
    );
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    setMessage({ text: "Позицію видалено зі списку замовлень.", type: "success" });
  };

  // Обчислення фільтрованого списку "на льоту" (без збереження в окремий state)
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.dishName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "Усі" || order.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Статистика для шапки
  const completedCount = orders.filter((order) => order.done).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="min-h-screen bg-amber-50/50 px-4 py-8 text-slate-800">
      <main className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg border border-amber-100">
        <Header
          total={orders.length}
          completed={completedCount}
          totalRevenue={totalRevenue}
        />

        <OrderForm onAdd={addOrder} />

        {message && (
          <p
            className={`mb-4 font-semibold ${
              message.type === "error" ? "text-rose-600" : "text-emerald-700"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Панель пошуку та фільтрації */}
        <div className="mb-5 flex gap-3 border-b border-slate-200 pb-4 max-sm:flex-col">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Пошук страви за назвою..."
            aria-label="Пошук страви"
            className="flex-2 rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            aria-label="Фільтр за категорією"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="Усі">Усі категорії</option>
            <option value="Перші страви">Перші страви</option>
            <option value="Основні страви">Основні страви</option>
            <option value="Салати">Салати</option>
            <option value="Десерти">Десерти</option>
            <option value="Напої">Напої</option>
          </select>
        </div>

        <OrderList
          orders={filteredOrders}
          onToggle={toggleOrder}
          onDelete={deleteOrder}
        />
      </main>
    </div>
  );
}

export default App;