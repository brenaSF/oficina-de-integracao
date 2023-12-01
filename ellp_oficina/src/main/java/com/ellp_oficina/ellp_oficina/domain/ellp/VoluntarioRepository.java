package com.ellp_oficina.ellp_oficina.domain.ellp;



import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.Optional;

public interface VoluntarioRepository extends JpaRepository <Voluntario, String> {

    List<Voluntario>findAllByActiveTrue();

    Optional<Voluntario> findById(String id_voluntario);

    Optional<Voluntario>findByNomeIgnoreCase(String nome);

    List<Voluntario>findByNomeIgnoreCaseStartingWith(String nome);

}

