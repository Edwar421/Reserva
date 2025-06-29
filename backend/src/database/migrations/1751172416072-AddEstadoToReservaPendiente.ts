import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEstadoToReservaPendiente1751172416072 implements MigrationInterface {
    name = 'AddEstadoToReservaPendiente1751172416072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."reserva_estado_enum" RENAME TO "reserva_estado_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."reserva_estado_enum" AS ENUM('activa', 'cancelada', 'completada', 'pendiente')`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" TYPE "public"."reserva_estado_enum" USING "estado"::"text"::"public"."reserva_estado_enum"`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" SET DEFAULT 'activa'`);
        await queryRunner.query(`DROP TYPE "public"."reserva_estado_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reserva_estado_enum_old" AS ENUM('activa', 'cancelada', 'completada')`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" TYPE "public"."reserva_estado_enum_old" USING "estado"::"text"::"public"."reserva_estado_enum_old"`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" SET DEFAULT 'activa'`);
        await queryRunner.query(`DROP TYPE "public"."reserva_estado_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."reserva_estado_enum_old" RENAME TO "reserva_estado_enum"`);
    }

}
