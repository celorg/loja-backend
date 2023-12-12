import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ReturnCepExternalDto } from './dtos/return-cep-external.dto';
import { CityService } from '../city/city.service';
import { ReturnCepDto } from './dtos/return-cep.dto';
import { CityEntity } from '../city/entities/city.entity';
import { ReponsePriceMercadoPago } from './dtos/response-price-mercado-pago.dto';
import { InfoProductDTO } from './dtos/size-product.dto';


@Injectable()
export class CorreiosService {

    URL_CORREIOS = process.env.URL_CEP;
    URL_PRECO_FRETE = process.env.URL_PRECO_FRETE;
    CEP_COMPANY = process.env.CEP_COMPANY;
    TOKEN_MELHOR_ENVIO = process.env.TOKEN_MELHOR_ENVIO;

    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService
        
    ) {}

    async findAdressByCep(cep: string): Promise<ReturnCepDto> {
        const api: ReturnCepExternalDto = await this.httpService.axiosRef
            .get<ReturnCepExternalDto>(this.URL_CORREIOS.replace('{CEP}', cep))
                .then((result) => {
                    return result.data;
                }).catch((err: AxiosError) => {
                    throw new BadRequestException('Erro de conexão! ' + err.message)
                });

        if(api.erro === true){
            throw new NotFoundException('CEP não encontrado!');
        }

        const city: CityEntity | undefined = await this.cityService.findCityByName(api.localidade, api.uf)
            .catch(() => undefined);

        return new ReturnCepDto(api, city?.id , city?.state?.id);
    }

    async findPriceDelivery(cep: string, infoProduct: InfoProductDTO): Promise<ReponsePriceMercadoPago[] | undefined> {
        const axiosConfig = {
            headers: {
              'Authorization': `Bearer ${this.TOKEN_MELHOR_ENVIO}`,
              'User-Agent': 'Aplicação marcelo.ribeiro.gomes@hotmail.com',
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          };
        // console.log(postal_code)
        let args = {
            from: {postal_code: this.CEP_COMPANY},
            to: {postal_code: cep},
            products: infoProduct,
            options: {
                "insurance_value": infoProduct.insurance_value,
                "receipt": false,
                "own_hand": false
            },
          };
        try {
            const response: ReponsePriceMercadoPago[] = await this.httpService.axiosRef.post(
                this.URL_PRECO_FRETE,
                args,
                axiosConfig
            ).then((res) => res.data);

            return response.filter((res) => res.error === undefined);

        }catch(err){
            throw new BadRequestException('Erro ao calcular o frete');
        }

    }

}
