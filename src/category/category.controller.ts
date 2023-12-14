import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReturnCategoryDto } from './dtos/return-category-dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategory } from './dtos/create-category';
import { DeleteResult } from 'typeorm';
import { UpdateCategory } from './dtos/update-category.dto';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        return this.categoryService.findAllCategories();
    }

    @Roles(UserType.Admin, UserType.Root)
    @Post()
    async createCategory(@Body() createCategory: CreateCategory): Promise<ReturnCategoryDto> {
        return new ReturnCategoryDto(await this.categoryService.createCategory(createCategory))
    }

    @Roles(UserType.Admin, UserType.Root)
    @Delete('/:categoryId')
    async deleteCategory(@Param('categoryId') categoryId: number): Promise<DeleteResult> {
        return this.categoryService.deleteCategory(categoryId);
    }

    @Roles(UserType.Admin, UserType.Root)
    @Put('/:categoryId')
    async editCategory(
        @Param('categoryId') categoryId: number,
        @Body() updateCategory: UpdateCategory
    ): Promise<ReturnCategoryDto> {
        return new ReturnCategoryDto(await this.categoryService.editCategory(categoryId, updateCategory));
    }

}
