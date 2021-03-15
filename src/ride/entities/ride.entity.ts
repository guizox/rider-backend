import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';

@Entity()
export class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.rides, { eager: false })
  user: User;

  @Column()
  userId: number;
}
