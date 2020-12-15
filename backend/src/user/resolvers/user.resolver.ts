import { IResolvers } from "graphql-tools";
import { removeUser } from "./mutation.removeUser.resolver";
import { addUser } from "./mutation.addUser.resolver";
import { getAllUsers } from "./query.getAllUsers.resolver";

const userResolver: IResolvers = {
  Query: {
    getAllUsers,
  },
  Mutation: {
    addUser,
    removeUser,
  },
};

export { userResolver };
