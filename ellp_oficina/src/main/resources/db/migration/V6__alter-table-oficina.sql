-- Change data type of the column with a conversion
ALTER TABLE oficina
ALTER COLUMN data_oficina TYPE DATE
USING data_oficina::date;

ALTER TABLE oficina
ALTER COLUMN horarioInicio TYPE TIME
USING horarioInicio::time;

ALTER TABLE oficina
ALTER COLUMN horarioFim TYPE TIME
USING horarioFim::time;

ALTER TABLE oficina
ADD COLUMN duracao INTERVAL;

UPDATE oficina
SET duracao = horarioFim - horarioInicio;

