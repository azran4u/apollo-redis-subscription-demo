import { Client } from "pg";
import logger from "../../utils/logger";
import { counterController } from "../controller/counter.controller";
import pubsub from "../resolvers/pubsub";
import { Observable } from "rxjs";
import { Counter } from "../counter.model";
import { debounce, debounceTime, delay, tap } from "rxjs/operators";
import { COUNTER_CHNAGED } from "../resolvers/subscription.events";

async function dbTriggerRegistration(): Promise<Observable<Counter>> {
  const pgClient = new Client({
    user: "postgresadmin",
    host: "127.0.0.1",
    database: "postgresdb",
    password: "admin123",
    port: 5432,
  });

  await pgClient.connect();
  logger.info("connected to db");
  await pgClient.query("LISTEN new_testevent");

  return new Observable((subscriber) => {
    pgClient.on("notification", async (msg) => {
      const data = msg.payload;
      const channel = msg.channel;
      const processId = msg.processId;
      logger.info(
        `data = ${data} channel = ${channel} processId = ${processId}`
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
          })
        )
        .subscribe();
      logger.info(`litening to database triggers...`);
    },
    (err) => {
      logger.error(`dbTriggerRegistration error ${err}`);
    }
  );
}
