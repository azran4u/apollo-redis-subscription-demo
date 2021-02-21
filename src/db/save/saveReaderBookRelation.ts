import { Injector } from "../../utils/injector";
import {logger} from "../../utils";
import { Database } from "../connection";
import { EntityRelation } from "../../model";

export async function saveReaderBookRelation(data: EntityRelation[]) {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const queryText = `insert into schema1.reader_book(reader_id, book_id) VALUES($1, $2)
      on conflict ON CONSTRAINT reader_book_pkey DO
            UPDATE
           SET reader_id = EXCLUDED.reader_id, book_id = EXCLUDED.book_id`;
  try {
    await client.query("BEGIN");
    for (const reader_book of data.values()) {
      await client.query(queryText, [reader_book.a, reader_book.b]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(`saveReaderBookRelation failed ${error}`);
    throw error;
  }
}
