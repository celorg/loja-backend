import { ReturnOrderDto } from "../../order/dtos/return-order.dto";
import { OrderProductEntity } from "../entities/order-product.entity";
import { ReturnProduct } from "../../product/dtos/return-product.dto";


export class ReturnOrderProductDto {
    id: number;
    orderId: number;
    productId: string;
    amount: number;
    price: number;
    order?: ReturnOrderDto;
    product?: ReturnProduct;

    constructor(orderProduct: OrderProductEntity) {
        this.id = orderProduct.id;
        this.orderId = orderProduct.orderId;
        this.product = orderProduct.product;
        this.amount = orderProduct.amount;
        this.price = orderProduct.price;
        this.order = orderProduct.order ? new ReturnOrderDto(orderProduct.order) : undefined;
        this.product = orderProduct.product ? new ReturnProduct(orderProduct.product) : undefined;
    }
}