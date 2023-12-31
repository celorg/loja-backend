import { Module } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CorreiosController } from './correios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from '../city/city.module';
import { SoapModule } from 'nestjs-soap';


@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    }),
    CityModule
  ],
  providers: [CorreiosService],
  controllers: [CorreiosController],
  exports: [CorreiosService]
})
export class CorreiosModule {}
