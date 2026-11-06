import type { OrderSummary } from "@/types/order-summary";

type OrderCardProps = {
  order: OrderSummary;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="order-card">
      <h2>Pedido #{order.id}</h2>
      <p>{order.item}</p>
      <p>Cantidad: {order.quantity}</p>
      <p className={`status ${order.status}`}>
        {order.status === "ready" ? "Listo" : "Pendiente"}
      </p>
    </article>
  );
}