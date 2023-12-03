package com.ellp_oficina.ellp_oficina.domain.ellp;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OficinaRepository extends JpaRepository <Oficina, String> {

        List<Oficina>findAllByActiveTrue();

        List<Oficina>findByNomeIgnoreCaseStartingWith(String nome);

        Optional<Oficina>findByNomeIgnoreCase(String nome);

}