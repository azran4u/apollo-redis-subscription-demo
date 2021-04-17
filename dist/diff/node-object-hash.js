"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashObject = void 0;
const node_object_hash_1 = __importDefault(require("node-object-hash"));
const hashSortCoerce = node_object_hash_1.default({ sort: true, coerce: true });
function hashObject(object) {
    return hashSortCoerce.hash(object);
}
exports.hashObject = hashObject;
// function a() {
//   const a = {};
//   const b = {};
//   const ha = hashSortCoerce.hash(a);
//   const hb = hashSortCoerce.hash(b);
//   console.log(`ha ${ha} \nhb ${hb} \nequal ${ha === hb}`);
// }
// function b() {
//   const a = { a: 1, b: 2, c: { a: 1, b: 2, c: 3 } };
//   const b = { a: 1, b: 2, c: { b: 2, a: 1, c: 3 } };
//   const ha = hashSortCoerce.hash(a);
//   const hb = hashSortCoerce.hash(b);
//   console.log(`ha ${ha} \nhb ${hb} \nequal ${ha === hb}`);
// }
// a();
// b();
//# sourceMappingURL=node-object-hash.js.map