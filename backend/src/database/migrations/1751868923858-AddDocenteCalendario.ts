import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDocenteCalendario1751868923858 implements MigrationInterface {
    name = 'AddDocenteCalendario1751868923858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendario" ADD "docenteAsignado" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendario" DROP COLUMN "docenteAsignado"`);
    }

}
