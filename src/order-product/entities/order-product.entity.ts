import { ProductEntity } from "../../product/entities/product.entity";
import { OrderEntity } from "../../order/entities/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'order_product'})
export abstract class OrderProductEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'order_id', nullable: false})
    orderId: number;

    @Column({name: 'product_id', nullable: false})
    productId: string;

    @Column({name: 'amount', nullable: false})
    amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.ordersProduct)
    @JoinColumn({name: 'order_id', referencedColumnName: 'id'})
    order?: OrderEntity;

    @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.ordersProduct)
    @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
    product?: ProductEntity;

}