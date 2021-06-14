import { User, UserInput } from '../user.model';
import { v4 as uuidv4 } from 'uuid';
import { UserInputError } from 'apollo-server';
import { UserEvents } from './user.events';
import { pubsub } from '../../../../pubsub/pubsub';
export class UserController {
  constructor() {}

  private static users = new Map<string, User>();

  public static async getAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  public static async create(input: UserInput): Promise<User> {
    const user: User = {
      id: uuidv4(),
      ...input,
    };
    this.users.set(user.id, user);
    try {
      await pubsub.publish(UserEvents.USER_CREATED, {
        userAdded: user,
      });
    } catch (error) {
      console.error(
        `failed to publish event ${UserEvents.USER_CREATED} to pubsub ${error}`,
      );
    }
    return user;
  }

  public static async findById(id: string): Promise<User> {
    return this.users.get(id);
  }

  public static async getByIds(ids: string[]): Promise<User[]> {
    const res: User[] = [];
    ids.map((id) => {
      const user = this.users.get(id);
      if (user) {
        res.push(user);
      }
    });
    return res;
  }

  public static async remove(id: string): Promise<User> {
    const user = this.users.get(id);
    if (user) {
      this.users.delete(id);
      await pubsub.publish(UserEvents.USER_DELETED, {
        userDeleted: user,
      });
      return user;
    }
    return null;
  }

  public static async edit(
    id: string,
    updatedUser: UserInput,
  ): Promise<User> {
    const user = { id, ...updatedUser };
    this.users.set(id, user);
    return user;
  }
}
