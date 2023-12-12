import { DataSource } from "typeorm";
import { PaymentEntity } from "./entities/payment.entity";


export const paymentProvider =  [
    {
        provide: 'PAYMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentEntity),
        inject: ['DATA_SOURCE']
    }
]