import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReturnCepExternalDto } from './dtos/return-cep-external.dto';
import { ReturnCepDto } from './dtos/return-cep.dto';
import { ReponsePriceMercadoPago } from './dtos/response-price-mercado-pago.dto';
import { InfoProductDTO } from './dtos/size-product.dto';

@Controller('correios')
export class CorreiosController {
    constructor(
        private readonly correiosService: CorreiosService
    ){};

    @Get(':cep')
    async findAll(@Param('cep') cep: string): Promise<ReturnCepDto> {
        return this.correiosService.findAdressByCep(cep);
    }

}
