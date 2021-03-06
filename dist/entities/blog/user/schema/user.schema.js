"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const apollo_server_1 = require("apollo-server");
const _1 = require(".");
const user_resolver_1 = require("../resolvers/user.resolver");
const user_input_type_1 = require("./user.input.type");
const user_mutation_1 = require("./user.mutation");
const user_subscription_1 = require("./user.subscription");
const entity_update_type_1 = require("../../../shared/entity.update.type");
const userSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: [
        user_input_type_1.userInput,
        _1.userType,
        _1.userQuery,
        user_mutation_1.userMutation,
        user_subscription_1.userSubscription,
        entity_update_type_1.entityUpdateType,
        user_subscription_1.userSubscriptionFilter,
        user_subscription_1.intRange,
    ],
    resolvers: [user_resolver_1.userResolver],
});
exports.userSchema = userSchema;
//# sourceMappingURL=user.schema.js.map