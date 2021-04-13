import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { User } from '../user.model';

export const editUser: IFieldResolver<
  any,
  UserContext,
  { user: User }
> = async (source, args, context, info) => {
  return await UserController.edit(args.user);
};
