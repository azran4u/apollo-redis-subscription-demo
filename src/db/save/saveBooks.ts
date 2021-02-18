import { Injector } from "../../injector";
import { Book } from "../../model/book";
import logger from "../../utils/logger";
import { Database } from "../connection";

export async function saveBooks(data: Book[]) {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const queryText = `insert into schema1.book(id, title) VALUES($1, $2)
      on conflict ON CONSTRAINT bookIdPrimaryKey DO
            UPDATE
           SET id = EXCLUDED.id, title = EXCLUDED.title`;
  try {
    await client.query("BEGIN");
    for (const book of data.values()) {
      await client.query(queryText, [book.id, book.title]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(`saveBooks failed ${error}`);
    throw error;
  }
}
