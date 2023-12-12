import { ReturnCartDto } from "../../cart/dtos/return-cart.dto";
import { ReturnProduct } from "../../product/dtos/return-product.dto";
import { CartProductEntity } from "../entities/cart-product.entity";


export class ReturnCartProductDto {
    id: number;
    productId: string;
    amount: number;
    product?: ReturnProduct;
    cartId: number;
    cart: ReturnCartDto;
    
    constructor(cartProduct: CartProductEntity){
        this.id = cartProduct.id;
        this.productId = cartProduct.productId;
        this.amount = cartProduct.amount;
        this.cartId = cartProduct.cartId;
        this.product = cartProduct.product ? new ReturnProduct(cartProduct.product) : undefined ;
        this.cart = cartProduct.cart ? new ReturnCartDto(cartProduct.cart) : undefined ;
    }
}