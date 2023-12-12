import { DataSource } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";


export const categoryProvider = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(CategoryEntity),
        inject: ['DATA_SOURCE']
    }
]