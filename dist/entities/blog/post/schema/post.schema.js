"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const apollo_server_1 = require("apollo-server");
const post_resolver_1 = require("../resolvers/post.resolver");
const post_input_type_1 = require("./post.input.type");
const post_mutation_1 = require("./post.mutation");
const post_query_1 = require("./post.query");
const post_type_1 = require("./post.type");
const postSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: [post_input_type_1.postInput, post_type_1.postType, post_query_1.postQuery, post_mutation_1.postMutation],
    resolvers: post_resolver_1.postResolver,
});
exports.postSchema = postSchema;
//# sourceMappingURL=post.schema.js.map