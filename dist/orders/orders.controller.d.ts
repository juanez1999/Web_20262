import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./orders.service";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<import("./entities/order.entity").OrderEntity[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./entities/order.entity").OrderEntity>;
    create(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").OrderEntity>;
}
