import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity("dining")
export class DiningEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: number;

  @Column({ type: "int", default: 4 })
  capacity!: number;

  // @OneToMany(() => OrderEntity, (order) => order.dining) //Llave foranea
  // orders!: OrderEntity[];
}
