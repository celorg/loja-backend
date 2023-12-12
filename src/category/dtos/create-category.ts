import { IsString, Length, MinLength } from "class-validator";


export class CreateCategory {
    @IsString()
    @MinLength(2, {message: 'O nome deve ter no mínimo 2 caracteres'})
    name: string;
}