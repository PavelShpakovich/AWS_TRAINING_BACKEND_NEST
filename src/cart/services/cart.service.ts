import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItems } from 'src/database/entities/cartItems.entity';
import { Carts, Status } from 'src/database/entities/carts.entity';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private readonly userCarts: Repository<Carts>,
    @InjectRepository(CartItems)
    private readonly userCartItems: Repository<CartItems>,
  ) {}

  async findByUserId(user_id: string): Promise<Carts & { items: CartItems[] }> {
    return this.userCarts.findOne(
      { user_id, status: Status.OPEN },
      { relations: ['items'] },
    );
  }

  async createByUserId(user_id: string) {
    const id = v4(v4());
    const userCart = {
      id,
      user_id: user_id,
      status: Status.OPEN,
    };

    return this.userCarts.save(userCart);
  }

  async findOrCreateByUserId(user_id: string): Promise<Carts> {
    const userCart = await this.findByUserId(user_id);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(user_id);
  }

  async updateByUserId(
    user_id: string,
    { items: [item] }: Carts & { items: CartItems[] },
  ): Promise<Carts | void> {
    const { id, ...rest } = await this.findOrCreateByUserId(user_id);

    if (!item.count) {
      return this.removeCartItemsById(item.product_id);
    }

    const isExistingItem = !!rest.items?.find(
      ({ product_id }) => product_id === item.product_id,
    );

    const updatedItems = isExistingItem
      ? rest.items.map(i => {
          if (i.product_id === item.product_id) {
            return { ...i, count: item.count };
          }

          return i;
        })
      : [...rest.items, item];

    const updatedCart = {
      id,
      ...rest,
      items: updatedItems,
    };

    return this.userCarts.save(updatedCart);
  }

  async removeCartItemsById(product_id: string): Promise<void> {
    await this.userCartItems.delete({ product_id });
  }

  async softRemoveByUserId(user_id: string): Promise<void> {
    const userCart = await this.findByUserId(user_id);

    await this.userCarts.save({ ...userCart, status: Status.ORDERED });
  }
}
