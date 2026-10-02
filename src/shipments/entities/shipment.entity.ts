import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ShipmentStatus } from '../shipment-status.enum';

@Entity('shipments')
export class ShipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trackingCode: string;

  @Column()
  destination: string;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.CREATED,
  })
  status: ShipmentStatus;
}
