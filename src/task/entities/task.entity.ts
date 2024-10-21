import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  // Establishing the relationship with the User entity
  @ManyToOne(() => User, (user) => user.tasks) // This will be the inverse side of the relation
  user: User; // Reference to the user who created the task
}
