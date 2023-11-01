ALTER TABLE oficina
DROP COLUMN id_oficina;

ALTER TABLE oficina
ADD COLUMN id_oficina serial PRIMARY KEY;