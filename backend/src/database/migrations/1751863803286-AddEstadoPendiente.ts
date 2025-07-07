import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEstadoPendiente1751863803286 implements MigrationInterface {
    name = 'AddEstadoPendiente1751863803286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" SET DEFAULT 'pendiente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "estado" SET DEFAULT 'activa'`);
    }

}
