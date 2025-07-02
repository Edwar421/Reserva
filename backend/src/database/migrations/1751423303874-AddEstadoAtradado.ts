import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEstadoAtradado1751423303874 implements MigrationInterface {
    name = 'AddEstadoAtradado1751423303874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."reserva_material_estado_enum" RENAME TO "reserva_material_estado_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."reserva_material_estado_enum" AS ENUM('Pendiente', 'Entregado', 'Devuelto', 'Atrasado')`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "estado" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "estado" TYPE "public"."reserva_material_estado_enum" USING "estado"::"text"::"public"."reserva_material_estado_enum"`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "estado" SET DEFAULT 'Pendiente'`);
        await queryRunner.query(`DROP TYPE "public"."reserva_material_estado_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reserva_material_estado_enum_old" AS ENUM('Pendiente', 'Entregado', 'Devuelto')`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "estado" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "estado" TYPE "public"."reserva_material_estado_enum_old" USING "estado"::"text"::"public"."reserva_material_estado_enum_old"`);
        await queryRunner.query(`ALTER TABLE "reserva_material" ALTER COLUMN "estado" SET DEFAULT 'Pendiente'`);
        await queryRunner.query(`DROP TYPE "public"."reserva_material_estado_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."reserva_material_estado_enum_old" RENAME TO "reserva_material_estado_enum"`);
    }

}
