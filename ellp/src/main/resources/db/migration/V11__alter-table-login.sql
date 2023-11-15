ALTER TABLE login ADD COLUMN active BOOLEAN;
UPDATE login SET active = true;