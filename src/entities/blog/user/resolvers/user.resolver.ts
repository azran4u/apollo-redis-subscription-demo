import { IResolvers } from 'graphql-tools';
import { removeUser } from './mutation.removeUser.resolver';
import { addUser } from './mutation.addUser.resolver';
import { getAllUsers } from './query.getAllUsers.resolver';
import { editUser } from './mutation.editUser.resolver';
import { userAddedSubscription } from './subscription.user.added';
import { userDeletedSubscription } from './subscription.user.deleted';
import { usersChangedSubscription } from './subscription.usersChanged';
import { changeUsers } from './mutation.changeUsers.resolver';

const userResolver: IResolvers = {
  Query: {
    getAllUsers,
  },
  Mutation: {
    addUser,
    removeUser,
    editUser,
    changeUsers,
  },
  Subscription: {
    userAdded: userAddedSubscription,
    userDeleted: userDeletedSubscription,
    usersChanged: usersChangedSubscription,
  },
};

export { userResolver };
