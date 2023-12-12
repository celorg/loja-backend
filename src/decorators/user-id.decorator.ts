import { ExecutionContext, UnauthorizedException,  createParamDecorator } from "@nestjs/common";
import { authorizationToken } from "../utils/base-64-converter";


export const UserID = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const { authorization } = ctx.switchToHttp().getRequest().headers;

        if(!authorization){
            throw new UnauthorizedException('Token invalido')
        }

        const bearerToken = authorization && authorization.split(' ')[1];

        const loginPayload = authorizationToken(bearerToken);

        if(!loginPayload?.id){
            throw new UnauthorizedException('Acesso negado!');
        }

        return loginPayload?.id;
    }
      
  );