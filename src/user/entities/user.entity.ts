import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  profileImg: string;

  @Column()
  country: string;

  @Column({ default: '' })
  testing: string; // New field added

  @Column({ default: '' })
  hellowWorld: string; // New field added

  @Column()
  binary: false; // New field added

  @Column()
  dynamic: string; // New field added
}
