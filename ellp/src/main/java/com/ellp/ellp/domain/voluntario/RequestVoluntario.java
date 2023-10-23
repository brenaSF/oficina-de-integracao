package com.ellp.ellp.domain.voluntario;

import jakarta.validation.constraints.NotBlank;

public record RequestVoluntario(

        String id,

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
