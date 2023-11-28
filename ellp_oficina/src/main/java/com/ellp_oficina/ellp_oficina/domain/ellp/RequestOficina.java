package com.ellp_oficina.ellp_oficina.domain.ellp;

import java.sql.Date;
import java.sql.Time;

import jakarta.validation.constraints.NotBlank;
import jakarta.websocket.Decoder.Text;

public record RequestOficina(

        String id_oficina,

        @NotBlank
        String nome_oficina,

        Integer qt_participantes,

        Date data_oficina,

        Time horarioinicio,

        Time horariofim,

        String duracao
)
{}
