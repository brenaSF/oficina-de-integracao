package com.ellp.ellp.domain.voluntario;

import jakarta.validation.constraints.NotBlank;

public record RequestDepartamento(

        String id_departamento,

        @NotBlank
        String nome_departamento
) {
}
