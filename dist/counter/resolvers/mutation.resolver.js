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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCounter = exports.decrementCounter = exports.incrementCounter = void 0;
const counter_controller_1 = require("../controller/counter.controller");
const pubsub_1 = __importDefault(require("./pubsub"));
const subscription_events_1 = require("./subscription.events");
exports.incrementCounter = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield counter_controller_1.counterController.increment();
    pubsub_1.default.publish(subscription_events_1.COUNTER_CHNAGED, { counterChanged: res });
    return res;
});
exports.decrementCounter = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield counter_controller_1.counterController.decrement();
    pubsub_1.default.publish(subscription_events_1.COUNTER_CHNAGED, { counterChanged: res });
    return res;
});
exports.resetCounter = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield counter_controller_1.counterController.reset();
    pubsub_1.default.publish(subscription_events_1.COUNTER_CHNAGED, {
        counterChanged: res,
    });
    return res;
});
//# sourceMappingURL=mutation.resolver.js.map