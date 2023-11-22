import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableCity1697759908261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'city',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'state_id',
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
            "city",
            new TableForeignKey({
                columnNames: ['state_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'state',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('city');
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('state_id') !== -1,
        )
        await queryRunner.dropForeignKey('city', foreignKey);
        await queryRunner.dropTable("city");
    }

}
