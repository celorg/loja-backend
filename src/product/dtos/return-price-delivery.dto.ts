import { ReponsePriceMercadoPago } from "../../correios/dtos/response-price-mercado-pago.dto";

interface ReturnDelivery {
    deliveryTime: number;
    deliveryPrice: number;
    typeDelivery: number;
}

export class ReturnPriceDeliveryDTO {
    delivery: ReturnDelivery[]

    constructor(priceCorreios: ReponsePriceMercadoPago[]) {
        this.delivery = priceCorreios.map((priceCorreio) => ({
            deliveryPrice: Number(priceCorreio?.price),
            deliveryTime: priceCorreio?.delivery_time,
            typeDelivery: priceCorreio?.id,
            nameDelivery: priceCorreio?.name,
        }))
    }
}