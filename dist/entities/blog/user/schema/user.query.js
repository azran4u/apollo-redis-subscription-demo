"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuery = void 0;
const apollo_server_1 = require("apollo-server");
const userQuery = apollo_server_1.gql `
  type Query {
    getAllUsers: [User]
  }
`;
exports.userQuery = userQuery;
//# sourceMappingURL=user.query.js.map