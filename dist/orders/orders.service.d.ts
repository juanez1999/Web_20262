import { CreateOrderDto } from "./dto/create-order.dto";
import { CustomerEntity } from "./entities/customer.entity";
import { OrderEntity } from "./entities/order.entity";
import { Repository } from "typeorm";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly customersRepository;
    constructor(ordersRepository: Repository<OrderEntity>, customersRepository: Repository<CustomerEntity>);
    create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
    findOne(id: number): Promise<OrderEntity>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
}
