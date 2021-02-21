import { Injector } from '../../utils/injector';
import { logger } from '../../utils';
import { Database } from '../connection';
import { TimeRange, Book } from '../../model';

export interface ReaderBookAuthorJoin {
  reader_name: string;
  book_title: string;
  author_name: string;
}

export async function getRedaersWithBooksAndAuthorsInTimeFrame(
  range: TimeRange,
): Promise<ReaderBookAuthorJoin[]> {
  const client = Injector.getInstance()
    .getService<Database>(Database)
    .getClient();

  const queryText = `
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
                            where r.when_read >= $1 AND r.when_read <  $2
        
                        ) as readersinrange 
        
                    left join schema1.reader_book on (schema1.reader_book.reader_id = readersinrange.reader_id)
        
                    
                ) as readersandbooks
                inner join schema1.book on (schema1.book.id = readersandbooks.book_id)
        
        
            ) as readersbookdata
            left join schema1.book_author on (schema1.book_author.book_id = readersbookdata.book_id)
        
        ) as readersbooksauthorid
        left join schema1.author on (schema1.author.id = readersbooksauthorid.author_id)
        order by reader_name, book_title, author_name
      `;
  const vars = ['2019-01-01', '2020-01-01'];
  try {
    const res = await client.query(queryText, vars);
    return res.rows.map((row) => {
      return {
        author_name: row.author_name ?? 'DOES NOT EXISTS',
        book_title: row.book_title ?? 'DOES NOT EXISTS',
        reader_name: row.reader_name ?? 'DOES NOT EXISTS',
      } as ReaderBookAuthorJoin;
    });
  } catch (error) {
    logger.error(
      `getRedaersWithBooksAndAuthorsInTimeFrame failed ${error}`,
    );
    throw error;
  }
}
