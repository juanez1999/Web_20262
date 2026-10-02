import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ShipmentEntity } from './entities/shipment.entity';
import { ShipmentStatus } from './shipment-status.enum';

@Injectable()
export class ShipmentRulesService {
  ensureCanBeDispatched(shipment: ShipmentEntity): void {
    if (shipment.status !== ShipmentStatus.CREATED) {
      throw new ConflictException('Only created shipments can be dispatched');
    }
  }
}
