import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { InsertCart } from '../cart/dtos/insert-cart.dto';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductService } from '../product/product.service';
import { UpdateCartDTO } from '../cart/dtos/update-cart.dto';

@Injectable()
export class CartProductService {
    constructor(
        @Inject('CART_PRODUCT_REPOSITORY')
        private readonly cartProductRepository: Repository<CartProductEntity>,
        
        private readonly productService: ProductService,
    ){}

    async verifyProductInCart(productId: string, cartId: number): Promise<CartProductEntity> {
        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                productId,
                cartId
            }
        });

        if(!cartProduct){
            throw new NotFoundException('Esse produto não existe no carrinho');
        }

        return cartProduct;
    }

    async createProductInCart(insertCart: InsertCart, cartId: number): Promise<CartProductEntity> {
        return this.cartProductRepository.save({
            amount: insertCart.amount,
            productId: insertCart.productId,
            cartId
        });
    }

    async insertProductInCart(insertCart: InsertCart, cart: CartEntity): Promise<CartProductEntity> {

        await this.productService.findProductById(insertCart.productId);

        const cartProduct = await this.verifyProductInCart(insertCart.productId, cart.id).catch(() => undefined);

        if(!cartProduct){
            return this.createProductInCart(insertCart, cart.id);
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: cartProduct.amount + insertCart.amount
        });
    }

    async deleteProductCart(productId: string, cartId: number): Promise<DeleteResult>{
        return this.cartProductRepository.delete({
            productId,
            cartId
        });
    }

    async updateProductInCart(updateCartDTO: UpdateCartDTO, cart: CartEntity): Promise<CartProductEntity | DeleteResult> {
        await this.productService.findProductById(updateCartDTO.productId);

        const cartProduct = await this.verifyProductInCart(
            updateCartDTO.productId,
            cart.id
        );

        if(updateCartDTO.amount === 0){
            return await this.deleteProductCart(updateCartDTO.productId, cart.id);
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: updateCartDTO.amount,
        });

    }
    

}
