import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRulesService {
  ensureCanBeMarkedAsReady(order: OrderEntity): void {
    if (order.quantity <= 0) {
      throw new BadRequestException('An order must have at least one item');
    }

    if (order.status === 'ready') {
      throw new ConflictException('Only pending orders can be marked as ready');
    }
  }
}
