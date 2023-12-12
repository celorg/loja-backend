import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { ReturnGroupOrderDto } from './dtos/return-group-order.dto';

@Injectable()
export class OrderProductService {
    constructor(
        @Inject('ORDER_PRODUCT_REPOSITORY')
        private readonly orderProductRepository: Repository<OrderProductEntity>
    ){}

    async createOrderProduct(productId: string, orderId: number, price: number, amount: number): Promise<OrderProductEntity> {
        
        return this.orderProductRepository.save({
            amount,
            orderId,
            price,
            productId
        });
    }

    async findAmountProductsByOrderId(orderId: number[]): Promise<ReturnGroupOrderDto[]> {

        return await this.orderProductRepository
            .createQueryBuilder("order_product")
            .select("order_product.order_id, COUNT(*) as total")
            .where("order_product.order_id IN (:...ids)", { ids: orderId })
            .groupBy('order_product.order_id')
            .getRawMany();
    }

}
