import { makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { counterMutation } from "./counter.mutation";
import { counterQuery } from "./counter.query";
import { counterType } from "./counter.type";

const counterSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [counterType, counterQuery, counterMutation],
});

export { counterSchema };
