import { ReturnCategoryDto } from "../../category/dtos/return-category-dto";
import { ProductEntity } from "../entities/product.entity";


export class ReturnProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: ReturnCategoryDto;

    constructor(productEntity: ProductEntity){
        this.id = productEntity.id,
        this.name = productEntity.name,
        this.price = productEntity.price,
        this.image = productEntity.image,
        this.category = productEntity.category ? new ReturnCategoryDto(productEntity.category) : undefined
    }

}