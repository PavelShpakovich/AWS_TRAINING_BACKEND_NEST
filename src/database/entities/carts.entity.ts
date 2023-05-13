import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItems } from './cartItems.entity';
import { Orders } from './orders.entity';

export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToMany(
    () => CartItems,
    cartItems => cartItems.carts,
    { cascade: true },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItems[];
}
