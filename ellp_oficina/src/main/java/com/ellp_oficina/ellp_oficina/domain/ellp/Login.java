package com.ellp_oficina.ellp_oficina.domain.ellp;

import jakarta.persistence.*;
import lombok.*;

@Table(name="login")
@Entity(name = "login")
@EqualsAndHashCode(of="id_login")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id_login;
    private String nome;
    private String senha;
    private Boolean active;


    public Login(RequestLogin requestLogin){
        this.nome = requestLogin.nome();
        this.senha = requestLogin.senha();
        this.active = true;

    }

}

