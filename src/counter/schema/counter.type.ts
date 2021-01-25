import { gql } from "apollo-server";

const counterType = gql`
  type Counter {
    value: Int
  }
`;

export { counterType };
