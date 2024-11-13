import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  }[];

  @ManyToOne(() => User, (user) => user.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  // soft delete when the task is deleted
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
