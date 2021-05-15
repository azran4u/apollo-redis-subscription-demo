"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
let numOfConnectedWs = 0;
exports.apolloServer = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    subscriptions: {
        onConnect: (connectionParams, webSocket, context) => {
            numOfConnectedWs++;
            console.log(`ws connected, current ${numOfConnectedWs}`);
        },
        onDisconnect: (webSocket, context) => {
            numOfConnectedWs--;
            console.log(`ws disconnected, current ${numOfConnectedWs}`);
        },
    },
});
//# sourceMappingURL=apolloServer.js.map