import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDynamicField1677713424003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'dynamic' field with a default value to all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $set: { dynamic: '' } }, // Default value for the 'dynamic' field
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the 'dynamic' field from all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $unset: { dynamic: '' } }, // Remove the 'dynamic' field
    );
  }
}
