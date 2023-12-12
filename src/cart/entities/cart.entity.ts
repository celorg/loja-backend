import { CartProductEntity } from "../../cart-product/entities/cart-product.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'cart'})
export class CartEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: string;

    @Column({name: 'active', nullable: false})
    active: boolean;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.carts)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user?: UserEntity;

    @OneToMany(() => CartProductEntity, (cartProduct: CartProductEntity) => cartProduct.cart)
    cartProduct?: CartProductEntity[];

}