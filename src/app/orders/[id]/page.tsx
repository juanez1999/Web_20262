import { coffeeFetch } from "@/lib/coffee-api";
import { getUserRole } from "@/lib/demo-role";
import { notFound } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";

type OrderDetailsProps = {
    params: Promise<{ id?: string }>
}

export default async function OrderDetailPage({params}: OrderDetailsProps) {
    const userRole = await getUserRole();
    if(userRole !== "manager") notFound();

    const { id } = await params; 
    const orderId = Number(id);

    const response = await coffeeFetch(`/orders/${orderId}/estimate`);
    if (response?.status === 404) notFound();

    const estimate = response?.ok
    ? await response.json().catch(() => null)
    : null;

    return (
    <main>
      <h1>Pedido #{orderId}</h1>
      {estimate ? (
        <>
          <p>Estado: {estimate.status === "ready" ? "Listo" : "Pendiente"}</p>
          <p>Tiempo estimado: {estimate.estimatedMinutes} minutos</p>
        </>
      ) : (
        <p role="alert">No se pudo consultar la estimación.</p>
      )}
      <Link href="/orders">Volver a pedidos</Link>
    </main>
    )
    
}