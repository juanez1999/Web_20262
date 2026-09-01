import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @OneToMany(() => OrderEntity, (order) => order.customer) //Llave foranea
  orders!: OrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
