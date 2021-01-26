import { IFieldResolver } from "graphql-tools";
import { counterController } from "../controller/counter.controller";
import { CounterContext } from "../counter.context";
import pubsub from "./pubsub";
import { COUNTER_CHNAGED } from "./subscription.events";

export const incrementCounter: IFieldResolver<any, CounterContext> = async (
  source,
  args,
  context,
  info
) => {
  const res = await counterController.increment();
  pubsub.publish(COUNTER_CHNAGED, { counterChanged: res });
  return res;
};

export const decrementCounter: IFieldResolver<any, CounterContext> = async (
  source,
  args,
  context,
  info
) => {
  const res = await counterController.decrement();
  pubsub.publish(COUNTER_CHNAGED, { counterChanged: res });
  return res;
};

export const resetCounter: IFieldResolver<any, CounterContext> = async (
  source,
  args,
  context,
  info
) => {
  const res = await counterController.reset();
  pubsub.publish(COUNTER_CHNAGED, {
    counterChanged: res,
  });
  return res;
};
