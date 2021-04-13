import { IFieldResolver } from 'graphql-tools';
import { UserContext } from '../user.context';
import { UserController } from '../controller/user.controller';
import { User } from '../user.model';

export const getAllUsers: IFieldResolver<any, UserContext, any> = (
  source,
  args,
  context,
  info,
) => {
  return UserController.getAll();
};
