import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail(undefined, {message: "Adicione um e-mail válido!", context: 'email'})
    @IsNotEmpty({message: 'O email é obrigatória!'})
    email: string;

    @IsNotEmpty({message: 'A senha é obrigatória!'})
    password: string;
}