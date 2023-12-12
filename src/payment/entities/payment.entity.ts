import { PaymentStatusEntity } from "../../payment_status/entities/payment_status.entity";
import { OrderEntity } from "../../order/entities/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

@Entity({name: 'payment'})
@TableInheritance({column: {type: 'varchar', name: 'type'}})
export abstract class PaymentEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'status_id', nullable: false})
    statusId: number;

    @Column({name: 'price', type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number;

    @Column({name: 'discount', type: 'decimal', precision: 10, scale: 2, nullable: false})
    discount: number;

    @Column({name: 'final_price', type: 'decimal', precision: 10, scale: 2, nullable: false})
    finalPrice: number;

    @Column({name: 'type', nullable: false})
    type: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => OrderEntity, (order: OrderEntity) => order.payment)
    orders?: OrderEntity[];

    @ManyToOne(() => PaymentStatusEntity, (paymentStatus: PaymentStatusEntity) => paymentStatus.payments)
    @JoinColumn({name: 'status_id', referencedColumnName: 'id'})
    status?: PaymentStatusEntity;

    constructor(
        statusId: number, price: number, discount: number, finalPrice: number
    ){
        this.statusId = statusId,
        this.price = price,
        this.discount = discount,
        this.finalPrice = finalPrice
    }
}