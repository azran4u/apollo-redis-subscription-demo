"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInput = void 0;
const apollo_server_1 = require("apollo-server");
const postInput = apollo_server_1.gql `
  input PostInput {
    content: String!
    comments: [ID]!
  }
`;
exports.postInput = postInput;
//# sourceMappingURL=post.input.type.js.map