import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { PaymentService } from '../payment/payment.service';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';
import { OrderProductEntity } from '../order-product/entities/order-product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly paymentService: PaymentService,
        private readonly cartService: CartService,
        private readonly orderProductService: OrderProductService,
        private readonly productService: ProductService,
    ) {}

    async saveOrder(
        createOrder: CreateOrderDTO,
        userId: string,
        payment: PaymentEntity
    ): Promise<OrderEntity>{
        return this.orderRepository.save({
            addressId: createOrder.addressId,
            date: new Date(),
            paymentId: payment.id,
            userId
        });
    }

    async createOrderProductUsingCart(cart: CartEntity, orderId: number, products: ProductEntity[] ) {

        return Promise.all(
            cart.cartProduct?.map((cartProduct) => {
                this.orderProductService.createOrderProduct(
                    cartProduct.productId, 
                    orderId, 
                    products.find((product) => product.id === cartProduct.productId)?.price,
                    cartProduct.amount
                )
            }));
    }

    async createOrder(createOrder: CreateOrderDTO, userId: string): Promise<OrderEntity> {
        const cart = await this.cartService.findCartWithRelations(userId);

        const products = await this.productService.findProductByListProductID(
            cart.cartProduct?.map((cartProduct) => cartProduct.productId)
        );

        const payment: PaymentEntity = await this.paymentService.createPayment(createOrder, products, cart);

        const order = await this.saveOrder(createOrder, userId, payment);

        await this.createOrderProductUsingCart(cart, order.id, products);

        await this.cartService.clearCart(userId);

        return order;
    }

    async findOrderByUserId(userId?: string, orderId?: number): Promise<OrderEntity[]> {
        const orders = await this.orderRepository.find({
            where: {
                userId,
                id: orderId
            },
            relations: {
                address: {
                    city: {
                        state: true
                    }
                },
                ordersProduct: {
                    product: true
                },
                payment: {
                    status: true
                },
                user: !!orderId
            }
        });

        if(!orders || orders.length === 0) {
            throw new NotFoundException('Não foi encontrado nenhum pedido!');
        }

        return orders

    };

    async findAllOrders(): Promise<OrderEntity[]>{
        const orders = await this.orderRepository.find({
            relations: {
                user: true
            }
        });

        if(!orders || orders.length === 0) {
            throw new NotFoundException('Ainda não existe nenhum pedido!');
        }

        const ordersProduct = await this.orderProductService.findAmountProductsByOrderId(
            orders.map((order) => order.id)
        );

        return orders.map((order) => {
            const orderProduct = ordersProduct.find(
                (CurrentorderProduct) => CurrentorderProduct.order_id === order.id
            );

            if(orderProduct) {
                return {
                    ...order,
                    amountProducts: Number(orderProduct.total)
                }
            };

            return order;
        });
    }

    async findOrderByOrderId(orderId: number): Promise<OrderEntity[]> {
        const orders = await this.orderRepository.find({
            where: {
                id: orderId,
            },
            relations: {
                address: true,
                ordersProduct: {
                    product: true
                },
                payment: {
                    status: true
                },
            }
        });

        if(!orders || orders.length === 0) {
            throw new NotFoundException('Não foi encontrado nenhum pedido!');
        }

        return orders

    };

}
