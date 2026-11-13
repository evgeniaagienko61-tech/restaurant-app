function Header({ total, completed, totalRevenue }) {
  return (
    <header className="mb-6 text-center">
      <h1 className="mb-2 text-3xl font-bold text-amber-600">
        🍽️ Smart Restaurant SPA
      </h1>
      <p className="text-slate-600">
        Усього замовлень: <span className="font-semibold">{total}</span> ·{" "}
        Виконано: <span className="font-semibold text-emerald-600">{completed}</span> ·{" "}
        Сума: <span className="font-semibold text-amber-700">{totalRevenue} грн</span>
      </p>
    </header>
  );
}

export default Header;