import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { PaymentStatusModule } from './payment_status/payment_status.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { CorreiosModule } from './correios/correios.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
    PaymentStatusModule,
    PaymentModule,
    OrderModule,
    OrderProductModule,
    CorreiosModule,
  ],
  providers: [DatabaseModule,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }

  ],
  controllers: [
    
  ],
})
export class AppModule {}
