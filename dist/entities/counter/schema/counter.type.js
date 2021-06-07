"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterType = void 0;
const apollo_server_1 = require("apollo-server");
const counterType = apollo_server_1.gql `
  type Counter {
    value: Int
  }
`;
exports.counterType = counterType;
//# sourceMappingURL=counter.type.js.map