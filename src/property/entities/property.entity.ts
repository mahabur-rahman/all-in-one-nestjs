import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

// Enum for Currency
export enum Currency {
  USD = 'USD',
  TRY = 'TRY',
  AED = 'AED',
  EUR = 'EUR',
}

// Embedded entity for completion date
class CompletionDate {
  @Column({ type: 'varchar', length: 10 })
  quarter: string;

  @Column({ type: 'varchar', length: 4 })
  year: string;
}

// Embedded entity for landmarks
class Landmark {
  @Column()
  name: string;

  @Column({ type: 'float' })
  distance: number; // distance in km
}

// Embedded entity for parking facility details
class ParkingFacility {
  @Column()
  bedrooms: string;

  @Column()
  propertyType: string;

  @Column({ type: 'int' })
  parkingSpaces: number;
}

// Main Property entity
@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  // ============== Project Basic Information ==============
  @Column({ length: 255 })
  projectName: string;

  @Column({ length: 255 })
  projectTag: string;

  @Column(() => CompletionDate)
  completionDate: CompletionDate;

  @Column({ length: 50 })
  projectStatus: string;

  @Column('simple-array')
  unitType: string[];

  @Column({ type: 'int', nullable: true })
  floors: number;

  @Column({ length: 255, nullable: true })
  furnishing: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  serviceCharge: number;

  @Column({ length: 255, nullable: true })
  readinessProgress: string;

  @Column({ type: 'enum', enum: Currency })
  currency: Currency;

  @Column({ length: 50 })
  sizeUnit: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  commission: number;

  @Column({ length: 255 })
  country: string;

  @Column({ length: 255, nullable: true })
  district: string;

  @Column({ length: 255, nullable: true })
  city: string;

  // Project Images
  @Column('simple-array', { nullable: true })
  projectImageOne: string[];

  @Column('simple-array', { nullable: true })
  projectImageTwo: string[];

  @Column('simple-array', { nullable: true })
  projectImageThree: string[];

  // ===== Project Overview =====
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
  @Column('simple-array', { nullable: true })
  exteriorImages: string[];

  @Column('simple-array', { nullable: true })
  interiorImages: string[];

  // ======================== Location and Plans ========================
  @Column({ length: 500, nullable: true })
  projectLocationLink: string; // Link to Google Maps

  @Column(() => Landmark)
  landmarks: Landmark[]; // Array of landmarks

  @Column({ nullable: true })
  masterPlanImage: string;

  @Column({ nullable: true })
  buildingsImage: string;

  // ======================== Parking Facilities ========================
  @Column('simple-array', { nullable: true })
  parkingFacilityImages: string[];

  @Column(() => ParkingFacility)
  parkingDetails: ParkingFacility[];

  // Creation timestamp
  @CreateDateColumn()
  createdAt: Date;
}
