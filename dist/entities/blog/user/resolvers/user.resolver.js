"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const mutation_removeUser_resolver_1 = require("./mutation.removeUser.resolver");
const mutation_addUser_resolver_1 = require("./mutation.addUser.resolver");
const query_getAllUsers_resolver_1 = require("./query.getAllUsers.resolver");
const mutation_editUser_resolver_1 = require("./mutation.editUser.resolver");
const subscription_user_added_1 = require("./subscription.user.added");
const subscription_user_deleted_1 = require("./subscription.user.deleted");
const mutation_changeUsers_resolver_1 = require("./mutation.changeUsers.resolver");
const subscription_usersChanged_1 = require("./subscription.usersChanged");
const userResolver = {
    Query: {
        getAllUsers: query_getAllUsers_resolver_1.getAllUsers,
    },
    Mutation: {
        addUser: mutation_addUser_resolver_1.addUser,
        removeUser: mutation_removeUser_resolver_1.removeUser,
        editUser: mutation_editUser_resolver_1.editUser,
        changeUsers: mutation_changeUsers_resolver_1.changeUsers,
    },
    Subscription: {
        userAdded: subscription_user_added_1.userAddedSubscription,
        userDeleted: subscription_user_deleted_1.userDeletedSubscription,
        usersChanges: subscription_usersChanged_1.usersChangesSubscription,
    },
};
exports.userResolver = userResolver;
//# sourceMappingURL=user.resolver.js.map