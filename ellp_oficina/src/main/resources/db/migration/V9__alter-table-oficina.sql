UPDATE oficina
SET duracao = (horarioFim - horarioInicio)::TEXT;

ALTER TABLE voluntario
ADD COLUMN horas_voluntariadas TEXT;

