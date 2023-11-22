import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail(undefined, {message: "Adicione um e-mail válido!"})
    email: string;

    @IsString({message: 'A senha é obrigatória'})
    password: string;
}