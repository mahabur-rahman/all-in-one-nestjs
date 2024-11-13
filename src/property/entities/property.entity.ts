import { Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

// Completed date - define as an embeddable class without @Entity decorator
export class CompletionDate {
  @Column()
  quarter: string;

  @Column()
  year: string;
}

// ProjectStatus enum
export enum ProjectStatus {
  CONSTRUCTION = 'construction',
  COMPLETED = 'completed',
  PLANNED = 'planned',
}

// Currency enum
export enum Currency {
  USD = 'USD',
  TRY = 'TRY',
  AED = 'AED',
  EUR = 'EUR',
}

// Main property entity
@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  // Project name
  @Column({ length: 255 })
  projectName: string;

  // Project tag
  @Column()
  projectTag: string;

  // Completion date as an embedded entity
  @Column(() => CompletionDate)
  completionDate: CompletionDate;

  // Project status
  @Column({
    type: 'enum',
    enum: ProjectStatus,
  })
  projectStatus: ProjectStatus;

  // Unit types
  @Column('simple-array')
  unitType: string[];

  // Floors
  @Column()
  floors: string;

  // Furnishing details
  @Column()
  furnishing: string;

  // Service charge
  @Column()
  serviceCharge: string;

  // Readiness progress
  @Column()
  readinessProgress: string; // Specify the type (string or another type)

  // Currency type
  @Column({
    type: 'enum',
    enum: Currency,
  })
  currency: Currency;

  // Size unit
  @Column()
  sizeUnit: string;

  // Address details
  @Column()
  country: string;

  @Column()
  district: string;

  @Column()
  city: string;

  // Project images
  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true }) // Set nullable to true
  projectImages?: string[];

  // General facts about the project
  @Column()
  projectGeneralFacts: string;

  // Finishing and materials used
  @Column()
  projectFinishingAndMaterials: string;

  // Kitchen and appliances included
  @Column()
  projectKitchenAndAppliances: string;

  // Furnishing details
  @Column()
  projectFurnishingDetails: string;

  // Exterior and interior images
  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true }) // Set nullable to true
  exteriorImages?: string[];

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true }) // Set nullable to true
  interiorImages?: string[];
}
