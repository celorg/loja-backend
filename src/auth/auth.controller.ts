import { Request, Controller, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dtos/returnLogin';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthRequest } from './entities/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    // @Post()
    // async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto>{
    //     return this.authService.login(loginDto);
    // }

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest){

        return this.authService.login(req.user);
    }

}

