import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  HttpStatus,
} from '@nestjs/common';

import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cart,
    };
  }

  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      body,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cart,
    };
  }

  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.softRemoveByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const user_id = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(user_id);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { id: cart_id, items } = cart;
    const order = await this.orderService.create({
      ...body, // TODO: validate and pick only necessary data
      user_id,
      cart_id,
      items,
    });
    await this.cartService.softRemoveByUserId(user_id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
