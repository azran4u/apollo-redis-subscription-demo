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
const apollo_server_1 = require("apollo-server");
const utilities_1 = require("@apollo/client/utilities");
const ws_1 = require("@apollo/client/link/ws");
const core_1 = require("@apollo/client/core");
const httpLink = new core_1.HttpLink({
    uri: 'http://localhost:4000/graphql',
});
const wsLink = new ws_1.WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: {
        reconnect: true,
        connectionParams: {
            authToken: 'a',
        },
    },
});
const splitLink = core_1.split(({ query }) => {
    const definition = utilities_1.getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription');
}, wsLink, httpLink);
const client = new core_1.ApolloClient({
    link: splitLink,
    cache: new core_1.InMemoryCache(),
});
const COMMENTS_SUBSCRIPTION = apollo_server_1.gql `
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;
// client.
// const { variables, loading, data, error } = useSubscription(
//   COMMENTS_SUBSCRIPTION,
//   {
//     onSubscriptionData: ({ client, subscriptionData }) => {
//       debugger;
//     },
//     onSubscriptionComplete: () => {
//       debugger;
//     },
//   },
// );
describe(`load testing`, () => {
    beforeEach(function () { });
    afterEach(function () { });
    it('load counter subscription', () => __awaiter(void 0, void 0, void 0, function* () { }));
});
//# sourceMappingURL=load.test.spec.js.map