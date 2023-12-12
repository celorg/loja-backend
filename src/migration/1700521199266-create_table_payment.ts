import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTablePayment1700521199266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'payment',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'status_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: 'discount',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: true
                    },
                    {
                        name: 'final_price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'amount_payments',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'date_payment',
                        type: 'timestamp',
                        isNullable: true
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
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('payment');
    }

}
