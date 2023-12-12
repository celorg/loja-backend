import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableCartProduct1700008456044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cart_product',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'cart_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'product_id',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'amount',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })

        )

        await queryRunner.createForeignKey(
            'cart_product',
            new TableForeignKey(
                {
                    columnNames: ['cart_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'cart',
                    name: 'cart_id_cart_product_fk',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            )
        )

        await queryRunner.createForeignKey(
            'cart_product',
            new TableForeignKey(
                {
                    columnNames: ['product_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'product',
                    name: 'product_id_cart_product_fk',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            )
        );

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('cart_product');
        
        const foreignKeyCart = table.foreignKeys.find((fk) => fk.columnNames.indexOf('cart_id') !== -1);
        await queryRunner.dropForeignKey('cart_product', foreignKeyCart);

        const foreignKeyProduct = table.foreignKeys.find((fk) => fk.columnNames.indexOf('product_id') !== -1);
        await queryRunner.dropForeignKey('cart_product', foreignKeyProduct);

        await queryRunner.dropTable('cart_product');
    }

}
