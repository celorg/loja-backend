import { Injectable, Inject, NotFoundException, BadRequestException, Get } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserEntity } from "./entities/user.entity";
import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { UpdatePasswordDTO } from "./dtos/update-password.dto";
import { createPassword, validatePassword } from "src/utils/password";
import { UserType } from "./enum/user-type.enum";
import { Roles } from "../decorators/roles.decorator";
import { ReturnUserDto } from "./dtos/returnUser.dto";

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        const emailExist = await this.getUserByEmail(createUserDto.email).catch(() => undefined);

        if(emailExist){
            throw new BadRequestException('Esse email já existe!');
        }

        const passwordHash = await createPassword(createUserDto.password);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHash
        });

    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserByIdUsingRelations(userId: string): Promise<UserEntity>{
        return this.userRepository.findOne({
            where: {
                id: userId
            }, 
            relations: {
                addresses: {
                    city: {
                        state: true
                    }
                }
            }
        })
    }

    async getUserById(userId: string): Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where: {id: userId}
        })

        if(!user){
            throw new NotFoundException('Esse usúario não existe!');
        }

        return user;

    }

    async getUserByEmail(email: string): Promise<UserEntity>{
        const user = await this.userRepository.findOne({
            where: {email}
        })

        if(!user){
            throw new NotFoundException('Esse usúario não existe!');
        }

        return user;

    };

    async updatePassword(updatePassword: UpdatePasswordDTO, userId: string): Promise<UserEntity>{
        
        const user = await this.getUserById(userId);

        const isMatch = await validatePassword(updatePassword.lastPassword, user?.password || '');

        if(!isMatch){
            throw new BadRequestException('Senha inválida!');
        }

        const passwordHash = await createPassword(updatePassword?.newPassword);

        return this.userRepository.save({
            ...user,
            password: passwordHash,
        })

    };

    @Roles(UserType.User)
    @Get()
    async getInfoUser(userId: string): Promise<UserEntity> {
        return this.getUserByIdUsingRelations(userId);
    }
    

}