import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { Ids, User, UserWithAgeUpdate } from '../user.model';
import { pubsub } from '../../../../pubsub/pubsub';
import { UserEvents } from '../controller/user.events';
import { UsersChangesSubscriptionPayload } from './subscription.update.type';

export const changeUsers: IFieldResolver<
  any,
  UserContext,
  { upserted: User[]; deleted: Ids }
> = async (source, args, context, info) => {
  const { upserted, deleted } = args;
  const res: UsersChangesSubscriptionPayload = {
    usersChanges: { updated: [], deleted: [] },
  };
  for (let i = 0; i < deleted.length; i++) {
    const id = deleted[i];
    const user = await UserController.findById(id);
    if (user) {
      await UserController.remove(deleted[i]);
      res.usersChanges.deleted.push({ id, age: user.age });
    }
  }
  for (let i = 0; i < upserted.length; i++) {
    await UserController.create(upserted[i]);
  }

  res.usersChanges.updated = upserted.map((upsert) => {
    return { id: upsert.id, age: upsert.age };
  });

  await pubsub.publish<UsersChangesSubscriptionPayload>(
    UserEvents.USERS_CHANGED,
    res,
  );
  return true;
};
