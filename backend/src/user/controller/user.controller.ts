import { User, UserInput } from "../user.model";
import { v4 as uuidv4 } from "uuid";

const users: User[] = [];
const userController = {
  getAll: async (): Promise<User[]> => users,
  create: async (input: UserInput): Promise<User> => {
    const user = {
      name: input.name,
      id: uuidv4(),
    };
    users.push(user);
    return user;
  },
  findById: async (id: string): Promise<User> => {
    return users.find((user) => {
      user.id === id;
    });
  },
  remove: async (id: string): Promise<User> => {
    const index = users.findIndex((user) => {
      return id === user.id;
    });
    const user = users[index];
    if (index > -1) {
      users.splice(index, 1);
    }
    return user;
  },
  edit: async (updatedUser: User): Promise<User> => {
    const index = users.findIndex((user) => {
      return updatedUser.id === user.id;
    });
    if (index > -1) {
      users[index].name = updatedUser.name;
      return users[index];
    } else {
      console.error(`can't edit user ${JSON.stringify(updatedUser)}`);
    }
  },
};

export { userController };
