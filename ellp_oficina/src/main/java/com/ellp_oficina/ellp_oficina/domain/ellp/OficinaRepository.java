package com.ellp_oficina.ellp_oficina.domain.ellp;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OficinaRepository extends JpaRepository <Oficina, String> {

        List<Oficina>findAllByActiveTrue();

}