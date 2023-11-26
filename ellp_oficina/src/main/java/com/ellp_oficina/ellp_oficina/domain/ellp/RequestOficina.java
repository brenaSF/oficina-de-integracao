package com.ellp_oficina.ellp_oficina.domain.ellp;


import jakarta.validation.constraints.NotBlank;

public record RequestOficina(

        String id_oficina,

        @NotBlank
        String nome_oficina,

        Integer qt_participantes,

        @NotBlank
        String data_oficina,

        @NotBlank
        String horarioinicio,

        @NotBlank
        String horariofim
)
{}
