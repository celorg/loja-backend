import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserID } from '../decorators/user-id.decorator';

@Roles(UserType.User, UserType.Admin, UserType.Root)
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

    @Get()
    async findAddressById(@UserID() userId: string) {
        return this.addressService.findAddressById(userId);
    }

}
