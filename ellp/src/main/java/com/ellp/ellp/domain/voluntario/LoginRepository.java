package com.ellp.ellp.domain.voluntario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoginRepository extends JpaRepository <Login, String> {

    List<Login>findAllByActiveTrue();
}