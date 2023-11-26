UPDATE voluntario SET active = true;
UPDATE oficina SET active = true;
UPDATE login SET active = true;

ALTER TABLE oficina
ALTER COLUMN id_oficina SET DATA TYPE VARCHAR(45);

ALTER TABLE voluntario
ALTER COLUMN id_voluntario SET DATA TYPE VARCHAR(45);

ALTER TABLE login
ALTER COLUMN id_login SET DATA TYPE VARCHAR(45);
