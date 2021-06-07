"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const post_controller_1 = require("../controller/post.controller");
exports.getAllPosts = (source, args, context, info) => {
    return post_controller_1.PostController.getAll();
};
//# sourceMappingURL=query.getAllPosts.resolver.js.map