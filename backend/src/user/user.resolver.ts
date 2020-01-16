import { userController } from './user.controller';
const userResolver = {
  Query: {
    users(root: any, args: any, context: any) {
      return userController.getAllUsers();
    },
  },
};

export { userResolver };
