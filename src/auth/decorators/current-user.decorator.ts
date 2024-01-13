import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';
import { AuthRequest } from '../entities/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    
    return request.user;
  },
);