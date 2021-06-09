import { gql } from 'apollo-server';

export const userSubscription = gql`
  type Subscription {
    userAdded(fromAge: Int!, toAge: Int!): User
    userDeleted: User
    usersChanges(filter: UserSubscriptionFilter): EntityUpdate
  }
`;

export const userSubscriptionFilter = gql`
  input UserSubscriptionFilter {
    ids: [ID]!
    age: IntRange
  }
`;

export const intRange = gql`
  input IntRange {
    from: Int
    to: Int
  }
`;
