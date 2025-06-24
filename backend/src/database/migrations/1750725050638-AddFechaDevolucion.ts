import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFechaDevolucion1750725050638 implements MigrationInterface {
    name = 'AddFechaDevolucion1750725050638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_material" ADD "fechaDevolucion" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ADD "fechaLimite" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_material" DROP COLUMN "fechaLimite"`);
        await queryRunner.query(`ALTER TABLE "reserva_material" DROP COLUMN "fechaDevolucion"`);
    }

}
