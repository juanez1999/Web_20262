"use client";

import type { OrderSummary } from "@/types/order-summary";
import { useState } from "react";

type OrderCardProps = {
  order: OrderSummary;
};

export default function OrderCard({ order }: OrderCardProps) {
  const [isEditing, setIsEditing ] = useState(false);

  return (
    <article className="order-card">
      {!isEditing &&  
        <>
          <h2>Pedido #{order.id}</h2>
          <p>{order.item}</p>
          <p>Cantidad: {order.quantity}</p>
          <p className={`status ${order.status}`}>
            {order.status}
          </p>
          <button onClick={()=> setIsEditing(true)}>Editar</button>
        </> 
      }
     
      {isEditing && <>
      <input type="text" defaultValue={`Pedido #${order.id}`}/>
      <button onClick={()=> setIsEditing(false)}>Guardar</button>
      </>}
    </article>
  );
}