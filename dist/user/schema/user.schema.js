"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const apollo_server_1 = require("apollo-server");
const _1 = require(".");
const user_resolver_1 = require("../resolvers/user.resolver");
const user_input_type_1 = require("./user.input.type");
const user_mutation_1 = require("./user.mutation");
const userSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: [user_input_type_1.userInput, _1.userType, _1.userQuery, user_mutation_1.userMutation],
    resolvers: user_resolver_1.userResolver,
});
exports.userSchema = userSchema;
//# sourceMappingURL=user.schema.js.map