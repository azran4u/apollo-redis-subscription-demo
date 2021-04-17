"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterSubscription = void 0;
const apollo_server_1 = require("apollo-server");
const counterSubscription = apollo_server_1.gql `
  type Subscription {
    counterChanged: Counter
  }
`;
exports.counterSubscription = counterSubscription;
//# sourceMappingURL=counter.subscription.js.map