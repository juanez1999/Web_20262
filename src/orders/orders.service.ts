import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "./entities/customer.entity";
import { OrderEntity } from "./entities/order.entity";
import { Repository } from "typeorm";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderRulesService } from "./order-rules/order-rules.service";
import { OrderPreparationEstimateService } from "./order-preparation-estimate/order-preparation-estimate.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,

    private readonly orderRulesService: OrderRulesService,

    private readonly orderPreparationEstimateService: OrderPreparationEstimateService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customerId,
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${createOrderDto.customerId} was not found`,
      );
    }

    //Primero creo, luego guardo
    const order = this.ordersRepository.create({
      item: createOrderDto.item,
      quantity: createOrderDto.quantity,
      status: "pending",
      customer,
    });

    //Guardo en la base de datos y retorno el objeto guardado
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      relations: {
        customer: true,
      },
      order: {
        id: "ASC",
      },
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id);

    this.ordersRepository.merge(order, updateOrderDto);

    return this.ordersRepository.save(order);
  }

  async markAsReady(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id); //Fue y busco la orden y si la encuentra la pone en la constante y sino marca error
    this.orderRulesService.ensureCanBeMarkedAsReady(order);
    order.status = "ready";

    return this.ordersRepository.save(order);
  }

  async estimatePreparationTime(id: number): Promise<{
    orderId: number;
    status: string;
    estimatedMinutes: number;
  }> {
    const order = await this.findOne(id);
    return this.orderPreparationEstimateService.estimate(order);
  }

  async findRecentPending(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      // where: { quantity: LessThan(2) },
      where: { status: "pending" },
      order: { createdAt: "ASC" },
      take: 2,
      relations: {
        customer: true,
      },
    });
  }
}
