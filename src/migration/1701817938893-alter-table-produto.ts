import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableProduto1701817938893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'height',
                type: 'int',
                default: 0,
                isNullable: false
            })
        ),
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'width',
                type: 'int',
                default: 0,
                isNullable: false
            })
        ),
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'length',
                type: 'int',
                default: 0,
                isNullable: false
            })
        ),
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'weight',
                type: 'decimal',
                precision: 3,
                scale: 2,
                default: 0.0,
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'height');
        await queryRunner.dropColumn('product', 'width');
        await queryRunner.dropColumn('product', 'length');
        await queryRunner.dropColumn('product', 'weight');
    }

}
