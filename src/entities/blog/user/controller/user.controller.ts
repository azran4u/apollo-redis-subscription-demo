import { User, UserInput } from '../user.model';
import { v4 as uuidv4 } from 'uuid';
import { UserInputError } from 'apollo-server';

export class UserController {
  constructor() {}

  private static users: User[] = [];

  public static async getAll(): Promise<User[]> {
    return this.users;
  }

  public static async create(input: UserInput): Promise<User> {
    const user: User = {
      id: uuidv4(),
      ...input,
    };
    this.users.push(user);
    return user;
  }

  public static async findById(id: string): Promise<User> {
    return this.users.find((user) => {
      user.id === id;
    });
  }

  public static async remove(id: string): Promise<User> {
    const index = this.users.findIndex((user) => {
      return id === user.id;
    });
    const user = this.users[index];
    if (index > -1) {
      this.users.splice(index, 1);
    }
    return user;
  }

  public static async edit(
    id: string,
    updatedUser: UserInput,
  ): Promise<User> {
    const index = this.users.findIndex((user) => {
      return id === user.id;
    });
    if (index > -1) {
      this.users[index] = { id, ...updatedUser };
      return this.users[index];
    } else {
      console.error(`can't edit user ${JSON.stringify(updatedUser)}`);
      throw new UserInputError('edit user arguments invalid', {
        invalidArgs: updatedUser,
      });
    }
  }
}
