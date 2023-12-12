import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProvider } from './order.provider';
import { DatabaseModule } from '../database/database.module';
import { PaymentModule } from '../payment/payment.module';
import { CartModule } from '../cart/cart.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [DatabaseModule, PaymentModule, CartModule, OrderProductModule, ProductModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    ...orderProvider
  ]
})
export class OrderModule {}
