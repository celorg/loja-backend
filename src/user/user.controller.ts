import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { ReturnUserDto } from "./dtos/returnUser.dto";

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ){}

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUser(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUser()).map((user) => 
            new ReturnUserDto(user)
        );
    }

    @Get('/:userId')
    async getUserByIdUsingRelations(@Param('userId') userId: string ): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
    }

}
