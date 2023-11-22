import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableCity1697844390995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'city',
            new TableColumn({
                name: 'name',
                type: 'varchar',
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('city', 'name');
    }

}
