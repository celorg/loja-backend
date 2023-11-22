import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ) {}

    async createAddress(createAddressDto: CreateAddressDto, userId: string) {
        
        await this.userService.getUserById(userId);
        await this.cityService.findCityById(createAddressDto.cityId);

        return this.addressRepository.save({
            ...createAddressDto,
            userId
        });
    }

}
