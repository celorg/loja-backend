import { IsNumber, IsString } from "class-validator";


export class UpdateCartDTO {
    @IsString()
    productId: string;

    @IsNumber()
    amount: number;
}