create or replace function schema1.notify_book()
	returns trigger
	language plpgsql as $function$
	begin
		perform pg_notify('book changed', '');
		return NULL;
	end;
$function$

drop trigger if exists book_changed_trigger on schema1.book;

create trigger book_changed_trigger after insert or update or delete on schema1.book 
for each row execute procedure schema1.notify_book();


-- ********************

create or replace function trigger.notify_testevent()
	returns trigger
	language plpgsql
as $function$
begin
	perform pg_notify('new_testevent', row_to_json(NEW)::text);
	return NULL;
end;
$function$



insert into trigger.data (name) values ('eyal')


create or replace function trigger.notify_books_table_insert()
	returns trigger
	language plpgsql
as $function$
begin
	perform pg_notify('books_table_insert', row_to_json(NEW)::text);
	return NULL;
end;
$function$

create trigger books_table_insert after insert on schema1.books 
for each row execute procedure trigger.notify_books_table_insert();

insert into schema1.books (name) values ('eyal')

-- query num of connection to a given database (live_query_poc)
SELECT sum(numbackends) FROM pg_stat_database where datname='live_query_poc';