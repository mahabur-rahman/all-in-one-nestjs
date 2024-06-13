import { Injectable } from '@nestjs/common';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, username: 'one', email: 'johnd@gmail.com' },
    { id: 2, username: 'two', email: 'two@gmail.com' },
  ];

  //   find all users
  findAll(): User[] {
    return this.users;
  }

  //   find by id
  findById(id: number): User {
    return this.users.find((user) => user.id === id);
  }
}
