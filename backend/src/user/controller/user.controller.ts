import { User, UserInput } from "../user.model";
import { users } from "./user.data";
import logger from "../../utils/logger";
import { v4 as uuidv4 } from "uuid";

const userController = {
  getAll: async (): Promise<User[]> => users,
  create: async (input: UserInput): Promise<User> => {
    const id = uuidv4();
    const user = {
      name: input.name,
      id: id,
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
};

export { userController };
