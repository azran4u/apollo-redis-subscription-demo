import { MockData } from "../createMockData";
import { saveAuthors } from "./saveAuthors";
import { saveBookAuthorRelation } from "./saveBookAuthorRelation";
import { saveBooks } from "./saveBooks";
import { saveReaderBookRelation } from "./saveReaderBookRelation";
import { saveReaders } from "./saveReaders";

export async function saveMockDataToDb(data: MockData) {
  await saveBooks(data.books);
  await saveAuthors(data.authors);
  await saveReaders(data.readers);
  await saveBookAuthorRelation(data.book_author);
  await saveReaderBookRelation(data.reader_book);
}
