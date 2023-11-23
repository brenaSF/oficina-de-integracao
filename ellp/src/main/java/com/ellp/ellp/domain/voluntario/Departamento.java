package com.ellp.ellp.domain.voluntario;


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

    private String nome_departamento;

    private Boolean active;

    public Departamento(RequestDepartamento requestDepartamento){
        this.nome_departamento = requestDepartamento.nome_departamento();
        this.active = true;
    }


    public void setNome_departamento(String nome_departamento) {
        this.nome_departamento = nome_departamento;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}
