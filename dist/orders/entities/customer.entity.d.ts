import { OrderEntity } from './order.entity';
export declare class CustomerEntity {
    id: number;
    name: string;
    email: string;
    orders: OrderEntity[];
    createdAt: Date;
}
