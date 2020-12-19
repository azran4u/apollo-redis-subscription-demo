import { IFieldResolver } from "graphql-tools";
import { UserContext } from "../user.context";
import { userController } from "../controller/user.controller";
import { User } from "../user.model";

export const editUser: IFieldResolver<
  any,
  UserContext,
  { user: User }
> = async (source, args, context, info) => {
  return await userController.edit(args.user);
};
