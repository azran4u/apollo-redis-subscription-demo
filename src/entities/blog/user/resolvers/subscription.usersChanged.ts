import { withFilter } from 'apollo-server';
import { pubsub } from '../../../../pubsub/pubsub';
import { UserEvents } from '../controller/user.events';

export const usersChangedSubscription = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(UserEvents.USERS_CHANGED),
    (
      rootValue?: {
        usersChanged: { updated: string[]; deleted: string[] };
      },
      args?: any,
      context?: any,
      info?: any,
    ) => {
      return true;
    },
  ),
};
