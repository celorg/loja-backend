import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestBody {
  @IsEmail(undefined, {message: 'Insira um email válido'})
  email: string;

  @IsNotEmpty({message: 'A senha é obrigatória!'})
  password: string;
}