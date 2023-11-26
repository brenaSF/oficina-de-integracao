package com.ellp_oficina.ellp_oficina.domain.ellp;


import jakarta.validation.constraints.NotBlank;

public record RequestLogin(

        String id_login,

        @NotBlank String nome,

        @NotBlank String senha
)
{
}