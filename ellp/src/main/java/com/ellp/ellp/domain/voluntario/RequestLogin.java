package com.ellp.ellp.domain.voluntario;

import jakarta.validation.constraints.NotBlank;

public record RequestLogin(

        Long id_login,

        @NotBlank String nome,

        @NotBlank String senha
)
{
}
