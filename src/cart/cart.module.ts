import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from '../database/database.module';
import { cartProvider } from './cart.provider';
import { CartProductModule } from '../cart-product/cart-product.module';

@Module({
  imports: [DatabaseModule,CartProductModule],
  providers: [
    CartService,
    ...cartProvider
  ],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
