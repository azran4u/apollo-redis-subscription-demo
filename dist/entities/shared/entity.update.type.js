"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityUpdateType = void 0;
const apollo_server_1 = require("apollo-server");
const entityUpdateType = apollo_server_1.gql `
  type EntityUpdate {
    updated: [ID]!
    deleted: [ID]!
  }
`;
exports.entityUpdateType = entityUpdateType;
//# sourceMappingURL=entity.update.type.js.map