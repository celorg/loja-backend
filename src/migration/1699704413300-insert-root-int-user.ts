import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertRootIntUser1699704413300 implements MigrationInterface {

    // Senha: 123456
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO user(id, name, email, cpf, type_user, phone, password) VALUES ('798rb746-6288-3886-78l8-2e2sf7t766ge','root', 'root@root.com', '12345678904', 2 ,'11957475568', '$2b$10$AJsDtI40oRXU8Q5FzoSG7e5k3xwZGBQha8s81qU2zp2hhisx9.QN2' )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM user WHERE email like 'root@root.com'`)
    }

}
