import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { User } from '../user.model';

export const removeUser: IFieldResolver<
  any,
  UserContext,
  Pick<User, 'id'>
> = async (source, args, context, info) => {
  return await UserController.remove(args.id);
};
