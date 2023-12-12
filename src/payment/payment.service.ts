import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { CreateOrderDTO } from '../order/dtos/create-order.dto';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentType } from '../payment_status/enums/payment-type.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { CartProductEntity } from '../cart-product/entities/cart-product.entity';

@Injectable()
export class PaymentService {
    constructor(
        @Inject('PAYMENT_REPOSITORY')
        private readonly paymentRepository: Repository<PaymentEntity>
    ){}

    generateFinalPrice(cart: CartEntity, products: ProductEntity[]) {
        const finalPrice = cart.cartProduct?.map((cartProduct: CartProductEntity) => {
            const product = products.find((product) => product.id === cartProduct.productId);
            if(product){
                return cartProduct.amount + product?.price;
            }

            return 0;
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        return finalPrice;
    }

    async createPayment(createOrderDTO: CreateOrderDTO, products: ProductEntity[], cart: CartEntity): Promise<PaymentEntity> {
        console.log(createOrderDTO)
        const finalPrice = cart.cartProduct?.map((cartProduct: CartProductEntity) => {
            const product = products.find((product) => product.id === cartProduct.productId);
            if(product){
                return cartProduct?.amount * product?.price;
            }

            return 0;
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        if(createOrderDTO.amountPayments){

            const paymentCreditCard = new PaymentCreditCardEntity(
                PaymentType.Done, 
                finalPrice, 
                0, 
                finalPrice, 
                createOrderDTO
            );
            return this.paymentRepository.save(paymentCreditCard);

        }else if(createOrderDTO.codePix && createOrderDTO.datePayment) {
            const paymentPix = new PaymentPixEntity(
                PaymentType.Done, 
                finalPrice, 
                0, 
                finalPrice, 
                createOrderDTO);
            return this.paymentRepository.save(paymentPix);
        }

        throw new BadRequestException('Credito ou pix não encontrado!');
    }

    

}
