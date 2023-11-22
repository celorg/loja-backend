import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
      private readonly jwtService: JwtService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const bearerToken = authorization && authorization.split(' ')[1];

    const loginPayload: LoginPayloadDto | undefined = await this.jwtService.verifyAsync(bearerToken, { secret: process.env.JWT_SECRET })  
      .catch(() => undefined);

    if(!loginPayload){
      throw new UnauthorizedException('Acesso negado!');
    }
    

    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}