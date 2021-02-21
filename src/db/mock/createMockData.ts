import faker from 'faker';
import {
  Book,
  Author,
  Reader,
  TimeRange,
  EntityRelation,
  MockData,
} from '../../model';

export function createMockData(): MockData {
  const numOfBooks = 100;
  const numOfAuthors = 100;
  const numOfReadersWide = 100;
  const numOfReadersSpecific = 10;

  const numOfAuthorsPerBook = 2;
  const numOfBooksPerReader = 2;

  let bookSeq = 1;
  let authorSeq = 1;
  let readerSeq = 1;

  const wideRange: TimeRange = {
    from: new Date(2010, 1, 1),
    to: new Date(2020, 1, 1),
  };
  const specificRange: TimeRange = {
    from: new Date(2019, 1, 1),
    to: new Date(2020, 1, 1),
  };

  const books: Book[] = [];
  for (var i = 0; i < numOfBooks; i++) {
    books.push(createMockBook(bookSeq++));
  }

  const authors: Author[] = [];
  for (var i = 0; i < numOfAuthors; i++) {
    authors.push(createMockAuthor(authorSeq++));
  }

  const readers: Reader[] = [];
  for (var i = 0; i < numOfReadersWide; i++) {
    readers.push(
      createMockReader(readerSeq++, wideRange.from, wideRange.to),
    );
  }
  for (var i = 0; i < numOfReadersSpecific; i++) {
    readers.push(
      createMockReader(
        readerSeq++,
        specificRange.from,
        specificRange.to,
      ),
    );
  }

  const book_author: EntityRelation[] = [];
  for (const book of books.values()) {
    for (var i = 0; i < numOfAuthorsPerBook; i++) {
      book_author.push({
        a: book.id,
        b: authors[Math.floor(Math.random() * authors.length)].id,
      });
    }
  }

  const reader_book: EntityRelation[] = [];
  for (const reader of readers.values()) {
    for (var i = 0; i < numOfBooksPerReader; i++) {
      reader_book.push({
        a: reader.id,
        b: books[Math.floor(Math.random() * books.length)].id,
      });
    }
  }

  return {
    books,
    authors,
    readers,
    book_author,
    reader_book,
  };
}

function createMockBook(id: number): Book {
  return {
    id: id,
    title: faker.lorem.word(),
  };
}

function createMockAuthor(id: number): Author {
  return {
    id: id,
    name: faker.name.firstName(),
  };
}

function createMockReader(
  id: number,
  start: Date,
  end: Date,
): Reader {
  return {
    id: id,
    name: faker.name.firstName(),
    whenRead: faker.date.between(start, end),
  };
}
