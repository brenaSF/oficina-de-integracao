ALTER TABLE departamento ADD COLUMN active BOOLEAN;
UPDATE departamento SET active = true;