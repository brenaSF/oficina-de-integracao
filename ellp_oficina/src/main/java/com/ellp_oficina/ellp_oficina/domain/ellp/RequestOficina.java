package com.ellp_oficina.ellp_oficina.domain.ellp;

import java.sql.Date;
import java.sql.Time;

import jakarta.validation.constraints.NotBlank;

public record RequestOficina(

        String id_oficina,

        @NotBlank
        String nome,

        Integer qt_participantes,

        String data_oficina,

        String horarioinicio,

        String horariofim
)
{}
