import { IsNotEmpty, MinLength } from "class-validator";


export class UpdatePasswordDTO {
    @IsNotEmpty({message: 'Digite uma nova senha!'})
    @MinLength(6, {message: 'A nova senha deve ter no mínimo 6 caracteres!'})
    newPassword: string;

    @IsNotEmpty({message: 'Digite sua senha!'})
    lastPassword: string;
    
}