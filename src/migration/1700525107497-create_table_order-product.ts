import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableOrderProduct1700525107497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_product',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isNullable: false
                    },
                    {
                        name: 'order_id',
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
                        isNullable: false,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
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
            'order_product',
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'order',
                name: 'order_id_order_product_fk',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )

        await queryRunner.createForeignKey(
            'order_product',
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'product',
                name: 'product_id_order_product_fk',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_product');
    }

}
