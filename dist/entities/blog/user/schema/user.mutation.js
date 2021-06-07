"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutation = void 0;
const apollo_server_1 = require("apollo-server");
const userMutation = apollo_server_1.gql `
  type Mutation {
    addUser(user: UserInput!): User
    removeUser(id: ID!): User
    editUser(id: ID!, user: UserInput!): User
  }
`;
exports.userMutation = userMutation;
//# sourceMappingURL=user.mutation.js.map