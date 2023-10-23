package com.ellp.ellp.domain.voluntario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoluntarioRepository extends JpaRepository <Voluntario, String> {

    List<Voluntario>findAllByActiveTrue();
}




