import { Injectable, Inject, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserEntity } from "./entities/user.entity";
import { hash } from "bcrypt";
import { Repository } from "typeorm";

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

        const saltRounds = 10;

        const passwordHash = await hash(createUserDto.password, saltRounds);

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

    }

}