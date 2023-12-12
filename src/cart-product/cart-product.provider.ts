import { DataSource } from "typeorm";
import { CartProductEntity } from "./entities/cart-product.entity";


export const cartProductProvider = [
    {
        provide: 'CART_PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CartProductEntity),
        inject: ['DATA_SOURCE']
    }
]