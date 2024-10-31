import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  // Project Basic Information
  @Column({ length: 255 })
  projectName: string;

  @Column({ length: 255 })
  projectTag: string;

  @Column({ type: 'date', nullable: true })
  completionDate: Date;

  @Column({ length: 50 })
  projectStatus: string;

  @Column({ length: 255 })
  unitType: string;

  @Column({ type: 'int', nullable: true })
  floors: number;

  @Column({ length: 255, nullable: true })
  furnishing: string;

  @Column({ length: 255, nullable: true })
  serviceCharge: string;

  @Column({ length: 255, nullable: true })
  readinessProgress: string;

  // Financial Information
  @Column({ length: 10 })
  currency: string;

  @Column({ length: 50 })
  sizeUnit: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  commission: number;

  // Location Details
  @Column({ length: 255 })
  country: string;

  @Column({ length: 255, nullable: true })
  district: string;

  @Column({ length: 255, nullable: true })
  city: string;

  // Project Overview and visualizations information
  @Column({ type: 'text' })
  generalFacts: string;

  @Column({ type: 'text' })
  finishingAndMaterials: string;

  @Column({ type: 'text' })
  kitchenAndAppliances: string;

  @Column({ type: 'text' })
  furnishingDetails: string;

  @Column({ type: 'text' })
  locationDescription: string;

  // Visualizations
  @Column({ type: 'simple-array', nullable: true })
  exteriorImages: string[]; // Store file paths or URLs as an array of strings

  @Column({ type: 'simple-array', nullable: true })
  interiorImages: string[]; // Store file paths or URLs as an array of strings

  @CreateDateColumn()
  createdAt: Date;
}
