package com.ellp_oficina.ellp_oficina.domain.ellp;

import jakarta.validation.constraints.NotBlank;

public record RequestDepartamento(

        String id_departamento,

        @NotBlank 
        String nome,

        @NotBlank 
        String responsavel
)
{
}