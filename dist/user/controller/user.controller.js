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
const apollo_server_1 = require("apollo-server");
class UserController {
    constructor() { }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    static create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                name: input.name,
                id: uuid_1.v4(),
            };
            this.users.push(user);
            return user;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => {
                user.id === id;
            });
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex((user) => {
                return id === user.id;
            });
            const user = this.users[index];
            if (index > -1) {
                this.users.splice(index, 1);
            }
            return user;
        });
    }
    static edit(updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex((user) => {
                return updatedUser.id === user.id;
            });
            if (index > -1) {
                this.users[index].name = updatedUser.name;
                return this.users[index];
            }
            else {
                console.error(`can't edit user ${JSON.stringify(updatedUser)}`);
                throw new apollo_server_1.UserInputError('edit user arguments invalid', {
                    invalidArgs: updatedUser,
                });
            }
        });
    }
}
exports.UserController = UserController;
UserController.users = [];
//# sourceMappingURL=user.controller.js.map