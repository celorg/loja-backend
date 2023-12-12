import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { ReturnUserDto } from "./dtos/returnUser.dto";
import { UpdatePasswordDTO } from "./dtos/update-password.dto";
import { UserID } from "src/decorators/user-id.decorator";

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ){}

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get('/all')
    async getAllUser(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUser()).map((user) => 
            new ReturnUserDto(user)
        );
    }

    @Get('/:userId')
    async getUserByIdUsingRelations(@Param('userId') userId: string ): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
    }

    @Patch()
    async updatePasswordUser(@Body() updatePassword: UpdatePasswordDTO, @UserID() userId: string): Promise<ReturnUserDto>{
        return new ReturnUserDto(await this.userService.updatePassword(updatePassword, userId));
    }

    @Get()
    async getInfoUser(@UserID() userId: string): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.getInfoUser(userId));
    }

}
