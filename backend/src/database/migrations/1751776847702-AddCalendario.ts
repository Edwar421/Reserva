import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCalendario1751776847702 implements MigrationInterface {
    name = 'AddCalendario1751776847702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "FK_4070e21612ee4625e4f122eed3e"`);
        await queryRunner.query(`CREATE TABLE "calendario" ("id" SERIAL NOT NULL, "fecha" character varying NOT NULL, "horaInicio" character varying NOT NULL, "horaFin" character varying NOT NULL, "capacidad" integer NOT NULL, "disponibilidad" boolean NOT NULL, "espacioId" integer, CONSTRAINT "PK_23635c1711d60068a65edb26b41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "horaInicio"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "horaFin"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "espacioId"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "calendarioId" integer`);
        await queryRunner.query(`ALTER TABLE "material" ALTER COLUMN "tiempoPrestamo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "material" ALTER COLUMN "cantidadDisponible" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calendario" ADD CONSTRAINT "FK_9c54b9f08f5cd70553ae09d08c6" FOREIGN KEY ("espacioId") REFERENCES "espacio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "FK_1e05102890dbd5698104d5a4b52" FOREIGN KEY ("calendarioId") REFERENCES "calendario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "FK_1e05102890dbd5698104d5a4b52"`);
        await queryRunner.query(`ALTER TABLE "calendario" DROP CONSTRAINT "FK_9c54b9f08f5cd70553ae09d08c6"`);
        await queryRunner.query(`ALTER TABLE "material" ALTER COLUMN "cantidadDisponible" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "material" ALTER COLUMN "tiempoPrestamo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "calendarioId"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "espacioId" integer`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "horaFin" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "horaInicio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "fecha" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "calendario"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "FK_4070e21612ee4625e4f122eed3e" FOREIGN KEY ("espacioId") REFERENCES "espacio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
