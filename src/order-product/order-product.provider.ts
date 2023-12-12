import { DataSource } from "typeorm";
import { OrderProductEntity } from "./entities/order-product.entity";


export const orderProductProvider = [
    {
        provide: 'ORDER_PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderProductEntity),
        inject: ['DATA_SOURCE']
    }
]