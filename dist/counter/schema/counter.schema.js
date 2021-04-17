"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterSchema = void 0;
const apollo_server_1 = require("apollo-server");
const counter_resolver_1 = require("../resolvers/counter.resolver");
const counter_mutation_1 = require("./counter.mutation");
const counter_query_1 = require("./counter.query");
const counter_subscription_1 = require("./counter.subscription");
const counter_type_1 = require("./counter.type");
const counterSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: [counter_type_1.counterType, counter_query_1.counterQuery, counter_mutation_1.counterMutation, counter_subscription_1.counterSubscription],
    resolvers: counter_resolver_1.counterResolver,
});
exports.counterSchema = counterSchema;
//# sourceMappingURL=counter.schema.js.map