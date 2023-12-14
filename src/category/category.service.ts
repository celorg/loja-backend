import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { NotFoundError } from 'rxjs';
import { CreateCategory } from './dtos/create-category';
import { FindCategory } from './dtos/find-category';
import { ProductService } from '../product/product.service';
import { ReturnCategoryDto } from './dtos/return-category-dto';
import { CountProduct } from '../product/dtos/count-product.dto';

@Injectable()
export class CategoryService {

    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private readonly categoryRepository: Repository<CategoryEntity>,
        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService
    ){}

    findAmountCategoryInProducts(category: CategoryEntity, countList: CountProduct[]): number {
        const count = countList.find((item) => item.category_id === category.id);

        if(count){
            return Number(count.total);
        }

        return 0;
    }

    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        const categories = await this.categoryRepository.find();

        const count = await this.productService.coyntProductsByCategoryId();

        if(!categories || categories.length === 0){
            throw new NotFoundException('Não existe nenhuma categoria!');
        }

        return categories.map((category) => new ReturnCategoryDto(category, this.findAmountCategoryInProducts(category, count)));
    }

    async findCategoryById(categoryId: number, isRelations?: boolean): Promise<CategoryEntity>{

        const relations = isRelations ? {
            products: true
        } : undefined;

        const category = await this.categoryRepository.findOne({
            where: { id: categoryId }, 
            relations
        });

        if(!category){
            throw new NotFoundException('Essa categoria não existe!');
        }

        return category;
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        
        const category = await this.categoryRepository.findOne({
            where: {
                name
            }
        });

        if(!category){
            throw new NotFoundException('Não existe nenhuma categoria com esse nome!')
        }

        return category;

    }

    async createCategory(createCategory: CreateCategory): Promise<CategoryEntity> {

        const categoryExist = await this.findCategoryByName(createCategory.name).catch(() => undefined);

        if(categoryExist){
            throw new BadRequestException('Essa categoria já existe!');
        }

        const category = await this.categoryRepository.save(createCategory);

        if(!category){
            throw new BadRequestException('Não foi possivel adicionar a categoria!')
        }

        return category;
    }

    async deleteCategory(categoryId: number): Promise<DeleteResult> {

        const category = await this.findCategoryById(categoryId, true);

        if(category.products?.length > 0){
            throw new BadGatewayException('Existe alguns produtos relacionados a essa categoria!');
        }

        return this.categoryRepository.delete({id: categoryId});
    };

}
