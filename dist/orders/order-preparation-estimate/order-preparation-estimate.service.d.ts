import { OrderEntity } from '../entities/order.entity';
export declare class OrderPreparationEstimateService {
    estimate(order: OrderEntity): {
        orderId: number;
        status: string;
        estimatedMinutes: number;
    };
}
