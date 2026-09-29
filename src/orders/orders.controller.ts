import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./orders.service";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(Number(id), updateOrderDto);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(":id/ready")
  markAsReady(@Param("id") id: string) {
    return this.ordersService.markAsReady(Number(id));
  }

  @Get(":id/estimate")
  estimatePreparationTime(@Param("id") id: string) {
    return this.ordersService.estimatePreparationTime(Number(id));
  }

  @Get("pending")
  findRecentPending() {
    return this.ordersService.findRecentPending();
  }
}
