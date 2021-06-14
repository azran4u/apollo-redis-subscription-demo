"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByIds = void 0;
const user_controller_1 = require("../controller/user.controller");
exports.getUsersByIds = (source, args, context, info) => {
    return user_controller_1.UserController.getByIds(args.ids);
};
//# sourceMappingURL=query.getUsersByIds.resolver.js.map