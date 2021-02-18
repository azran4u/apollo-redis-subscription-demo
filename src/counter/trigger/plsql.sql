create or replace function trigger.notify_testevent()
	returns trigger
	language plpgsql
as $function$
begin
	perform pg_notify('new_testevent', row_to_json(NEW)::text);
	return NULL;
end;
$function$

create trigger updated_test_trigger after insert on trigger.data 
for each row execute procedure trigger.notify_testevent();

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