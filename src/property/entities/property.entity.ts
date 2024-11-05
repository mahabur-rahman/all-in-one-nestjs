import { Column, PrimaryGeneratedColumn } from 'typeorm';

// completed date
class CompletionDate {
  @Column()
  quarter: string;

  @Column()
  year: string;
}

// projectStatus
export enum ProjectStatus {
  CONSTRUCTION = 'construction',
  COMPLETED = 'completed',
  PLANNED = 'planned',
}

// currency
export enum Currency {
  USD = 'USD',
  TRY = 'TRY',
  AED = 'AED',
  EUR = 'EUR',
}

// main property entity
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  // ============== Project Basic Information ==============
  @Column({ length: 255 })
  projectName: string;

  @Column()
  projectTag: string;

  @Column(() => CompletionDate)
  completionDate: CompletionDate;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
  })
  projectStatus: ProjectStatus;

  @Column('simple-array')
  unitType: string[];

  @Column()
  floors: string;

  @Column()
  Furnishing: string;

  @Column()
  serviceCharge: string;

  @Column()
  readinessProgress;

  @Column({
    type: 'enum',
    enum: Currency,
  })
  currency: Currency;

  @Column()
  sizeUnit: string;

  @Column()
  country: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column('simple-array')
  projectImages: string[];
}
