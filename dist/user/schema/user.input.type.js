"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInput = void 0;
const apollo_server_1 = require("apollo-server");
const userInput = apollo_server_1.gql `
  input UserInput {
    id: String
    name: String
  }
`;
exports.userInput = userInput;
//# sourceMappingURL=user.input.type.js.map