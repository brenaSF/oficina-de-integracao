
ALTER TABLE voluntario ADD COLUMN email TEXT;

ALTER TABLE voluntario ADD COLUMN telefone TEXT;

ALTER TABLE voluntario ADD COLUMN curso TEXT;

ALTER TABLE voluntario ADD COLUMN periodo TEXT;

UPDATE voluntario SET active = true;