"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockData = void 0;
const faker_1 = __importDefault(require("faker"));
function createMockData() {
    const numOfBooks = 100;
    const numOfAuthors = 100;
    const numOfReadersWide = 100;
    const numOfReadersSpecific = 10;
    const numOfAuthorsPerBook = 2;
    const numOfBooksPerReader = 2;
    let bookSeq = 1;
    let authorSeq = 1;
    let readerSeq = 1;
    const wideRange = {
        from: new Date(2010, 1, 1),
        to: new Date(2020, 1, 1),
    };
    const specificRange = {
        from: new Date(2019, 1, 1),
        to: new Date(2020, 1, 1),
    };
    const books = [];
    for (var i = 0; i < numOfBooks; i++) {
        books.push(createMockBook(bookSeq++));
    }
    const authors = [];
    for (var i = 0; i < numOfAuthors; i++) {
        authors.push(createMockAuthor(authorSeq++));
    }
    const readers = [];
    for (var i = 0; i < numOfReadersWide; i++) {
        readers.push(createMockReader(readerSeq++, wideRange.from, wideRange.to));
    }
    for (var i = 0; i < numOfReadersSpecific; i++) {
        readers.push(createMockReader(readerSeq++, specificRange.from, specificRange.to));
    }
    const book_author = [];
    for (const book of books.values()) {
        for (var i = 0; i < numOfAuthorsPerBook; i++) {
            book_author.push({
                a: book.id,
                b: authors[Math.floor(Math.random() * authors.length)].id,
            });
        }
    }
    const reader_book = [];
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
exports.createMockData = createMockData;
function createMockBook(id) {
    return {
        id: id,
        title: faker_1.default.lorem.word(),
    };
}
function createMockAuthor(id) {
    return {
        id: id,
        name: faker_1.default.name.firstName(),
    };
}
function createMockReader(id, start, end) {
    return {
        id: id,
        name: faker_1.default.name.firstName(),
        whenRead: faker_1.default.date.between(start, end),
    };
}
//# sourceMappingURL=createMockData.js.map