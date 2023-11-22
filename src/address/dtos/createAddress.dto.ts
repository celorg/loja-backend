import { IsInt, IsNotEmpty, IsOptional, IsString,  } from "class-validator";


export class CreateAddressDto {

    @IsString()
    @IsOptional()
    complement: string;

    @IsInt({message: 'o número da deve ter um número'})
    @IsNotEmpty({message: 'Insira apenas números no número da casa'})
    number: number;

    @IsString({message: 'O cep deve ser do tipo texto'})
    cep: string;

    @IsInt({message: 'o id da cidade deve ter um número'})
    cityId: number

}