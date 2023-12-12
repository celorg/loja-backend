import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { paymentProvider } from './payment.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    PaymentService,
    ...paymentProvider
  ],
  exports: [PaymentService]
})
export class PaymentModule {}
