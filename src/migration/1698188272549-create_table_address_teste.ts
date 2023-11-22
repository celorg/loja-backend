import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableAddressTeste1698188272549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'address',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'number',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'city_id',
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
            'address',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'user_id_address_fk'
            })
        )

        await queryRunner.createForeignKey(
            'address',
            new TableForeignKey({
                columnNames: ['city_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'city',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'city_id_address_fk'
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('address');

        const foreignKeyCity = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('city_id') !== -1,
        )
        await queryRunner.dropForeignKey('address', foreignKeyCity);

        const foreignKeyUser = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('user_id') !== -1,
        );
        await queryRunner.dropForeignKey('address', foreignKeyUser);

        await queryRunner.dropTable('address');
    }

}
