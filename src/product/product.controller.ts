import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProduct } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ReturnInfoProduct } from './dtos/return-info-product';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin, UserType.User)
  @Get()
  async findAll(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll()).map(
      (product) => new ReturnProduct(product),
    );
  }

  @Roles(UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProduct,
  ): Promise<ReturnProduct> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: string,
  ): Promise<DeleteResult> {
    return this.productService.delelteProduct(productId);
  }

  @Roles(UserType.Admin)
  @Patch('/:productId')
  async updateProduct(
    @Body() updateProduct: UpdateProductDTO,
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProduct, productId);
  }

  @Roles(UserType.Admin, UserType.User)
  @Get('/:productId/delivery/:cep')
  async findPriceDelivery(
    @Param('productId') productId: string,
    @Param('cep') cep: string,
  ): Promise<any> {
    return this.productService.findPriceDelivery(cep, productId);
  }

  @Roles(UserType.Admin)
  @Get('/:productId/info')
  async findProductInfo(
    @Param('productId') productId: string,
  ): Promise<ReturnInfoProduct> {
    return new ReturnInfoProduct(
      await this.productService.findProductById(productId),
    );
  }
}
