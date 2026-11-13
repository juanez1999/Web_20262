import { coffeeFetch } from "@/lib/coffee-api";
import { redirect } from "next/dist/client/components/navigation";

async function createOrder(formData: FormData) {
    "use server";

    const response = await coffeeFetch('/orders',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item: formData.get("product"),
            quantity: parseInt(formData.get("quantity") as string),
            customerId: parseInt(formData.get("customerId") as string)
        })
    });

    console.log('response', response);
    const data = await response?.json().catch(() => null);
    redirect(`/orders/${data.id}`);
}

export default async function NewOrderPage() {
    return (
        <main>
            <h1>Nuevo pedido</h1>
            <form action={createOrder}>
                <p>
                    <label>
                        Producto
                        <input name="product" type="text" required />
                    </label>
                </p>
                <p>
                    <label>
                        Cantidad
                        <input name="quantity" type="number" min="1" required />
                    </label>
                </p>
                 <p>
                    <label>
                        ID del cliente
                        <input name="customerId" type="number" min="1" required />
                    </label>
                </p>
                <button type="submit">Crear pedido</button>
            </form>
        </main>
    )
}
