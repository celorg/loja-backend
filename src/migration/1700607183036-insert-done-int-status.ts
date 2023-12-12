import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertDoneIntStatus1700607183036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO payment_status(id, name) VALUES(1, 'Done')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE from payment_status WHERE id = 1`);
    }

}
