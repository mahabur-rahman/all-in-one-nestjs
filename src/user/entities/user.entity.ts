import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { registerEnumType } from '@nestjs/graphql';
import { Task } from 'src/task/entities/task.entity';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The roles that a user can have',
});

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]; // Add this line to establish the relationship
}
