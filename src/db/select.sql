select count(*) from schema1.book;
select count(*) from schema1.author;
select count(*) from schema1.reader;
select count(*) from schema1.book_author;
select count(*) from schema1.reader_book;

select schema1.reader.name, schema1.book.title, schema1.author.name 
from schema1.reader, schema1.book, schema1.author 
where schema1.reader.when_read >= '2019-01-01' AND schema1.reader.when_read <  '2020-01-01'
inner join schema1.book on ()


select r.name, b.title, a.name 
from schema1.reader r, schema1.book b, schema1.author a
left outer join schema1.reader_book rb on (rb.reader_id = r.id)
left outer join schema1.book_author ba on (ba.book_id = rb.book_id)
where r.when_read >= '2019-01-01' AND r.when_read <  '2020-01-01'

where schema1.reader.when_read >= '2019-01-01' AND schema1.reader.when_read <  '2020-01-01'
inner join schema1.book on ()