import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Adicione uma categoria' })
  categoryId: number;

  @IsOptional()
  @IsString({ message: 'O nome deve ser do tipo texto' })
  @MinLength(3, {
    message: 'O nome do produto deve ter no mínimo 3 caracteres!',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNotEmpty({ message: 'A imagem do produto é obrigatória!' })
  image: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O tamanho do produto é obrigatório!' })
  width: number;

  @IsOptional()
  @IsNotEmpty({ message: 'A altura do produto é obrigatório!' })
  heigth: number;

  @IsOptional()
  @IsNotEmpty({ message: 'A largura do produto é obrigatório!' })
  length: number;

  @IsOptional()
  @IsNotEmpty({ message: 'O peso do produto é obrigatório!' })
  weight: number;
}
