import { Client } from 'pg';
import { logger, Injector } from '../../utils';
import { counterController } from '../../entities/counter/controller/counter.controller';
import pubsub from '../../entities/counter/resolvers/pubsub';
import { Observable } from 'rxjs';
import { Counter } from '../../entities/counter/counter.model';
import { debounceTime, tap } from 'rxjs/operators';
import { COUNTER_CHNAGED } from '../../entities/counter/resolvers/subscription.events';
import { Database } from '../connection';

export async function createTriggerFunction(
  schema: string,
  table: string,
) {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const name = `${schema}.${table}`;
  const queryText = `
        create or replace function ${name}_notify()
        returns trigger
        language plpgsql as 
          $function$
            begin
              perform pg_notify('${name}_changed', '');
              return NULL;
            end;
          $function$
      `;
  try {
    await client.query(queryText);
  } catch (error) {
    logger.error(`createTriggerFunction failed ${error}`);
    throw error;
  }
}

// returns the created trigger name
export async function createTrigger(
  schema: string,
  table: string,
): Promise<string> {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const triggerName = `${schema}_${table}_changed_trigger`;
  const name = `${schema}.${table}`;
  const queryText = `
        create trigger ${triggerName} after insert or update or delete on ${name} 
        for each row execute procedure ${name}_notify();
      `;
  try {
    await client.query(queryText);
    return triggerName;
  } catch (error) {
    logger.error(`createTrigger failed ${queryText} ${error}`);
    throw error;
  }
}

export async function removeTriggerIfExists(
  schema: string,
  table: string,
) {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const name = `${schema}.${table}`;
  const queryText = `
        drop trigger if exists ${schema}_${table}_changed_trigger on ${name};
      `;
  try {
    await client.query(queryText);
  } catch (error) {
    logger.error(`removeTrigger failed ${error}`);
    throw error;
  }
}

export async function tableChangedNotification(
  schema: string,
  table: string,
): Promise<Observable<void>> {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const triggerName = `${schema}_${table}_changed_trigger`;
  try {
    await client.query(`LISTEN ${triggerName}`);
  } catch (error) {
    logger.error(`failed listening to trigger ${triggerName}`);
  }

  return new Observable((subscriber) => {
    client.on('notification', async (msg) => {
      const data = msg.payload;
      const channel = msg.channel;
      const processId = msg.processId;
      subscriber.next();
    });
  });
}

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
