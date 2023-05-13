import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from './services';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
