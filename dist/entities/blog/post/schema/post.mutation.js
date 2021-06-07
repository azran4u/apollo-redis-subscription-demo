"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMutation = void 0;
const apollo_server_1 = require("apollo-server");
const postMutation = apollo_server_1.gql `
  type Mutation {
    addPost(post: PostInput!): Post
    removePost(id: ID!): Post
    editPost(id: ID!, post: PostInput!): Post
  }
`;
exports.postMutation = postMutation;
//# sourceMappingURL=post.mutation.js.map