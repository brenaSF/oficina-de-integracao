ALTER TABLE voluntario ADD COLUMN active BOOLEAN;
UPDATE voluntario SET active = true;