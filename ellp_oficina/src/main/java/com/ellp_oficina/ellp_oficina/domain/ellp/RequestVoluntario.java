package com.ellp_oficina.ellp_oficina.domain.ellp;


import jakarta.validation.constraints.NotBlank;

public record RequestVoluntario(

        String id_voluntario,

        String nome,

        String ra,

        String email,

        String telefone,

        String curso,

        String periodo,

        String horas_voluntariadas
) {
}
