import { DataSource } from "typeorm";
import { ProductEntity } from "./entities/product.entity";


export const productProvider = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
        inject: ['DATA_SOURCE']
    }
]