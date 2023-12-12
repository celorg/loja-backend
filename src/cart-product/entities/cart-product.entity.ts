import { CartEntity } from "src/cart/entities/cart.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'cart_product'})
export class CartProductEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'cart_id', nullable: false})
    cartId: number;

    @Column({name: 'product_id', nullable: false})
    productId: string;

    @Column({name: 'amount', nullable: false})
    amount: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.cartProduct)
    @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
    product?: ProductEntity;

    @ManyToOne(() => CartEntity, (cart: CartEntity) => cart.cartProduct)
    @JoinColumn({name: 'cart_id', referencedColumnName: 'id'})
    cart?: CartEntity;

}