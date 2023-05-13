import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './carts.entity';

export enum Status {
  IN_PROGGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  cart_id: string;

  @Column({ type: 'json' })
  payment: string;

  @Column({ type: 'json' })
  delivery: string;

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ type: 'integer' })
  total: number;

  @OneToOne(() => Carts)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  carts: Carts;
}
