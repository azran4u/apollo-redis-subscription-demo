import { MockData } from "../../model";
import { saveReaders,saveAuthors,saveBookAuthorRelation,saveBooks,saveReaderBookRelation} from "../save";

export async function saveMockDataToDb(data: MockData) {
  await saveBooks(data.books);
  await saveAuthors(data.authors);
  await saveReaders(data.readers);
  await saveBookAuthorRelation(data.book_author);
  await saveReaderBookRelation(data.reader_book);
}
