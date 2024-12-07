import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBinaryField1677713424002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'binary' field with a default value to all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $set: { binary: false } }, // Default value for the 'binary' field
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the 'binary' field from all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $unset: { binary: '' } }, // Remove the 'binary' field
    );
  }
}
