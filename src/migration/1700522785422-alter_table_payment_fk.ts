import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AlterTablePaymentFk1700522785422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'payment',
            new TableForeignKey({
                columnNames: ['status_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'payment_status',
                name: 'status_id_payment_fk',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('payment');
        const foreignKeys = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('status_id') !== -1
        );
        await queryRunner.dropForeignKey('payment', foreignKeys);
        
    }

}
