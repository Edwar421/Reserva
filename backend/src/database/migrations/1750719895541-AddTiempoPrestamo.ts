import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTiempoPrestamo1750719895541 implements MigrationInterface {
    name = 'AddTiempoPrestamo1750719895541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" ADD "tiempoPrestamo" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "tiempoPrestamo"`);
    }

}
