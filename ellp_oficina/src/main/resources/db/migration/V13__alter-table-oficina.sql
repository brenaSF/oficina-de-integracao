ALTER TABLE oficina
ALTER COLUMN duracao TYPE INTERVAL
USING duracao::interval;
