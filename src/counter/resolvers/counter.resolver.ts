import { IResolvers } from "graphql-tools";
import { getCounter } from "./query.resolver";
import {
  incrementCounter,
  decrementCounter,
  resetCounter,
} from "./mutation.resolver";

const counterResolver: IResolvers = {
  Query: {
    getCounter,
  },
  Mutation: {
    incrementCounter,
    decrementCounter,
    resetCounter,
  },
};

export { counterResolver };
