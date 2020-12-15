import { makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { userType, userQuery } from ".";
import { userMutation } from "./user.mutation";

const userSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [userType, userQuery, userMutation],
});

export { userSchema };
