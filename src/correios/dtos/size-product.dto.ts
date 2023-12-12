import { ProductEntity } from '../../product/entities/product.entity';

export class InfoProductDTO {
  id: string;
  width: number; //largura cm
  height: number; //altura  cm
  length: number; //COMPRIMENTO cm
  weight: number; //PESO (float)
  insurance_value: number; //valor_seguro (float)
  quantity: number; //quantidade

  constructor(product: ProductEntity, quantidade?: number) {
    this.id = product.id;
    this.width = product.width;
    this.height = product.heigth;
    this.length = product.length;
    this.weight = product.weight;
    this.quantity = quantidade ? quantidade : 1;
    this.insurance_value = product?.price;
  }
}
