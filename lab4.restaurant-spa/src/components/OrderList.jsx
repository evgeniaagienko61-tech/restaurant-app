import OrderItem from "./OrderItem.jsx";

function OrderList({ orders, onToggle, onDelete }) {
  if (orders.length === 0) {
    return (
      <p className="py-6 text-center text-slate-500">
        Замовлень поки немає або за вашим запитом нічого не знайдено.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default OrderList;