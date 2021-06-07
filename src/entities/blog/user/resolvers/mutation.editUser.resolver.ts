import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { UserInput } from '../user.model';

export const editUser: IFieldResolver<
  any,
  UserContext,
  { id: string; user: UserInput }
> = async (source, args, context, info) => {
  return await UserController.edit(args.id, args.user);
};
