import { ReturnCityDto } from "src/city/dtos/returnCity.dto";
import { AddressEntity } from "../entities/address.entity";


export class ReturnAddressDto {
    complement: string;
    number: number;
    cep: string;
    city: ReturnCityDto;

    constructor(address: AddressEntity){
        this.complement = address.complement;
        this.number = address.number;
        this.cep = address.cep;
        this.city = address.city ? new ReturnCityDto(address.city) : undefined;
    }
}