import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { DatabaseModule } from 'src/database/database.module';
import { cityProvider } from './city.provider';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    DatabaseModule,
    CacheModule
  ],
  controllers: [CityController],
  providers: [
    ...cityProvider,
    CityService
  ],
  exports: [CityService]
})
export class CityModule {}
