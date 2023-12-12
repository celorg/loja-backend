import { IsNumber, IsString } from "class-validator";


export class InsertCart {
    @IsString()
    productId: string;

    @IsNumber()
    amount: number;
}