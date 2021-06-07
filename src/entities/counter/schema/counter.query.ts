import { gql } from "apollo-server";

const counterQuery = gql`
  type Query {
    getCounter: Counter
  }
`;
export { counterQuery };
