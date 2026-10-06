import { Injectable } from "@nestjs/common";
import { OrderEntity } from "../entities/order.entity";

@Injectable()
export class OrderPreparationEstimateService {
  estimate(order: OrderEntity): {
    orderId: number;
    status: string;
    estimatedMinutes: number;
  } {
    const estimatedTime = order.status === "ready" ? 0 : 3 + order.quantity * 2;

    return {
      orderId: order.id,
      status: order.status,
      estimatedMinutes: estimatedTime,
    };
  }
}

// import { Injectable } from '@nestjs/common';
// import { OrdersService } from '../orders.service';

// @Injectable()
// export class OrderPreparationEstimateService {
//   constructor(private readonly ordersService: OrdersService) {}

//   async estimate(id: number) {
//     const order = await this.ordersService.findOne(id);

//     const estimatedMinutes =
//       order.status === 'ready' ? 0 : 3 + order.quantity * 2;

//     return {
//       orderId: order.id,
//       status: order.status,
//       estimatedMinutes,
//     };
//   }
// }
