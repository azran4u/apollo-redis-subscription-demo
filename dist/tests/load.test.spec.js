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
const graphql_tag_1 = require("graphql-tag");
// import { getMainDefinition } from '@apollo/client/utilities';
// import {
//   split,
//   HttpLink,
//   ApolloClient,
//   InMemoryCache,
//   Observable,
// } from '@apollo/client/core';
// import fetch from 'cross-fetch';
// import { execute } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
// import ws from 'ws';
const graphqlClient_1 = require("../graphql/graphqlClient");
describe(`load testing`, () => {
    beforeEach(function () { });
    afterEach(function () { });
    const url = 'ws://localhost:8090/graphql';
    const COUNTER_SUBSCRIPTION = graphql_tag_1.gql `
    subscription s1 {
      counterChanged {
        value
      }
    }
  `;
    it('load counter subscription', () => __awaiter(void 0, void 0, void 0, function* () {
        const graphqlClient = new graphqlClient_1.GraphqlClient(url);
        const res$ = graphqlClient.connect(COUNTER_SUBSCRIPTION);
        res$.subscribe((data) => {
            debugger;
            console.log(`data recieved ${data.data.counterChanged}`);
        }, (error) => {
            console.error(`ws error ${error}`);
        });
        setTimeout(() => {
            graphqlClient.close();
            console.log(`ws disconnected`);
        }, 10000);
    }));
    it.only('load counter subscription', () => __awaiter(void 0, void 0, void 0, function* () {
        const numOfSubscribers = 10;
        const graphqlClients = [];
        for (let i = 0; i < numOfSubscribers; i++) {
            const graphqlClient = new graphqlClient_1.GraphqlClient(url);
            graphqlClients.push(graphqlClient);
            graphqlClient.connect(COUNTER_SUBSCRIPTION).subscribe((data) => {
                console.log(`data recieved ${data.data.counterChanged.value}`);
            }, (error) => {
                console.error(`ws error ${error}`);
            });
        }
        // setTimeout(() => {
        //   graphqlClients.map((graphqlClient) => {
        //     graphqlClient.close();
        //   });
        //   console.log(`unsubscribe`);
        // }, 10000);
    }));
});
//# sourceMappingURL=load.test.spec.js.map