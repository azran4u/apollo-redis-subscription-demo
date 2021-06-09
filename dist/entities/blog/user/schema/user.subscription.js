"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intRange = exports.userSubscriptionFilter = exports.userSubscription = void 0;
const apollo_server_1 = require("apollo-server");
exports.userSubscription = apollo_server_1.gql `
  type Subscription {
    userAdded(fromAge: Int!, toAge: Int!): User
    userDeleted: User
    usersChanges(filter: UserSubscriptionFilter): EntityUpdate
  }
`;
exports.userSubscriptionFilter = apollo_server_1.gql `
  input UserSubscriptionFilter {
    ids: [ID]!
    age: IntRange
  }
`;
exports.intRange = apollo_server_1.gql `
  input IntRange {
    from: Int
    to: Int
  }
`;
//# sourceMappingURL=user.subscription.js.map