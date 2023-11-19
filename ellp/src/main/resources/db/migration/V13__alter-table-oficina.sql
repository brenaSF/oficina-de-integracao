ALTER TABLE oficina
ADD COLUMN horarioFim TEXT ;

ALTER TABLE oficina
RENAME COLUMN horario TO horarioInicio;
