import { Client, ClientConfig } from 'pg';
import { logger } from '../../utils';

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
