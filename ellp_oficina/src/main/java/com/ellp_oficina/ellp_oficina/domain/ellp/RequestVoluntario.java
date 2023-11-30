package com.ellp_oficina.ellp_oficina.domain.ellp;

public record RequestVoluntario(

        String id_voluntario,

        String nome,

        String ra,

        String email,

        String telefone,

        String curso,

        String periodo,

        Integer horas_voluntariadas,

        String departamento
) {
}
