package com.ellp.ellp.domain.voluntario;

import com.ellp.ellp.domain.voluntario.Oficina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OficinaRepository extends JpaRepository <Oficina, String> {

    List<Oficina>findAllByActiveTrue();


}