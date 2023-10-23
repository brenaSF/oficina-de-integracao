package com.ellp.ellp.domain.voluntario;

import jakarta.validation.constraints.NotBlank;

public record RequestLogin(
        String id_login,

        @NotBlank
        String nome,

        @NotBlank
        String senha
)

{

}
