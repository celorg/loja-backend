import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableState1697765069362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "state",
            new TableColumn({
                name: 'uf',
                type: 'varchar(2)',
                isNullable: false,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('state', 'uf');
    }

}
