ALTER TABLE voluntario
ADD COLUMN id_oficina TEXT,
ADD CONSTRAINT fk_oficina
FOREIGN KEY (id_oficina) REFERENCES oficina(id_oficina);
