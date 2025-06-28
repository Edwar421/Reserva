import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCantDisponible1751148341814 implements MigrationInterface {
    name = 'AddCantDisponible1751148341814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" ADD "cantidadDisponible" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" DROP COLUMN "cantidadDisponible"`);
    }

}
