package com.ellp.ellp.controllers;

import com.ellp.ellp.domain.voluntario.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/departamento")
public class DepartamentoControllers {

    @Autowired
    private DepartamentoRepository departamentoRepository;


    @GetMapping
    public ResponseEntity getAllDepartamento()
    {
        var AllDepartamentos = departamentoRepository.findAllByActiveTrue();

        return ResponseEntity.ok(AllDepartamentos);
    }

    @PostMapping
    public ResponseEntity registrarDepartamento(@RequestBody @Valid RequestDepartamento data ){
        Departamento newDepartamento = new Departamento(data);
        System.out.println(data);
        departamentoRepository.save(newDepartamento);
        return ResponseEntity.ok().build();
    }


}
