package com.ellp_oficina.ellp_oficina.domain.ellp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, String> {

    List<Login>findAllByActiveTrue();

    Optional<Login> findByNome(String nome);

    Optional<Login> findByNomeAndSenha(String nome, String senha);

}

