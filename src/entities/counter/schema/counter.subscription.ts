import { gql } from "apollo-server";

const counterSubscription = gql`
  type Subscription {
    counterChanged: Counter
  }
`;
export { counterSubscription };
