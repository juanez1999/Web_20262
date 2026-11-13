import OrderCard from "@/components/order-card";
import RefreshButton from "@/components/refresh-button/refresh-button";
import Link from "next/link";
import { coffeeFetch, } from "@/lib/coffee-api";
import { getUserRole } from "@/lib/demo-role";

type OrdersPageProps = {
  searchParams: Promise<{ status?: string | string[] }>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  
  const userRole = await getUserRole();
  
  //Aquí es donde filtramos usando los query params de la URL
  const { status } = await searchParams; //De aquí tomar el valor de la URL
  const selectedStatus = Array.isArray(status) ? status : status ? [status] : []
  const validStatuses = selectedStatus.filter((s) => s === "pending" || s === "ready");
  
  const params = new URLSearchParams();
  validStatuses.forEach((s) => {
    params.append("status", s)
  })

  const endpointURL = selectedStatus
    ? `/orders/search?${params.toString()}&limit=20`
    : "/orders";

  const response = await coffeeFetch(endpointURL);

  const data = response?.ok ? await response.json().catch(() => null) : null;
  const ordersApi = Array.isArray(data) ? data : null;
  
  return (
    <main>
      <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Pedidos</h1>
        {userRole === "manager" && (
          <Link href="/orders/new">Nuevo pedido</Link>
        )}
      </section>
      <nav aria-label="Filtrar pedidos">
        <Link href="/orders" aria-current={!selectedStatus ? "page" : undefined}>
          Todos
        </Link>
        <Link href="/orders?status=pending">
          Pendientes
        </Link>
        <Link href="/orders?status=ready">
          Listos
        </Link>
      </nav>

      <RefreshButton/>

      <section className="orders-grid" aria-label="Listado de pedidos">
        {ordersApi?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </main>
  );
}