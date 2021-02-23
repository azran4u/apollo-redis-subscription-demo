import { logger } from './utils';
import schemas from './graphql/schema';
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import {
  wsNotify,
  createTriggerFunction,
  createTrigger,
  removeTriggerIfExists,
  tableChangedNotification,
} from './db/trigger/trigger';
import { Injector } from './utils/injector';
import { Database } from './db/connection/connection';
import { PRIMARY_DB_CONFIG } from './config';
import { createMockData } from './db/mock/createMockData';
import { saveMockDataToDb } from './db/mock/saveMockDataToDb';
import { getRedaersWithBooksAndAuthorsInTimeFrame } from './db/read/getRedaersWithBooksAndAuthorsInTimeFrame';
import { hashObject } from './diff/node-object-hash';
import { tap } from 'rxjs/operators';

(async () => {
  try {
    const injector = Injector.getInstance();

    injector.addService(Database, PRIMARY_DB_CONFIG);
    const primaryDB = injector.getService<Database>(Database);
    await primaryDB.init();

    // const mock = createMockData();
    // await saveMockDataToDb(mock);

    const resa = await getRedaersWithBooksAndAuthorsInTimeFrame({
      from: new Date(2019, 1, 1),
      to: new Date(2020, 1, 1),
    });
    const resah = hashObject(resa);
    logger.info(resah);

    const resb = await getRedaersWithBooksAndAuthorsInTimeFrame({
      from: new Date(2019, 1, 1),
      to: new Date(2020, 1, 1),
    });
    const resbh = hashObject(resb);
    logger.info(resbh);

    logger.info(`equal = ${resah === resbh}`);

    const schema = 'schema1';
    const table = 'book';
    await createTriggerFunction(schema, table);
    logger.info(`created trigger function for ${schema}.${table}`);
    await removeTriggerIfExists(schema, table);
    await createTrigger(schema, table);
    logger.info(`created trigger for ${schema}.${table}`);

    const tableChanged$ = await tableChangedNotification(
      schema,
      table,
    );
    const tableChangedSubscription = tableChanged$
      .pipe(
        tap(() => {
          logger.info(`table ${schema} ${table} changed`);
        }),
      )
      .subscribe();
    setTimeout(() => {
      tableChangedSubscription.unsubscribe();
      logger.info(`unsubscribed from trigger ${schema} ${table}`);
    }, 5000);
  } catch (error) {
    logger.error(`error in init ${error}`);
  }
})();

const PORT = +process.env.GRAPHQL_PORT || 4000;
const app = express();

wsNotify().then(
  () => {
    logger.info('ws triggers');
  },
  (error) => {
    logger.error(error);
  },
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
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`,
  );
});
