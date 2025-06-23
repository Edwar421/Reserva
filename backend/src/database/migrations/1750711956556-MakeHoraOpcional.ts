import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeHoraOpcional1750711956556 implements MigrationInterface {
    name = 'MakeHoraOpcional1750711956556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "horaInicio" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "horaFin" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "horaFin" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "horaInicio" SET NOT NULL`);
    }

}
