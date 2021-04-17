"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterMutation = void 0;
const apollo_server_1 = require("apollo-server");
const counterMutation = apollo_server_1.gql `
  type Mutation {
    incrementCounter: Counter
    decrementCounter: Counter
    resetCounter: Counter
  }
`;
exports.counterMutation = counterMutation;
//# sourceMappingURL=counter.mutation.js.map