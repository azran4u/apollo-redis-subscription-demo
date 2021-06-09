import {
  IResolverObject,
  IResolvers,
  withFilter,
} from 'apollo-server';
import { AgeRange } from '../../../../model/ageRange';
import { pubsub } from '../../../../pubsub/pubsub';
import { UserEvents } from '../controller/user.events';
import { Ids, UserWithAgeUpdate } from '../user.model';
import {
  UsersChangesSubscriptionFilter,
  UsersChangesSubscriptionPayload,
} from './subscription.update.type';
import _, { filter } from 'lodash';

// export const usersChangesByIdsSubscription = {
//   subscribe: withFilter(
//     () => pubsub.asyncIterator(UserEvents.USERS_CHANGED),
//     (
//       rootValue?: {
//         usersChangesByIds: { updated: string[]; deleted: string[] };
//       },
//       args?: any,
//       context?: any,
//       info?: any,
//     ) => {
//       return true;
//     },
//   ),
// };

export const usersChangesSubscription: IResolverObject = {
  resolve: (
    source: UsersChangesSubscriptionPayload,
    args: UsersChangesSubscriptionFilter,
    context,
    info,
  ) => {
    const res = isRelevant(source, args);
    const updated = res.usersChanges.updated.map((x) => x.id);
    const deleted = res.usersChanges.deleted.map((x) => x.id);
    return { updated, deleted };
  },

  subscribe: withFilter(
    () => pubsub.asyncIterator(UserEvents.USERS_CHANGED),
    (
      rootValue?: UsersChangesSubscriptionPayload,
      args?: UsersChangesSubscriptionFilter,
      context?: any,
      info?: any,
    ) => {
      const res = isRelevant(rootValue, args);
      return (
        res.usersChanges.deleted.length > 0 ||
        res.usersChanges.updated.length > 0
      );
    },
  ),
};

function isRelevant(
  payload: UsersChangesSubscriptionPayload,
  args?: UsersChangesSubscriptionFilter,
): UsersChangesSubscriptionPayload {
  const res: UsersChangesSubscriptionPayload = {
    usersChanges: { updated: [], deleted: [] },
  };
  if (args.filter.ids.length > 0) {
    res.usersChanges.updated = payload.usersChanges.updated.filter(
      (x) => {
        return args.filter.ids.includes(x.id);
      },
    );
    res.usersChanges.deleted = payload.usersChanges.deleted.filter(
      (x) => {
        return args.filter.ids.includes(x.id);
      },
    );
  } else if (
    args.filter.age &&
    args.filter.age.from &&
    args.filter.age.to
  ) {
    res.usersChanges.updated = payload.usersChanges.updated.filter(
      (x) => {
        return (
          x.age >= args.filter.age.from && x.age <= args.filter.age.to
        );
      },
    );
    res.usersChanges.deleted = payload.usersChanges.deleted.filter(
      (x) => {
        return (
          x.age >= args.filter.age.from && x.age <= args.filter.age.to
        );
      },
    );
  }
  return res;
}
