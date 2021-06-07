"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateType = void 0;
const apollo_server_1 = require("apollo-server");
const userUpdateType = apollo_server_1.gql `
  type UserUpdate {
    updated: [ID]!
    deleted: [ID]!
  }
`;
exports.userUpdateType = userUpdateType;
//# sourceMappingURL=user.update.type.js.map