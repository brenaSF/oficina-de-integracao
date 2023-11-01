package com.ellp.ellp.domain.voluntario;

import jakarta.validation.constraints.NotBlank;

public record RequestOficina(

        Long id_oficina,

        @NotBlank
        String nome_oficina,

        Integer qt_participantes,

        @NotBlank
        String data,

        @NotBlank
        String horario
)
{}
