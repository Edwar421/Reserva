import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEstadoToReservaMaterial1750703803038 implements MigrationInterface {
    name = 'AddEstadoToReservaMaterial1750703803038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reserva_material_estado_enum" AS ENUM('Pendiente', 'Entregado', 'Devuelto')`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ADD "estado" "public"."reserva_material_estado_enum" NOT NULL DEFAULT 'Pendiente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_material" DROP COLUMN "estado"`);
        await queryRunner.query(`DROP TYPE "public"."reserva_material_estado_enum"`);
    }

}
