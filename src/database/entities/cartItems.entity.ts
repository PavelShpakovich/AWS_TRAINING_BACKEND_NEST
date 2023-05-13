import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './carts.entity';

@Entity()
export class CartItems {
  @Column({ type: 'uuid' })
  cart_id: string;

  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ type: 'integer' })
  count: number;

  @ManyToOne(
    () => Carts,
    carts => carts.items,
    { orphanedRowAction: 'delete', onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  carts: Carts;
}
