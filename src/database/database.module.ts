import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './entities/carts.entity';
import { CartItems } from './entities/cartItems.entity';
import { Orders } from './entities/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      //   password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/database/entities/*.entity{.ts,.js}'],
      password: process.env.DATABASE_PASSWORD,
      /**
       * Flag to show all generated sql queries on each interaction with DB.
       * Should be omitted for production production.
       */
      logging: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Carts, CartItems, Orders]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
