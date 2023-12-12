import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { DeleteResult, In, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProduct } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { CountProduct } from './dtos/count-product.dto';
import { CorreiosService } from 'src/correios/correios.service';
import { InfoProductDTO } from 'src/correios/dtos/size-product.dto';
import { ReturnPriceDeliveryDTO } from './dtos/return-price-delivery.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<ProductEntity>,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,

    private readonly correiosService: CorreiosService,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: {
        category: true,
      },
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('Ainda não existe nenhum produto!');
    }

    return products;
  }

  async findProductByListProductID(
    productId: string[],
  ): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      where: {
        id: In(productId),
      },
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('Ainda não existe nenhum produto!');
    }

    return products;
  }

  async createProduct(createProduct: CreateProduct): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);

    return this.productRepository.save({
      ...createProduct,
      // weight: createProduct.weight || 0,
      // height: createProduct.height || 0,
      // length: createProduct.length || 0,
      // width: createProduct.width || 0,
    });
  }

  async findProductById(productId: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return product;
  }

  async delelteProduct(productId: string): Promise<DeleteResult> {
    await this.findProductById(productId);

    return this.productRepository.delete({ id: productId });
  }

  async updateProduct(
    updateProduct: UpdateProductDTO,
    productId: string,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);

    return this.productRepository.save({
      ...product,
      ...updateProduct,
    });
  }

  async coyntProductsByCategoryId(): Promise<CountProduct[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .select('product.category_id, COUNT(*) as total')
      .groupBy('product.category_id')
      .getRawMany();
  }

  async findPriceDelivery(cep: string, idProduct: string): Promise<any> {
    const product = await this.findProductById(idProduct);

    const infoProduct = new InfoProductDTO(product);

    const returnCorreios = await this.correiosService.findPriceDelivery(
      cep,
      infoProduct,
    );

    return new ReturnPriceDeliveryDTO(returnCorreios);
  }
}
