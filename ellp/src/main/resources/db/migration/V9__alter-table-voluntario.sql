ALTER TABLE voluntario
DROP COLUMN id;

ALTER TABLE voluntario
ADD COLUMN id_voluntario serial PRIMARY KEY;