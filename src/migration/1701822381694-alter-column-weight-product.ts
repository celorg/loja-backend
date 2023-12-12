import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterColumnWeightProduct1701822381694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'weight');
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'weight',
                type: 'decimal',
                precision: 10,
                scale: 2,
                default: 1.0,
                isNullable: false
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'weight');
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'weight',
                type: 'decimal',
                precision: 10,
                scale: 2,
                default: 1.0
            })
        );
    }

}
