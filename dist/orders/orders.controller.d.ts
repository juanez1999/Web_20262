import { CreateOrderDto } from './create-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(status?: string): import("./order.interface").Order[];
    findOne(id: string): import("./order.interface").Order;
    create(createOrderDto: CreateOrderDto): import("./order.interface").Order;
}
