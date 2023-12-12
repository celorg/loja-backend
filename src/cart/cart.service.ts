import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { InsertCart } from './dtos/insert-cart.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { UpdateCartDTO } from './dtos/update-cart.dto';

const LINE_AFFETED= 1;

@Injectable()
export class CartService {
    constructor(
        @Inject('CART_REPOSITORY')
        private readonly cartRepository: Repository<CartEntity>,
        private readonly cartProductService: CartProductService
    ){}

    async clearCart(userId: string): Promise<DeleteResult> {

        const cart = await this.findCartByUserId(userId);

        await this.cartRepository.save({
            ...cart,
            active: false
        });

        return {
            raw: [],
            affected: LINE_AFFETED,
        }
    }

    async findCartByUserId(userId: string) {

        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true
            },
            
        });

        if(!cart){
            await this.createCart(userId);
        }

        return cart;
    }

    async findCartWithRelations(userId: string): Promise<CartEntity>{
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true
            },
            relations: {
                cartProduct: {
                    product: true
                }
            }
        });

        if(!cart){
            throw new NotFoundException('Nenhum produto foi adicionado!');
        }

        return cart;
    }

    async createCart(userId: string): Promise<CartEntity>{
        return this.cartRepository.save({
            active: true,
            userId,
        })
    }

    async insertProductInCart(insertCart: InsertCart, userId: string): Promise<CartEntity>{
        const cart: CartEntity = await this.findCartByUserId(userId).catch(async() => {
            return this.createCart(userId);
        });

        await this.cartProductService.insertProductInCart(insertCart, cart);

        return cart;

    }

   async deleteProductCart(productId: string, userId: string): Promise<DeleteResult> {

    const cart = await this.findCartByUserId(userId);

    return this.cartProductService.deleteProductCart(productId, cart.id);
   }

    async updateProductInCart(updateCartDTO: UpdateCartDTO, userId: string): Promise<CartEntity>{
        const cart = await this.findCartByUserId(userId);
        
        await this.cartProductService.updateProductInCart(updateCartDTO, cart);

        return cart;
    }   

}
