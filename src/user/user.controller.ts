import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { ReturnUserDto } from "./dtos/returnUser.dto";
import { UpdatePasswordDTO } from "./dtos/update-password.dto";
import { UserID } from "src/decorators/user-id.decorator";
import { UserType } from "./enum/user-type.enum";
import { Roles } from "src/decorators/roles.decorator";

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ){}

    @Roles(UserType.Root)
    @Post('/admin')
    async createAdmin(@Body() createAdmin: CreateUserDto):Promise<UserEntity> {
        return this.userService.createUser(createAdmin, UserType.Admin)
    }

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Roles(UserType.Root, UserType.Admin)
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
