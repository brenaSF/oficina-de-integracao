package com.ellp_oficina.ellp_oficina.controllers;


import com.ellp_oficina.ellp_oficina.domain.ellp.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;
import java.util.Map;

import java.util.HashMap;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/departamento")
public class DepartamentoControllers {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @GetMapping("/AllDepartamamentos") 
    public ResponseEntity getAllDepartamamentos() {
        var AllDepartamamentos = departamentoRepository.findAll();
        return ResponseEntity.ok(AllDepartamamentos);
    }

    @GetMapping("/{id_departamento}")
    public ResponseEntity getOficinaId(@PathVariable String id_departamento) {
        Optional<Departamento> optionalDepartamento = departamentoRepository.findById(id_departamento);

        if (optionalDepartamento.isPresent()) {
            Departamento departamento = optionalDepartamento.get();
            return ResponseEntity.ok(departamento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity registerVoluntario(@RequestBody @Valid RequestDepartamento data ){
        Departamento newDepartamento = new Departamento(data);
        System.out.println(data);
        departamentoRepository.save(newDepartamento);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity updateVoluntario(@RequestBody @Valid RequestDepartamento data){

        Optional <Departamento> optionalDepartamento = departamentoRepository.findById(data.id_departamento());
        if(optionalDepartamento.isPresent()){
            Departamento departamento = optionalDepartamento.get();
            departamento.setNome(data.nome());
            departamento.setResponsavel(data.responsavel());

            return ResponseEntity.ok(departamento);
        }else{
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/deletarDepartamento/{id}")
    @Transactional
    public ResponseEntity deleteDepartamento(@PathVariable String id) {
        Optional<Departamento> optionalDepartamento = departamentoRepository.findById(id);
        if (optionalDepartamento.isPresent()) {
            Departamento departamento = optionalDepartamento.get();
            departamentoRepository.delete(departamento);
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }

    
}
