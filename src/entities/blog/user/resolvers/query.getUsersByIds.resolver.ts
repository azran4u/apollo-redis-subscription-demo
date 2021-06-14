import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { Ids } from '../user.model';

export const getUsersByIds: IFieldResolver<
  any,
  UserContext,
  { ids: Ids }
> = (source, args, context, info) => {
  return UserController.getByIds(args.ids);
};
