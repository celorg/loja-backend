import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { ReturnLoginDto } from './dtos/returnLogin';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '../utils/password';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user: UserEntity | undefined = await this.userService.getUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = await validatePassword(loginDto.password, user?.password || '');

        if(!user || !isMatch ){
            throw new NotFoundException('Email ou senha inválido!');
        }

       return {
        accessToken: this.jwtService.sign({...new LoginPayloadDto(user)}),
        user: new ReturnUserDto(user)
       };

    }

}
