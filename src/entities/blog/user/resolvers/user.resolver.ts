import { IResolvers } from 'graphql-tools';
import { removeUser } from './mutation.removeUser.resolver';
import { addUser } from './mutation.addUser.resolver';
import { getAllUsers } from './query.getAllUsers.resolver';
import { editUser } from './mutation.editUser.resolver';
import { userAddedSubscription } from './subscription.user.added';
import { userDeletedSubscription } from './subscription.user.deleted';
import { changeUsers } from './mutation.changeUsers.resolver';
import { usersChangesSubscription } from './subscription.usersChanged';
import { getUsersByIds } from './query.getUsersByIds.resolver';

const userResolver: IResolvers = {
  Query: {
    getAllUsers,
    getUsersByIds,
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
    usersChanges: usersChangesSubscription,
  },
};

export { userResolver };
