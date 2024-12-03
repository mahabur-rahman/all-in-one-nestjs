import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMirgrations1733222617231 implements MigrationInterface {
  name = 'NewMirgrations1733222617231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "origin" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "origin"`);
  }
}
