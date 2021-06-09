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
exports.UserController = void 0;
const uuid_1 = require("uuid");
const user_events_1 = require("./user.events");
const pubsub_1 = require("../../../../pubsub/pubsub");
class UserController {
    constructor() { }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(this.users.values());
        });
    }
    static create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign({ id: uuid_1.v4() }, input);
            this.users.set(user.id, user);
            try {
                yield pubsub_1.pubsub.publish(user_events_1.UserEvents.USER_CREATED, {
                    userAdded: user,
                });
            }
            catch (error) {
                console.error(`failed to publish event ${user_events_1.UserEvents.USER_CREATED} to pubsub ${error}`);
            }
            return user;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.get(id);
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.get(id);
            if (user) {
                this.users.delete(id);
                yield pubsub_1.pubsub.publish(user_events_1.UserEvents.USER_DELETED, {
                    userDeleted: user,
                });
                return user;
            }
            return null;
        });
    }
    static edit(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign({ id }, updatedUser);
            this.users.set(id, user);
            return user;
        });
    }
}
exports.UserController = UserController;
UserController.users = new Map();
//# sourceMappingURL=user.controller.js.map