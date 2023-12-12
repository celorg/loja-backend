import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../database/database.module';
import { categoryProvider } from './category.provider';
import { ProductModule } from '../product/product.module';


@Module({
  imports: [
    DatabaseModule, 
    forwardRef(() => ProductModule)
  ],
  providers: [
    CategoryService,
    ...categoryProvider
  ],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
