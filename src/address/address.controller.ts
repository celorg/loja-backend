import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserID } from 'src/decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService,
    ){}

    @Post()
    async createAddress(
            @Body() createAddressDto: CreateAddressDto,
            @UserID() userId: string
        ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId)
    }

}
