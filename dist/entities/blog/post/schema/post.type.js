"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postType = void 0;
const apollo_server_1 = require("apollo-server");
const postType = apollo_server_1.gql `
  type Post {
    id: ID!
    content: String!
    comments: [ID]!
  }
`;
exports.postType = postType;
//# sourceMappingURL=post.type.js.map