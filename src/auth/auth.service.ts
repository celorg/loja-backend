import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { ReturnLoginDto } from './dtos/returnLogin';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '../utils/password';
import { UserPayload } from './entities/UserPayload';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}

    // async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    //     // console.log(loginDto);
    //     const user: UserEntity | undefined = await this.userService.getUserByEmail(loginDto.email).catch(() => undefined);

    //     const isMatch = await validatePassword(loginDto?.password, user?.password || '');

    //     if(!user || !isMatch ){
    //         throw new NotFoundException('Email ou senha inválido!');
    //     }

    //    return {
    //     accessToken: this.jwtService.sign({...new LoginPayloadDto(user)}),
    //     user: new ReturnUserDto(user)
    //    };

    // }

    async login(user: UserEntity): Promise<ReturnLoginDto>{
        // console.log(loginDto);
        
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            typeUser: user.typeUser,
        }

        const jwtToken = this.jwtService.sign(payload);

       return {
        accessToken: this.jwtService.sign({...new LoginPayloadDto(user)}),
        user: new ReturnUserDto(user)
       };

    }

    async validateUser(email: string, password?: string) {

        const user = await this.userService.getUserByEmail(email);

        const isMatch = await validatePassword(password, user?.password || '');

        if(!user || !isMatch ){
            throw new NotFoundException('Email ou senha inválido');
        }

        return {
            ...user,
            password: undefined
        };
    }

}
