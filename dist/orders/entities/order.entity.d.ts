import { CustomerEntity } from "./customer.entity";
export declare class OrderEntity {
    id: number;
    item: string;
    quantity: number;
    status: "pending" | "ready";
    customer: CustomerEntity;
    createdAt: Date;
}
