"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAddedSubscription = void 0;
const apollo_server_1 = require("apollo-server");
const pubsub_1 = require("../../../../pubsub/pubsub");
const user_events_1 = require("../controller/user.events");
exports.userAddedSubscription = {
    subscribe: apollo_server_1.withFilter(() => pubsub_1.pubsub.asyncIterator(user_events_1.UserEvents.USER_CREATED), (rootValue, args, context, info) => {
        debugger;
        const user = rootValue.userAdded;
        if (user.age >= args.age.from && user.age <= args.age.to)
            return true;
        else {
            return false;
        }
    }),
};
//# sourceMappingURL=subscription.user.added.js.map