
CREATE TABLE oficina (
    id_oficina TEXT PRIMARY KEY NOT NULL,
    nome_oficina TEXT UNIQUE NOT NULL,
    qt_participantes INT NOT NULL,
    data TEXT NOT NULL,
    horario TEXT NOT NULL
);
