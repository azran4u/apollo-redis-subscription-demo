"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersChangesSubscription = void 0;
const apollo_server_1 = require("apollo-server");
const pubsub_1 = require("../../../../pubsub/pubsub");
const user_events_1 = require("../controller/user.events");
// export const usersChangesByIdsSubscription = {
//   subscribe: withFilter(
//     () => pubsub.asyncIterator(UserEvents.USERS_CHANGED),
//     (
//       rootValue?: {
//         usersChangesByIds: { updated: string[]; deleted: string[] };
//       },
//       args?: any,
//       context?: any,
//       info?: any,
//     ) => {
//       return true;
//     },
//   ),
// };
exports.usersChangesSubscription = {
    resolve: (source, args, context, info) => {
        const res = isRelevant(source, args);
        const updated = res.usersChanges.updated.map((x) => x.id);
        const deleted = res.usersChanges.deleted.map((x) => x.id);
        return { updated, deleted };
    },
    subscribe: apollo_server_1.withFilter(() => pubsub_1.pubsub.asyncIterator(user_events_1.UserEvents.USERS_CHANGED), (rootValue, args, context, info) => {
        const res = isRelevant(rootValue, args);
        return (res.usersChanges.deleted.length > 0 ||
            res.usersChanges.updated.length > 0);
    }),
};
function isRelevant(payload, args) {
    const res = {
        usersChanges: { updated: [], deleted: [] },
    };
    if (args.filter.ids.length > 0) {
        res.usersChanges.updated = payload.usersChanges.updated.filter((x) => {
            return args.filter.ids.includes(x.id);
        });
        res.usersChanges.deleted = payload.usersChanges.deleted.filter((x) => {
            return args.filter.ids.includes(x.id);
        });
    }
    else if (args.filter.age &&
        args.filter.age.from &&
        args.filter.age.to) {
        res.usersChanges.updated = payload.usersChanges.updated.filter((x) => {
            return (x.age >= args.filter.age.from && x.age <= args.filter.age.to);
        });
        res.usersChanges.deleted = payload.usersChanges.deleted.filter((x) => {
            return (x.age >= args.filter.age.from && x.age <= args.filter.age.to);
        });
    }
    return res;
}
//# sourceMappingURL=subscription.usersChanged.js.map