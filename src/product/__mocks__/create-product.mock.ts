import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProduct } from "../dtos/create-product.dto";

export const createProductMock: CreateProduct = {
    categoryId: categoryMock.id,
    image: 'kljflkdjfld.com',
    name: 'nome mock product',
    price: 25,
    height: 1,
    weight: 10.10,
    length: 10,
    width: 10,
}