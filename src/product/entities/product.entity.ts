import { OrderProductEntity } from '../../order-product/entities/order-product.entity';
import { CartProductEntity } from '../../cart-product/entities/cart-product.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({ name: 'image', nullable: false })
  image: string;

  @Column({ name: 'width', type: 'int', nullable: false })
  width: number;

  @Column({ name: 'height', type: 'int', nullable: false })
  heigth: number;

  @Column({ name: 'length', type: 'int', nullable: false })
  length: number;

  @Column({
    name: 'weight',
    type: 'decimal',
    precision: 3,
    scale: 2,
    nullable: false,
  })
  weight: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
  )
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;

  @OneToMany(
    () => CartProductEntity,
    (cartProduct: CartProductEntity) => cartProduct.product,
  )
  cartProduct?: CartProductEntity[];

  @OneToMany(
    () => OrderProductEntity,
    (orderProduct: OrderProductEntity) => orderProduct.product,
  )
  ordersProduct?: OrderProductEntity[];
}
