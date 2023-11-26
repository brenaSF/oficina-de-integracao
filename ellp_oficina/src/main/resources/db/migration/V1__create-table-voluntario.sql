CREATE TABLE voluntario (
    
    id_voluntario SERIAL PRIMARY KEY,
    nome TEXT UNIQUE NOT NULL,
    ra TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    curso TEXT NOT NULL,
    periodo TEXT NOT NULL,
    active BOOLEAN

);

CREATE TABLE login(

    id_login SERIAL PRIMARY KEY ,
    usuario TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    active BOOLEAN

);

CREATE TABLE oficina (
    id_oficina SERIAL PRIMARY KEY ,
    nome_oficina TEXT UNIQUE NOT NULL,
    qt_participantes INT NOT NULL,
    data_oficina TEXT NOT NULL,
    horarioInicio TEXT NOT NULL,
    horarioFim TEXT NOT NULL,
    active BOOLEAN
);
