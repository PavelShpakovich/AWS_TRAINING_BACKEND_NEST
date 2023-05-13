import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders, Status } from 'src/database/entities/orders.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orders: Repository<Orders>,
  ) {}

  async create(data: any) {
    const id = v4(v4());
    const order = {
      ...data,
      id,
      status: Status.IN_PROGGRESS,
    };

    return this.orders.save(order);
  }
}
