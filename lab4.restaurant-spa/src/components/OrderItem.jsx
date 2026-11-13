function OrderItem({ order, onToggle, onDelete }) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-xl border p-4 transition max-sm:flex-col max-sm:items-start ${
        order.done
          ? "border-slate-300 bg-slate-100"
          : "border-amber-200 bg-amber-50/40"
      }`}
    >
      <label className="flex flex-1 cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={order.done}
          onChange={() => onToggle(order.id)}
          className="mt-1 h-4 w-4 accent-amber-600 cursor-pointer"
        />
        <div>
          <p
            className={`text-lg font-medium ${
              order.done ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {order.dishName}
          </p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
              {order.category}
            </span>
            <span className="rounded-md bg-slate-200 px-2 py-0.5 text-slate-700">
              Столик: {order.tableNumber}
            </span>
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">
              {order.price} грн
            </span>
          </div>
        </div>
      </label>

      <button
        type="button"
        onClick={() => onDelete(order.id)}
        className="cursor-pointer rounded-lg bg-rose-500 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-rose-700 max-sm:self-end"
      >
        Видалити
      </button>
    </li>
  );
}

export default OrderItem;