import { gql } from 'apollo-server';

const userSubscription = gql`
  type Subscription {
    userAdded(fromAge: Int!, toAge: Int!): User
  }
`;
export { userSubscription };
