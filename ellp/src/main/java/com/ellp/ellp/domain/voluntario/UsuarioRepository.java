package com.ellp.ellp.domain.voluntario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Login, String> {

    List<Login>findAllByActiveTrue();

    Optional<Login> findByNome(String nome);
}