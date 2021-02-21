import { Injector } from "../../utils/injector";
import {logger} from "../../utils";
import { Database } from "../connection";
import { EntityRelation } from "../../model";

export async function saveBookAuthorRelation(data: EntityRelation[]) {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const queryText = `insert into schema1.book_author(author_id, book_id) VALUES($1, $2)
      on conflict ON CONSTRAINT book_author_pkey DO
            UPDATE
           SET author_id = EXCLUDED.author_id, book_id = EXCLUDED.book_id`;
  try {
    await client.query("BEGIN");
    for (const book_author of data.values()) {
      await client.query(queryText, [book_author.a, book_author.b]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(`saveBookAuthorRelation failed ${error}`);
    throw error;
  }
}
