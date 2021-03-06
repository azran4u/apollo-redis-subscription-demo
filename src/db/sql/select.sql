select count(*) from schema1.book;
select count(*) from schema1.author;
select count(*) from schema1.reader;
select count(*) from schema1.book_author;
select count(*) from schema1.reader_book;

select schema1.reader.name, schema1.book.title, schema1.author.name 
from schema1.reader, schema1.book, schema1.author 
where schema1.reader.when_read >= '2019-01-01' AND schema1.reader.when_read <  '2020-01-01'
inner join schema1.book on ()


-- readers with book_id, book_title and author_id, author_name
select reader_name, title as book_title, name as author_name
from (
    
    -- readers with book_id, book_title and author_id
    select *
    from (
        
        -- readers with book_id and book_title
        select *
        from (

            -- readers with book_id
            select *
            from (
                
                    -- readers in time range
                    select name as reader_name, id as reader_id
                    from schema1.reader as r 
                    where r.when_read >= '2019-01-01' AND r.when_read <  '2020-01-01'

                ) as readersinrange 

            left join schema1.reader_book on (schema1.reader_book.reader_id = readersinrange.reader_id)

            
        ) as readersandbooks
        inner join schema1.book on (schema1.book.id = readersandbooks.book_id)


    ) as readersbookdata
    left join schema1.book_author on (schema1.book_author.book_id = readersbookdata.book_id)

) as readersbooksauthorid
left join schema1.author on (schema1.author.id = readersbooksauthorid.author_id)
order by reader_name, book_title, author_name




-- left outer join schema1.book_author ba on (ba.book_id = rb.book_id)
-- 

where schema1.reader.when_read >= '2019-01-01' AND schema1.reader.when_read <  '2020-01-01'
inner join schema1.book on ()