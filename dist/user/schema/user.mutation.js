"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutation = void 0;
const apollo_server_1 = require("apollo-server");
const userMutation = apollo_server_1.gql `
  type Mutation {
    addUser(name: String!): User
    removeUser(id: String!): User
    editUser(user: UserInput!): User
  }
`;
exports.userMutation = userMutation;
//# sourceMappingURL=user.mutation.js.map