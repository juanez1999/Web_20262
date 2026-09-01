import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities/order.entity';
import { CustomerEntity } from './entities/customer.entity';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { DiningEntity } from './entities/dining.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, CustomerEntity, DiningEntity]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
