import { makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { userType, userQuery } from ".";
import { userInput } from "./user.input.type";
import { userMutation } from "./user.mutation";

const userSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [userInput, userType, userQuery, userMutation],
});

export { userSchema };
