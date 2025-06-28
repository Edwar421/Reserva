import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCalificaciones1751147750999 implements MigrationInterface {
    name = 'AddCalificaciones1751147750999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ADD "calificacion" integer`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "comentario" character varying`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "observacionesEntrega" character varying`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ADD "calificacion" integer`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ADD "comentario" character varying`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ADD "observacionesEntrega" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_material" DROP COLUMN "observacionesEntrega"`);
        await queryRunner.query(`ALTER TABLE "reserva_material" DROP COLUMN "comentario"`);
        await queryRunner.query(`ALTER TABLE "reserva_material" DROP COLUMN "calificacion"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "observacionesEntrega"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "comentario"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "calificacion"`);
    }

}
