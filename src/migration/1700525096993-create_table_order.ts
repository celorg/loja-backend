import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableOrder1700525096993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'address_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false
                    },
                    {
                        name: 'payment_id',
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
            'order',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                name: 'user_id_order_fk',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                columnNames: ['address_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'address',
                name: 'address_id_order_fk',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                columnNames: ['payment_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'payment',
                name: 'payment_id_order_fk',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order');
    }

}
