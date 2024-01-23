import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1706001294073 implements MigrationInterface {
  name = 'CreateUserTable1706001294073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "isActive" boolean NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
