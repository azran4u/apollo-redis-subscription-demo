import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { User } from '../user.model';

export const addUser: IFieldResolver<
  any,
  UserContext,
  { user: Omit<User, 'id'> }
> = async (source, args, context, info) => {
  return await UserController.create(args.user);
};
