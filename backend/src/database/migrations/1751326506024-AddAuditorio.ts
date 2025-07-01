import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditorio1751326506024 implements MigrationInterface {
    name = 'AddAuditorio1751326506024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."espacio_tipo_enum" RENAME TO "espacio_tipo_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."espacio_tipo_enum" AS ENUM('Aula', 'Laboratorio de Computación', 'Laboratorio de Física', 'Auditorio')`);
        await queryRunner.query(`ALTER TABLE "espacio" ALTER COLUMN "tipo" TYPE "public"."espacio_tipo_enum" USING "tipo"::"text"::"public"."espacio_tipo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."espacio_tipo_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."espacio_tipo_enum_old" AS ENUM('Aula', 'Laboratorio de Computación', 'Laboratorio de Física')`);
        await queryRunner.query(`ALTER TABLE "espacio" ALTER COLUMN "tipo" TYPE "public"."espacio_tipo_enum_old" USING "tipo"::"text"::"public"."espacio_tipo_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."espacio_tipo_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."espacio_tipo_enum_old" RENAME TO "espacio_tipo_enum"`);
    }

}
