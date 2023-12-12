import { ReturnCategoryDto } from 'src/category/dtos/return-category-dto';
import { ProductEntity } from '../entities/product.entity';

export class ReturnInfoProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  width: number;
  height: number;
  lenght: number;
  weigth: number;
  category?: ReturnCategoryDto;

  constructor(productEntity: ProductEntity) {
    (this.id = productEntity.id),
      (this.name = productEntity.name),
      (this.price = productEntity.price),
      (this.image = productEntity.image),
      (this.width = productEntity.width),
      (this.height = productEntity.heigth),
      (this.lenght = productEntity.length),
      (this.weigth = productEntity.weight),
      (this.category = productEntity.category
        ? new ReturnCategoryDto(productEntity.category)
        : undefined);
  }
}
