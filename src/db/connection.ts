import { Client, ClientConfig } from "pg";
import { PRIMARY_DB_CONFIG, READ_REPLICA_1_DB_CONFIG } from "../config";
import logger from "../utils/logger";

export class Database {
  private client: Client;
  constructor(config: ClientConfig) {
    this.client = new Client(config);
  }
  async init() {
    try {
      await this.client.connect();
    } catch (error) {
      logger.error(`error connecting to database ${error}`);
    }
  }

  getClient() {
    return this.client;
  }
}

// export async function getClient(): Promise<{
//   primary: Client;
//   replica1: Client;
// }> {
//   const primaryClient = new Client(PRIMARY_DB_CONFIG);
//   const replica1Client = new Client(READ_REPLICA_1_DB_CONFIG);

//   try {
//     await primaryClient.connect();
//     await replica1Client.connect();
//   } catch (error) {
//     logger.error(`error connecting to database ${error}`);
//   }

//   return { primary: primaryClient, replica1: replica1Client };
// }
