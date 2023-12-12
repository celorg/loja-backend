import { ReturnCepExternalDto } from "./return-cep-external.dto";


export class ReturnCepDto {
    cep: string;
    puclicPlace: string;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
    ddd: string;
    cityId?: number;
    stateId?: number;
    
    constructor(cepExternal: ReturnCepExternalDto, cityId: number, stateId: number){
        this.cep = cepExternal.cep;
        this.puclicPlace = cepExternal.logradouro
        this.neighborhood = cepExternal.bairro;
        this.complement = cepExternal.complemento;
        this.city = cepExternal.localidade;
        this.uf = cepExternal.uf;
        this.ddd = cepExternal.ddd;
        this.cityId = cityId;
        this.stateId = stateId;
    }
}