import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoleRelations1706099753389 implements MigrationInterface {
  name = 'AddUserRoleRelations1706099753389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_role" ("roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35" PRIMARY KEY ("roleId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab40a6f0cd7d3ebfcce082131f" ON "user_role" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab40a6f0cd7d3ebfcce082131f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dba55ed826ef26b5b22bd39409"`,
    );
    await queryRunner.query(`DROP TABLE "user_role"`);
  }
}
