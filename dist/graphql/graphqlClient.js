"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlClient = void 0;
const apollo_link_ws_1 = require("apollo-link-ws");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const ws_1 = __importDefault(require("ws"));
const apollo_link_1 = require("apollo-link");
class GraphqlClient {
    constructor(url) {
        this.webSocketClient = new subscriptions_transport_ws_1.SubscriptionClient(url, { reconnect: true }, ws_1.default);
        this.wsLink = new apollo_link_ws_1.WebSocketLink(this.webSocketClient);
    }
    connect(query, variables) {
        return apollo_link_1.execute(this.wsLink, {
            query,
            variables,
        });
    }
    close() {
        this.webSocketClient.unsubscribeAll();
        this.webSocketClient.close(true);
    }
}
exports.GraphqlClient = GraphqlClient;
//# sourceMappingURL=graphqlClient.js.map