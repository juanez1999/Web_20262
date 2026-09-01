import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';
import type { Order } from './order.interface';

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    { id: 1, customer: 'Laura', item: 'Café latte', status: 'pending' },
    { id: 2, customer: 'Mateo', item: 'Sándwich', status: 'ready' },
  ];

  findAll(status?: string): Order[] {
    if (!status) {
      return this.orders;
    }

    return this.orders.filter((order) => order.status === status);
  }

  findOne(id: number): Order {
    const order = this.orders.find((currentOrder) => currentOrder.id === id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }

  create(createOrderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: this.orders.length + 1,
      customer: createOrderDto.customer,
      item: createOrderDto.item,
      status: 'pending',
    };

    this.orders.push(newOrder);
    return newOrder;
  }
}
