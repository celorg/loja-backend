import { IsOptional, MinLength } from "class-validator";

export class UpdateCategory {
    @IsOptional()
    @MinLength(2, {message: 'O nome deve ter no mínimo 2 caracteres'})
    name: string;
}