import logger from "./utils/logger";
import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import schemas from "./schema";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";

const PORT = 4000;
const app = express();

const server = new ApolloServer({
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

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});

// const schema: GraphQLSchema = mergeSchemas({
//   schemas,
//   resolvers,
// });

// // GraphQL
// const server = new ApolloServer({
//   schema,
//   context: async ({ req }: any) => {
//     if (!req || !req.headers) {
//       logger.info("no request");
//       return;
//     }
//   },
//   subscriptions: {
//     onConnect: (connectionParams, webSocket) => {
//       console.log(`ws connected`);
//     },
//   },
//   tracing: false,
// });

// server.listen().then(({ url, subscriptionsUrl }) => {
//   console.log(`🚀 Server ready at ${url}`);
//   console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
// });
