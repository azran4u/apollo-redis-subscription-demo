import { withFilter } from 'apollo-server';
import { AgeRange } from '../../../../model/ageRange';
import { pubsub } from '../../../../pubsub/pubsub';
import { UserEvents } from '../controller/user.events';
import { User } from '../user.model';

export const userAddedSubscription = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(UserEvents.USER_CREATED),
    (
      rootValue?: { userAdded: User },
      args?: { age: AgeRange },
      context?: any,
      info?: any,
    ) => {
      debugger;
      const user = rootValue.userAdded;
      if (user.age >= args.age.from && user.age <= args.age.to)
        return true;
      else {
        return false;
      }
    },
  ),
};
