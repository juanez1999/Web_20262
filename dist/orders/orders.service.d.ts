import { CreateOrderDto } from './create-order.dto';
import type { Order } from './order.interface';
export declare class OrdersService {
    private orders;
    findAll(status?: string): Order[];
    findOne(id: number): Order;
    create(createOrderDto: CreateOrderDto): Order;
}
