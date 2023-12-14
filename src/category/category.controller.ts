import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReturnCategoryDto } from './dtos/return-category-dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategory } from './dtos/create-category';

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

}
