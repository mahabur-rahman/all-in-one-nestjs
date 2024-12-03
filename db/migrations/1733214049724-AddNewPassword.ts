import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewPassword1733214049724 implements MigrationInterface {
  name = 'AddNewPassword1733214049724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
  }
}
