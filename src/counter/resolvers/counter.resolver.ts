import { IResolvers } from "graphql-tools";
import { getCounter } from "./query.resolver";
import {
  incrementCounter,
  decrementCounter,
  resetCounter,
} from "./mutation.resolver";
import pubsub from "./pubsub";
import { COUNTER_CHNAGED } from "./subscription.events";

const counterResolver: IResolvers = {
  Query: {
    getCounter,
  },
  Mutation: {
    incrementCounter,
    decrementCounter,
    resetCounter,
  },
  Subscription: {
    counterChanged: {
      subscribe: () => pubsub.asyncIterator([COUNTER_CHNAGED]),
    },
  },
};

export { counterResolver };
