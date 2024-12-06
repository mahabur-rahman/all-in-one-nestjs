import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTestingField1677713423001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'testing' field with a default value to all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $set: { testing: '' } }, // Default value for the 'testing' field
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the 'testing' field from all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $unset: { testing: '' } }, // Remove the 'testing' field
    );
  }
}
