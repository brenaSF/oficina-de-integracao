package com.ellp_oficina.ellp_oficina.domain.ellp;


import jakarta.validation.constraints.NotBlank;

public record RequestVoluntario(

        String id_voluntario,

        @NotBlank
        String nome,

        @NotBlank
        String ra,

        @NotBlank
        String email,

        @NotBlank
        String telefone,

        @NotBlank
        String curso,

        @NotBlank
        String periodo
) {
}