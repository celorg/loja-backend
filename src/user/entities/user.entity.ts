import { CartEntity } from "../../cart/entities/cart.entity";
import { AddressEntity } from "../../address/entities/address.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "../../order/entities/order.entity";

@Entity({name: 'user'})
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @Column({name: 'phone'})
    phone: string;

    @Column({name: 'cpf', nullable: false})
    cpf: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({name: 'type_user', nullable: false})
    typeUser: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses?: AddressEntity[];

    @OneToMany(() => CartEntity, (cart: CartEntity) => cart.user)
    carts?: CartEntity[];

    @OneToMany(() => OrderEntity, (order: OrderEntity) => order.user)
    orders?: OrderEntity[];

}