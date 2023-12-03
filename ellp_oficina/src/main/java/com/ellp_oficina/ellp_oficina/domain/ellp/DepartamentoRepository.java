package com.ellp_oficina.ellp_oficina.domain.ellp;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepartamentoRepository extends JpaRepository <Departamento, String> {

       List<Departamento>findByNomeIgnoreCaseStartingWith(String nome);

        Optional<Departamento>findByNomeIgnoreCase(String nome);

} 
