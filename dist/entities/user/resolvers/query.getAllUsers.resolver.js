"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const user_controller_1 = require("../controller/user.controller");
exports.getAllUsers = (source, args, context, info) => {
    return user_controller_1.UserController.getAll();
};
//# sourceMappingURL=query.getAllUsers.resolver.js.map