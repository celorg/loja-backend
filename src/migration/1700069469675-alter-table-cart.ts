import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableCart1700069469675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'cart',
            new TableColumn({
                name: 'active',
                type: 'boolean',
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('cart', 'active');
    }

}
