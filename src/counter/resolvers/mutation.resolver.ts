import { IFieldResolver } from "graphql-tools";
import { counterController } from "../controller/counter.controller";
import { CounterContext } from "../counter.context";

export const incrementCounter: IFieldResolver<any, CounterContext> = async (
  source,
  args,
  context,
  info
) => {
  return await counterController.increment();
};

export const decrementCounter: IFieldResolver<any, CounterContext> = async (
  source,
  args,
  context,
  info
) => {
  return await counterController.decrement();
};

export const resetCounter: IFieldResolver<any, CounterContext> = async (
  source,
  args,
  context,
  info
) => {
  return await counterController.reset();
};
