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