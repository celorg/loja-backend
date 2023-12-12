import { PaymentEntity } from "../entities/payment.entity";
import { ReturnPaymentStatus } from "../../payment_status/dtos/return-payment-status";


export class ReturnPaymentDto {
    id: number;
    statusId: number;
    price: number;
    discount: number;
    finalPrice: number;
    type: string;
    paymentStatus?: ReturnPaymentStatus;

    constructor(payment: PaymentEntity){
        this.id = payment.id;
        this.statusId = payment.statusId;
        this.price = payment.price;
        this.discount = payment.discount;
        this.finalPrice = payment.finalPrice;
        this.type = payment.type;
        this.paymentStatus = payment.status ? new ReturnPaymentStatus(payment.status) : undefined;
    }
}