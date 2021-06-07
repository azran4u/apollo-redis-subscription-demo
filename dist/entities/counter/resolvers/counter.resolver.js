"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterResolver = void 0;
const query_resolver_1 = require("./query.resolver");
const mutation_resolver_1 = require("./mutation.resolver");
const pubsub_1 = __importDefault(require("./pubsub"));
const subscription_events_1 = require("./subscription.events");
const counterResolver = {
    Query: {
        getCounter: query_resolver_1.getCounter,
    },
    Mutation: {
        incrementCounter: mutation_resolver_1.incrementCounter,
        decrementCounter: mutation_resolver_1.decrementCounter,
        resetCounter: mutation_resolver_1.resetCounter,
    },
    Subscription: {
        counterChanged: {
            subscribe: () => pubsub_1.default.asyncIterator([subscription_events_1.COUNTER_CHNAGED]),
        },
    },
};
exports.counterResolver = counterResolver;
//# sourceMappingURL=counter.resolver.js.map