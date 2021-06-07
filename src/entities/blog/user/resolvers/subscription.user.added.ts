import { withFilter } from 'apollo-server';
import { pubsub } from '../../../../pubsub/pubsub';
import { UserEvents } from '../controller/user.events';
import { User } from '../user.model';

export const userAddedSubscription = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(UserEvents.USER_CREATED),
    (
      rootValue?: { userAdded: User },
      args?: { fromAge: number; toAge: number },
      context?: any,
      info?: any,
    ) => {
      debugger;
      const user = rootValue.userAdded;
      if (user.age >= args.fromAge && user.age <= args.toAge)
        return true;
      else {
        return false;
      }
    },
  ),
};
