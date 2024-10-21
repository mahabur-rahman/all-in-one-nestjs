
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column('jsonb', { nullable: true })
  tags?: {
    name: string;
    color: string;
  }[]; // Array of objects with 'name' and 'color' [ {}, {} ]


}
