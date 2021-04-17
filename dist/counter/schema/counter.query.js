"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterQuery = void 0;
const apollo_server_1 = require("apollo-server");
const counterQuery = apollo_server_1.gql `
  type Query {
    getCounter: Counter
  }
`;
exports.counterQuery = counterQuery;
//# sourceMappingURL=counter.query.js.map