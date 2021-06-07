import { IResolvers } from 'graphql-tools';
import { removeUser } from './mutation.removeUser.resolver';
import { addUser } from './mutation.addUser.resolver';
import { getAllUsers } from './query.getAllUsers.resolver';
import { editUser } from './mutation.editUser.resolver';
import { userAddedSubscription } from './subscription.user.added';

const userResolver: IResolvers = {
  Query: {
    getAllUsers,
  },
  Mutation: {
    addUser,
    removeUser,
    editUser,
  },
  Subscription: {
    userAdded: userAddedSubscription,
  },
};

export { userResolver };
