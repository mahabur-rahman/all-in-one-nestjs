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
}
