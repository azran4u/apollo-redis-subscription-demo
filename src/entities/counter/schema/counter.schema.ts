import { makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { counterResolver } from "../resolvers/counter.resolver";
import { counterMutation } from "./counter.mutation";
import { counterQuery } from "./counter.query";
import { counterSubscription } from "./counter.subscription";
import { counterType } from "./counter.type";

const counterSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [counterType, counterQuery, counterMutation, counterSubscription],
  resolvers: counterResolver,
});

export { counterSchema };
