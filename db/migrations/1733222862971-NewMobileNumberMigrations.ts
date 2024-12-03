import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMobileNumberMigrations1733222862971
  implements MigrationInterface
{
  name = 'NewMobileNumberMigrations1733222862971';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "mobileNumber" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobileNumber"`);
  }
}
