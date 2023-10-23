package com.ellp.ellp.domain.voluntario;

import jakarta.persistence.*;
import lombok.*;

@Table(name="login")
@Entity(name="login")
@EqualsAndHashCode(of="id_login")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private String id_login;

    private String nome;

    private String senha;

    private Boolean active;

    public Login(RequestLogin requestLogin) {
        this.nome = requestLogin.nome();
        this.senha= requestLogin.senha();
        this.active = true;

    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setActive(boolean b) {
        this.active = active;
    }

}
