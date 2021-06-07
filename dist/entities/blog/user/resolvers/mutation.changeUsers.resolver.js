"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUsers = void 0;
const user_controller_1 = require("../controller/user.controller");
const pubsub_1 = require("../../../../pubsub/pubsub");
const user_events_1 = require("../controller/user.events");
exports.changeUsers = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const { upserted, deleted } = args;
    for (let i = 0; i < deleted.length; i++) {
        yield user_controller_1.UserController.remove(deleted[i]);
    }
    for (let i = 0; i < upserted.length; i++) {
        yield user_controller_1.UserController.create(upserted[i]);
    }
    const upsertedIds = upserted.map((upsert) => {
        return upsert.id;
    });
    yield pubsub_1.pubsub.publish(user_events_1.UserEvents.USERS_CHANGED, {
        usersChanged: { updated: upsertedIds, deleted },
    });
    return true;
});
//# sourceMappingURL=mutation.changeUsers.resolver.js.map