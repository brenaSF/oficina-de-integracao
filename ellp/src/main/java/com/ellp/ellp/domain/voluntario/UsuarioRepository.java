package com.ellp.ellp.domain.voluntario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByUsername(String nome);

    List<Oficina> findAllByActiveTrue();


}
