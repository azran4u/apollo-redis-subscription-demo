import { IFieldResolver } from "graphql-tools";
import { UserContext } from "../user.context";
import { userController } from "../controller/user.controller";
import { User } from "../user.model";

export const addUser: IFieldResolver<
  any,
  UserContext,
  Omit<User, "id">
> = async (source, args, context, info) => {
  return await userController.create(args);
};
