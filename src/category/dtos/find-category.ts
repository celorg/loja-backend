import { IsString } from "class-validator";


export class FindCategory {
    @IsString()
    name: string;
}