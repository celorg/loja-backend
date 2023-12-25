import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dtos/returnLogin';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto>{
        return this.authService.login(loginDto);
    }

}
