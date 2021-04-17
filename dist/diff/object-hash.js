"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_hash_1 = __importDefault(require("object-hash"));
function a() {
    const a = {};
    const b = {};
    const ha = object_hash_1.default(a);
    const hb = object_hash_1.default(b);
    console.log(`ha ${ha} hb ${hb} equal ${ha === hb}`);
}
function b() {
    const a = { a: 1, b: 2, c: { a: 1, b: 2, c: 3 } };
    const b = { a: 1, b: 2, c: { b: 2, a: 1, c: 3 } };
    const ha = object_hash_1.default(a);
    const hb = object_hash_1.default(b);
    console.log(`ha ${ha} hb ${hb} equal ${ha === hb}`);
}
b();
//# sourceMappingURL=object-hash.js.map