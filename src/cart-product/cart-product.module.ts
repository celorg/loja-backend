import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { DatabaseModule } from '../database/database.module';
import { cartProductProvider } from './cart-product.provider';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  providers: [
    CartProductService,
    ...cartProductProvider
  ],
  exports: [CartProductService]
})
export class CartProductModule {}
