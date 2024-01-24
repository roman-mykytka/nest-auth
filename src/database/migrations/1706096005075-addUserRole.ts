import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1706096005075 implements MigrationInterface {
  name = 'AddUserRole1706096005075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
    "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), 
    CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`,
    );
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
