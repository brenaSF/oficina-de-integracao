package com.ellp.ellp.domain.voluntario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartamentoRepository extends JpaRepository<Departamento, String> {

    List<Voluntario> findAllByActiveTrue();
}
