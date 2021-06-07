import { withFilter } from 'apollo-server';
import { pubsub } from '../../../../pubsub/pubsub';
import { UserEvents } from '../controller/user.events';
import { User } from '../user.model';

export const userDeletedSubscription = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(UserEvents.USER_DELETED),
    (
      rootValue?: { userDeleted: User },
      args?: any,
      context?: any,
      info?: any,
    ) => {
      return true;
    },
  ),
};
