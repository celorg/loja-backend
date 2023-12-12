import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    categoryId: categoryMock.id,
    createdAt: new Date(),
    id: '7578',
    image: 'http://image.com',
    name: 'name product mock', 
    price: 34.4,
    updatedAt: new Date(),
    weight: 10.10,
    length: 10,
    width: 10,
    heigth: 1
}