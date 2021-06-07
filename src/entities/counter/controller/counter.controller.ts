import { Counter } from "../counter.model";

const counter: Counter = { value: 0 };
const counterController = {
  getCounter: async (): Promise<Counter> => counter,
  increment: async (): Promise<Counter> => {
    counter.value++;
    return counter;
  },
  decrement: async (): Promise<Counter> => {
    counter.value--;
    return counter;
  },
  reset: async (): Promise<Counter> => {
    counter.value = 0;
    return counter;
  },
};

export { counterController };
