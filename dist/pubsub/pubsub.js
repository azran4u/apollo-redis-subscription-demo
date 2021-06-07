"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const ioredis_1 = __importDefault(require("ioredis"));
exports.pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new ioredis_1.default(),
    subscriber: new ioredis_1.default(),
    reviver,
});
function reviver(key, value) {
    if (key === 'userAdded') {
        const user = value;
        user.age += 10;
        return user;
    }
    return value;
}
//# sourceMappingURL=pubsub.js.map