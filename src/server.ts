import { logger } from './utils';
import { startExpressServer } from './app';

(async () => {
  const PORT = +process.env.GRAPHQL_PORT || 4000;
  const { httpServer, apolloServer } = await startExpressServer();
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`,
    );
  });
})();
