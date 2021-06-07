"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuery = void 0;
const apollo_server_1 = require("apollo-server");
const postQuery = apollo_server_1.gql `
  type Query {
    getAllPosts: [Post]
  }
`;
exports.postQuery = postQuery;
//# sourceMappingURL=post.query.js.map