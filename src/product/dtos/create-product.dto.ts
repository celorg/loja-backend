import { IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";


export class CreateProduct {
    
    @IsNotEmpty({message: 'Adicione uma categoria'})
    categoryId: number;

    @IsString({message: 'O nome deve ser do tipo texto'})
    @MinLength(3,{ message: 'O nome do produto deve ter no mínimo 3 caracteres!' })
    name: string;

    @IsNumber()
    price: number;

    @IsNotEmpty({message: 'A imagem do produto é obrigatória!'})
    image: string;

    @IsNotEmpty({message: 'A altura do produto deve ser obrigatória!'})
    @IsNumber()
    height: number;

    @IsNotEmpty({message: 'A largura do produto deve ser obrigatória!'})
    @IsNumber()
    width: number;

    @IsNotEmpty({message: 'O comprimento do produto deve ser obrigatória!'})
    @IsNumber()
    length: number;

    @IsNotEmpty({message: 'O peso do produto deve ser obrigatório!'})
    @IsNumber()
    weight: number

}