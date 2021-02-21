import { Injector } from "../../utils/injector";
import { Reader } from "../../model/reader";
import {logger} from "../../utils";
import { Database } from "../connection";

export async function saveReaders(data: Reader[]) {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const queryText = `
      insert into schema1.reader(id, name, when_read) VALUES($1, $2, $3)
        on conflict ON CONSTRAINT readerIdPrimaryKey DO UPDATE
           SET id = EXCLUDED.id, name = EXCLUDED.name, when_read = EXCLUDED.when_read
      `;
  try {
    await client.query("BEGIN");
    for (const reader of data.values()) {
      await client.query(queryText, [reader.id, reader.name, reader.whenRead]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(`saveReaders failed ${error}`);
    throw error;
  }
}
