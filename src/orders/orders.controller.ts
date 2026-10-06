import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FilterOrdersQueryDto } from './dto/filter-orders-query.dto';

const requestValidationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(requestValidationPipe) updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Post()
  create(@Body(requestValidationPipe) createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id/ready')
  markAsReady(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.markAsReady(id);
  }

  @Get(':id/estimate')
  estimatePreparationTime(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.estimatePreparationTime(id);
  }

  @Get('pending')
  findRecentPending() {
    return this.ordersService.findRecentPending();
  }

  @Get('search')
  findFiltered(@Query(requestValidationPipe) query: FilterOrdersQueryDto) {
    return this.ordersService.findFiltered(query);
  }
}
