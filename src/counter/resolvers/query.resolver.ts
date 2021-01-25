import { IFieldResolver } from "graphql-tools";
import { counterController } from "../controller/counter.controller";
import { CounterContext } from "../counter.context";

export const getCounter: IFieldResolver<any, CounterContext> = async (
  source,
  args,
  context,
  info
) => {
  return await counterController.getCounter();
};
