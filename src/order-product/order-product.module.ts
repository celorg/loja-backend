import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { orderProductProvider } from './order-product.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    OrderProductService,
    ...orderProductProvider
  ],
  exports: [OrderProductService]
})
export class OrderProductModule {}
