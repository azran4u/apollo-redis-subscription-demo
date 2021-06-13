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

// filter by ids has priority over filter by age
// to filter by age, set ids=[]
function isRelevant(
  payload: UsersChangesSubscriptionPayload,
  args?: UsersChangesSubscriptionFilter,
): UsersChangesSubscriptionPayload {
  const res: UsersChangesSubscriptionPayload = {
    usersChanges: { updated: [], deleted: [] },
  };
  if (!_.isEmpty(args.filter.ids)) {
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
    !_.isEmpty(args.filter.age) &&
    _.isNumber(args.filter.age.from) &&
    _.isNumber(args.filter.age.to)
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
