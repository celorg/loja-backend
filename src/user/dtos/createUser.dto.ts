import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    
    @IsString({message: 'O nome deve ser do tipo texto'})
    @MinLength(3,{ message: 'O nome deve ter no mínimo 3 caracteres' })
    @IsNotEmpty({message: 'O campo nome é obrigatorio!'})
    name: string;

    @IsEmail(undefined, {message: 'Insira um email valido'})
    email: string;

    @IsString({message: 'O telefone é do tipo string'})
    phone: string;

    @IsString({message: 'O cpf é do tipo string'})
    cpf: string;

    @MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
    password: string;
}