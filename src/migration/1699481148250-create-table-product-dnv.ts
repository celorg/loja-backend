import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableProductDnv1699481148250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'category_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2
                    },
                    {
                        name: 'image',
                        type: 'varchar',
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
                ],
            })
        )
        await queryRunner.createForeignKey(
            'product',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'category',
                name: 'category_id_product_fk',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('product');

        const foreignKeyCategory = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('category_id') !== -1,
        );

        await queryRunner.dropForeignKey('product', foreignKeyCategory);

        await queryRunner.dropTable('product');
    }

}
