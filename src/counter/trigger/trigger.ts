import { Client } from 'pg';
import { logger } from '../../utils';
import { counterController } from '../controller/counter.controller';
import pubsub from '../resolvers/pubsub';
import { Observable } from 'rxjs';
import { Counter } from '../counter.model';
import { debounceTime, tap } from 'rxjs/operators';
import { COUNTER_CHNAGED } from '../resolvers/subscription.events';

async function dbTriggerRegistration(): Promise<Observable<Counter>> {
  const azurePrimaryDbConfig = {
    user: 'eyala@live-query-poc',
    host:
      'live-query-poc.postgres.database.azure.com' ||
      process.env.DATABASE_HOST,
    database: 'live_query_poc',
    password: 'aA123456',
    port: 5432 || Number.parseInt(process.env.DATABASE_PORT),
  };

  const azureReplica1DbConfig = {
    user: 'eyala@live-query-poc',
    host:
      'live-query-poc-replica-1.postgres.database.azure.com' ||
      process.env.DATABASE_HOST,
    database: 'live_query_poc',
    password: 'aA123456',
    port: 5432 || Number.parseInt(process.env.DATABASE_PORT),
  };

  const localhostDbConfig = {
    user: 'postgresadmin',
    host: '127.0.0.1' || process.env.DATABASE_HOST,
    database: 'postgresdb',
    password: 'admin123',
    port: 5432 || Number.parseInt(process.env.DATABASE_PORT),
  };

  const dbConfig =
    process.env.DB_NAME === 'PRIMARY'
      ? azurePrimaryDbConfig
      : azureReplica1DbConfig;

  logger.info(`db config = ${JSON.stringify(dbConfig, null, 4)}`);

  const pgClient = new Client(dbConfig);

  await pgClient.connect();
  logger.info('connected to db');
  await pgClient.query('LISTEN books_table_insert');

  return new Observable((subscriber) => {
    pgClient.on('notification', async (msg) => {
      const data = msg.payload;
      const channel = msg.channel;
      const processId = msg.processId;
      logger.info(
        `data = ${data} channel = ${channel} processId = ${processId}`,
      );
      const res = await counterController.getCounter();
      logger.info(`counter = ${res}`);
      subscriber.next(res);
    });
  });
}

export async function wsNotify() {
  dbTriggerRegistration().then(
    (observable) => {
      observable
        .pipe(
          debounceTime(1000),
          tap((res) => {
            pubsub.publish(COUNTER_CHNAGED, { counterChanged: res });
          }),
        )
        .subscribe();
      logger.info(`litening to database triggers...`);
    },
    (err) => {
      logger.error(`dbTriggerRegistration error ${err}`);
    },
  );
}
