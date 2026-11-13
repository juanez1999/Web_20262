import { getUserRole } from "@/lib/demo-role";
import Link from "next/link";

export default async function AppHeader() {
  const userRole = await getUserRole();

  return (
    <header className="site-header">
      <p className="brand">Coffee Orders</p>
      <nav aria-label="Navegación principal">
        <Link href="/">Inicio</Link>
        <Link href="/orders">Pedidos</Link>
        {userRole === "manager" && (
          <Link href="/orders/new">Crear pedido</Link>
        )}
        <Link href="/otraPagina">Otra Página</Link>
      </nav>
    </header>
  );
}