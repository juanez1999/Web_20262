import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 200 })
  email!: string;

  @Column({ length: 200, name: 'password_hash', select: false })
  passwordHash!: string;
}
