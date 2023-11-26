package com.ellp_oficina.ellp_oficina.domain.ellp;


import jakarta.persistence.*;
import lombok.*;

@Table(name = "voluntario")
@Entity(name = "voluntario")
@EqualsAndHashCode(of="id_voluntario")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Voluntario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id_voluntario;

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

    public void setActive(boolean active) {
        this.active = active;
    }


}