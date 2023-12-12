import { OrderEntity } from '../../order/entities/order.entity';
import { CityEntity } from '../../city/entities/city.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Generated, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity({ name: 'address' })
export class AddressEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: string;

    @Column({ name: 'complement' })
    complement: string;

    @Column({ name: 'number', nullable: false })
    number: number;

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @Column({ name: 'city_id', nullable: false })
    cityId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity; 

    @ManyToOne(() => CityEntity, (city) => city.addresses)
    @JoinColumn({name: 'city_id', referencedColumnName: 'id'})
    city?: CityEntity; 

    @OneToMany(() => OrderEntity, (order: OrderEntity) => order.address)
    orders?: OrderEntity[];

}