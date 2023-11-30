package com.ellp_oficina.ellp_oficina.domain.ellp;


import jakarta.persistence.*;
import lombok.*;

@Table(name="departamento")
@Entity(name = "departamento")
@EqualsAndHashCode(of="id_departamento")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id_departamento;
    private String nome;
    private String responsavel;


    public Departamento(RequestDepartamento requestDepartamento){
        this.nome = requestDepartamento.nome();
        this.responsavel = requestDepartamento.responsavel();

    }

    public void setNome (String nome){
        this.nome = nome;
    }

    public void setResponsavel(String responsavel){
        this.responsavel = responsavel;
    }

}
