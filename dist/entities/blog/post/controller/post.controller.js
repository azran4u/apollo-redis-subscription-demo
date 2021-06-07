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
exports.PostController = void 0;
const uuid_1 = require("uuid");
const apollo_server_1 = require("apollo-server");
class PostController {
    constructor() { }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.posts;
        });
    }
    static create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = Object.assign({ id: uuid_1.v4() }, input);
            this.posts.push(post);
            return post;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.posts.find((post) => {
                post.id === id;
            });
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.posts.findIndex((post) => {
                return id === post.id;
            });
            const post = this.posts[index];
            if (index > -1) {
                this.posts.splice(index, 1);
            }
            return post;
        });
    }
    static edit(id, updatedPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.posts.findIndex((post) => {
                return id === post.id;
            });
            if (index > -1) {
                this.posts[index] = Object.assign({ id }, updatedPost);
                return this.posts[index];
            }
            else {
                console.error(`can't edit user ${JSON.stringify(updatedPost)}`);
                throw new apollo_server_1.UserInputError('edit user arguments invalid', {
                    invalidArgs: updatedPost,
                });
            }
        });
    }
}
exports.PostController = PostController;
PostController.posts = [];
//# sourceMappingURL=post.controller.js.map