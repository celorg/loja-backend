import { Body, Controller, Post, Get, Delete, Param, Patch } from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { InsertCart } from './dtos/insert-cart.dto';
import { CartService } from './cart.service';
import { UserID } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnCartDto } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCartDTO } from './dtos/update-cart.dto';

@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService,
    ){}

    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @Post()
    async insertProductInCart(@Body() insertCart: InsertCart, @UserID() userId: string): Promise<ReturnCartDto> {
        return new ReturnCartDto(await this.cartService.insertProductInCart(insertCart, userId));
    }   

    @Roles(UserType.User, UserType.Admin, UserType.Root)
    @Get()
    async findCartWithRelations(@UserID() userId: string): Promise<ReturnCartDto> {
        return new ReturnCartDto(await this.cartService.findCartWithRelations(userId));
    }

    @Delete()
    async clearCart(@UserID() userId: string): Promise<DeleteResult> {
        return this.cartService.clearCart(userId);
    }

    @Delete('/product/:productId')
    async deleteProductCart(@Param('productId') productId: string, @UserID() userId: string) {
        return this.cartService.deleteProductCart(productId, userId);
    }

    @Patch()
    async updateProductInCart(@Body() updatedCartDTO: UpdateCartDTO, @UserID() userId: string ): Promise<CartEntity> {
        return this.cartService.updateProductInCart(updatedCartDTO, userId);
    }
}
