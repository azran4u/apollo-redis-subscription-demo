import { User } from './user.model';
import { users } from './user.data';
import logger from '../utils/logger';

const userController = {
  getAllUsers: async () => users,
  createUser: async (user: User) => {
    users.push(user);
    return user;
  },
  checkIfUserExistsById: async (id: string) => {
    return users.find((user) => user.id === id);
  },
  printRootAndArgs: (root: any, args: any) =>
    logger.info(`root = ${root} args=${args}`),
};

export { userController };
