"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const query_getAllPosts_resolver_1 = require("./query.getAllPosts.resolver");
const mutation_addPost_resolver_1 = require("./mutation.addPost.resolver");
const mutation_editPost_resolver_1 = require("./mutation.editPost.resolver");
const mutation_removePost_resolver_1 = require("./mutation.removePost.resolver");
const postResolver = {
    Query: {
        getAllPosts: query_getAllPosts_resolver_1.getAllPosts,
    },
    Mutation: {
        addPost: mutation_addPost_resolver_1.addPost,
        removePost: mutation_removePost_resolver_1.removePost,
        editPost: mutation_editPost_resolver_1.editPost,
    },
};
exports.postResolver = postResolver;
//# sourceMappingURL=post.resolver.js.map