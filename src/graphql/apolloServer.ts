import { ApolloServer } from "apollo-server-express";
import schemas from "./schema";

export const apolloServer = new ApolloServer({
    schema: schemas,
    subscriptions: {
      onConnect: (connectionParams, webSocket, context) => {
        console.log(`ws connected`);
      },
      onDisconnect: (webSocket, context) => {
        console.log(`ws disconnected`);
      },
    },
  });