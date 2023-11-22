import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common";
import { authorizationToken } from "src/utils/base-64-converter";


export const UserID = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const { authorization } = ctx.switchToHttp().getRequest().headers;

        const bearerToken = authorization && authorization.split(' ')[1];

        const loginPayload = authorizationToken(bearerToken);

        if(!loginPayload?.id){
            throw new UnauthorizedException('Acesso negado!');
        }

        return loginPayload?.id;
    }
      
  );