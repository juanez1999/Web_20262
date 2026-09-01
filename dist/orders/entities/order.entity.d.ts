import { CustomerEntity } from './customer.entity';
import { DiningEntity } from './dining.entity';
export declare class OrderEntity {
    id: number;
    item: string;
    quantity: number;
    status: 'pending' | 'ready';
    customer: CustomerEntity;
    dining: DiningEntity;
    createdAt: Date;
}
