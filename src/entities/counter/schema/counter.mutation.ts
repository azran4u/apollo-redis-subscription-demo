import { gql } from "apollo-server";

const counterMutation = gql`
  type Mutation {
    incrementCounter: Counter
    decrementCounter: Counter
    resetCounter: Counter
  }
`;
export { counterMutation };
