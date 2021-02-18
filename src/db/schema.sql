drop table if exists schema1.book;
drop table if exists schema1.author;
drop table if exists schema1.book_author;
drop table if exists schema1.reader;
drop table if exists schema1.reader_book;


CREATE TABLE schema1.book(
    id INT NOT NULL,
    title VARCHAR NOT NULL,
    CONSTRAINT bookIdPrimaryKey PRIMARY KEY(id)
);

CREATE TABLE schema1.author(
    id INT NOT NULL,
    name VARCHAR NOT NULL,
    CONSTRAINT authorIdPrimaryKey PRIMARY KEY(id)
);

CREATE TABLE schema1.reader(
    id INT NOT NULL,
    name VARCHAR NOT NULL,
    when_read DATE NOT NULL,
    CONSTRAINT readerIdPrimaryKey PRIMARY KEY(id)
);

CREATE TABLE schema1.book_author(
    author_id INT NOT NULL,
    book_id INT NOT NULL,
    CONSTRAINT book_author_pkey PRIMARY KEY (author_id, book_id)
);

CREATE TABLE schema1.reader_book(
    reader_id INT NOT NULL,
    book_id INT NOT NULL,
    CONSTRAINT reader_book_pkey PRIMARY KEY (reader_id, book_id)
);