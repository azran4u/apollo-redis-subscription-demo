"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
exports.apolloServer = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    subscriptions: {
        onConnect: (connectionParams, webSocket, context) => {
            console.log(`ws connected`);
        },
        onDisconnect: (webSocket, context) => {
            console.log(`ws disconnected`);
        },
    },
});
//# sourceMappingURL=apolloServer.js.map