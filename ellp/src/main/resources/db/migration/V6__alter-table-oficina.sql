ALTER TABLE oficina ADD COLUMN active BOOLEAN;
UPDATE oficina SET active = true;