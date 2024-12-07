import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHellowWorldField1677713423002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'hellowWorld' field with a default value to all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $set: { hellowWorld: '' } }, // Default value for the 'hellowWorld' field
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the 'hellowWorld' field from all documents in the 'users' collection
    await queryRunner.manager.getMongoRepository('users').updateMany(
      {}, // Update all documents
      { $unset: { hellowWorld: '' } }, // Remove the 'hellowWorld' field
    );
  }
}
