import OrderCard from "@/components/order-card";
import { redirect } from "next/dist/client/components/navigation";
import { cookies } from "next/dist/server/request/cookies";

export default async function OrdersPage() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("coffee_token")?.value;
  if (!token) redirect("/login");
  
  const response = await fetch(`${process.env.COFFEE_API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).catch(() => null);

  if (response?.status === 401) redirect("/login");

  const data = response?.ok ? await response.json().catch(() => null) : null;
  const ordersApi = Array.isArray(data) ? data : null;
  
  return (
    <main>
      <h1>Pedidos</h1>
      <section className="orders-grid" aria-label="Listado de pedidos">
        {ordersApi?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </main>
  );
}