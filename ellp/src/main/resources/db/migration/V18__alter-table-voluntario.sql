ALTER TABLE departamento
ADD PRIMARY KEY (id_departamento);


ALTER TABLE voluntario
ADD COLUMN id_departamento VARCHAR(45),
ADD CONSTRAINT fk_departamento
FOREIGN KEY (id_departamento)
REFERENCES departamento(id_departamento);