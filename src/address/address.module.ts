import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { addressProvider } from './address.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [DatabaseModule, UserModule, CityModule],
  controllers: [AddressController],
  providers: [
    AddressService,
    ...addressProvider
  ],

})
export class AddressModule {}
