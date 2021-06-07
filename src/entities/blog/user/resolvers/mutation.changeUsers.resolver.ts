import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { User } from '../user.model';
import { pubsub } from '../../../../pubsub/pubsub';
import { UserEvents } from '../controller/user.events';

export const changeUsers: IFieldResolver<
  any,
  UserContext,
  { upserted: User[]; deleted: Pick<User, 'id'>[] }
> = async (source, args, context, info) => {
  const { upserted, deleted } = args;
  for (let i = 0; i < deleted.length; i++) {
    await UserController.remove(deleted[i].id);
  }
  for (let i = 0; i < upserted.length; i++) {
    await UserController.create(upserted[i]);
  }
  const upsertedIds = upserted.map((upsert) => {
    return upsert.id;
  });
  const deleteddIds = deleted.map((d) => {
    return d.id;
  });
  await pubsub.publish(UserEvents.USERS_CHANGED, {
    usersChanged: { updated: upsertedIds, deleted: deleteddIds },
  });
  return true;
};
