import logger from "./utils/logger";
import schemas from "./schema";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { wsNotify } from "./counter/trigger/trigger";

const PORT = 4000;
const app = express();

wsNotify().then(
  () => {
    logger.info("ws triggers");
  },
  (error) => {
    logger.error(error);
  }
);
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
