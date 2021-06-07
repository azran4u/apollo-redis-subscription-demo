"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeletedSubscription = void 0;
const apollo_server_1 = require("apollo-server");
const pubsub_1 = require("../../../../pubsub/pubsub");
const user_events_1 = require("../controller/user.events");
exports.userDeletedSubscription = {
    subscribe: apollo_server_1.withFilter(() => pubsub_1.pubsub.asyncIterator(user_events_1.UserEvents.USER_DELETED), (rootValue, args, context, info) => {
        return true;
    }),
};
//# sourceMappingURL=subscription.user.deleted.js.map