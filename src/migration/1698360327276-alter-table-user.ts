import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTableUser1698360327276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table user add unique(email);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
           
        `)
    }

}
