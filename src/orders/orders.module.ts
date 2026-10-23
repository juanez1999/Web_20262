import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities/order.entity';
import { CustomerEntity } from './entities/customer.entity';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { DiningEntity } from './entities/dining.entity';
import { OrderRulesService } from './order-rules/order-rules.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, CustomerEntity, DiningEntity]),
  ],
  providers: [
    OrdersService,
    OrderRulesService,
    OrderPreparationEstimateService,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
