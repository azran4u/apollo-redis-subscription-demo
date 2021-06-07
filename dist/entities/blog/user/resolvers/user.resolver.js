"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const mutation_removeUser_resolver_1 = require("./mutation.removeUser.resolver");
const mutation_addUser_resolver_1 = require("./mutation.addUser.resolver");
const query_getAllUsers_resolver_1 = require("./query.getAllUsers.resolver");
const mutation_editUser_resolver_1 = require("./mutation.editUser.resolver");
const userResolver = {
    Query: {
        getAllUsers: query_getAllUsers_resolver_1.getAllUsers,
    },
    Mutation: {
        addUser: mutation_addUser_resolver_1.addUser,
        removeUser: mutation_removeUser_resolver_1.removeUser,
        editUser: mutation_editUser_resolver_1.editUser,
    },
};
exports.userResolver = userResolver;
//# sourceMappingURL=user.resolver.js.map