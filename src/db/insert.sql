insert into schema1.book(id, title) VALUES($1, $2)
on conflict ON CONSTRAINT bookIdPrimaryKey DO
      UPDATE
     SET id = EXCLUDED.id, title = EXCLUDED.title

