import { Injector } from "../../utils/injector";
import { Author } from "../../model/author";
import {logger} from "../../utils";
import { Database } from "../connection";

export async function saveAuthors(data: Author[]) {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const queryText = `
      insert into schema1.author(id, name) VALUES($1, $2)
        on conflict ON CONSTRAINT authorIdPrimaryKey DO UPDATE
           SET id = EXCLUDED.id, name = EXCLUDED.name
      `;
  try {
    await client.query("BEGIN");
    for (const author of data.values()) {
      await client.query(queryText, [author.id, author.name]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(`saveAuthors failed ${error}`);
    throw error;
  }
}
