import { gql } from 'graphql-tag';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  Observable,
} from '@apollo/client/core';
import fetch from 'cross-fetch';
import { execute } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import ws from 'ws';

describe(`load testing`, () => {
  beforeEach(function () {});

  afterEach(function () {});

  it.only('load counter subscription', async () => {
    const url = 'http://localhost:8080/graphql';
    const getWsClient = function (wsurl) {
      const client = new SubscriptionClient(
        wsurl,
        { reconnect: true },
        ws,
      );
      return client;
    };
    const createSubscriptionObservable = (
      wsurl,
      query,
      variables,
    ) => {
      const link = new WebSocketLink(getWsClient(wsurl));
      return execute(link, { query: query, variables: variables });
    };

    const COUNTER_SUBSCRIPTION = gql`
      subscription s1 {
        counterChanged {
          value
        }
      }
    `;
    const subscriptionClient = createSubscriptionObservable(
      url,
      COUNTER_SUBSCRIPTION,
      {},
    );

    const numOfSubscribers = 10;
    const consumers: ZenObservable.Subscription[] = [];
    for (let i = 0; i < numOfSubscribers; i++) {
      const consumer = subscriptionClient.subscribe(
        (eventData) => {
          // Do something on receipt of the event
          debugger;
          console.log('Received event: ');
          console.log(JSON.stringify(eventData, null, 2));
        },
        (err) => {
          debugger;
          console.log('Err');
          console.log(err);
        },
      );
      consumers.push(consumer);
    }
    console.log(`out of loop`);
    setTimeout(() => {
      console.log(`unsubscribe`);
      consumers.map((consumer) => {
        consumer.unsubscribe();
        consumer.closed = true;
      });
    }, 10000);
  });
});
