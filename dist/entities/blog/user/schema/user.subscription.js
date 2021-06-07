"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSubscription = void 0;
const apollo_server_1 = require("apollo-server");
const userSubscription = apollo_server_1.gql `
  type Subscription {
    userAdded(fromAge: Int!, toAge: Int!): User
  }
`;
exports.userSubscription = userSubscription;
//# sourceMappingURL=user.subscription.js.map