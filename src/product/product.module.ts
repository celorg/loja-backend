import { Module, forwardRef } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from '../database/database.module';
import { productProvider } from './product.provider';
import { CategoryModule } from '../category/category.module';
import { CorreiosModule } from 'src/correios/correios.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => CategoryModule), CorreiosModule],
  controllers: [ProductController],
  providers: [
    ProductService, 
    ...productProvider
  ],
  exports: [ProductService]
})
export class ProductModule {}
