package com.ellp.ellp.domain.voluntario;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "voluntario")
@Entity(name = "voluntario")
@EqualsAndHashCode(of="id")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Voluntario {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_voluntario;

    private String nome;

    private String ra;

    private String email;

    private String telefone;

    private String curso;

    private String periodo;

    private Boolean active;

    public Voluntario(RequestVoluntario requestVoluntario){
        this.nome = requestVoluntario.nome();
        this.ra = requestVoluntario.ra();
        this.email = requestVoluntario.email();
        this.telefone = requestVoluntario.telefone();
        this.curso = requestVoluntario.curso();
        this.periodo = requestVoluntario.periodo();
        this.active = true;

    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setRa(String ra) {
        this.ra = ra;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public void setActive(boolean b) {
        this.active = active;
    }
}
